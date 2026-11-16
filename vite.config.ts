import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';

// In-memory cloud profile store for cross-device synchronization
const cloudStore = new Map<string, any>();

function cloudSyncPlugin(): Plugin {
  return {
    name: 'cloud-sync-api',
    configureServer(server) {
      server.middlewares.use('/api/sync/save', (req, res) => {
        if (req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk;
          });
          req.on('end', () => {
            try {
              const { syncCode, data } = JSON.parse(body);
              if (syncCode && data) {
                cloudStore.set(syncCode.trim().toUpperCase(), data);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true, timestamp: new Date().toISOString() }));
                return;
              }
            } catch {
              // bad json
            }
            res.writeHead(400, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Invalid sync payload' }));
          });
          return;
        }
        res.writeHead(405).end();
      });

      server.middlewares.use('/api/sync/load', (req, res) => {
        const parts = req.url?.split('/') || [];
        const code = decodeURIComponent(parts[parts.length - 1] || '').trim().toUpperCase();
        if (code && cloudStore.has(code)) {
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ success: true, profile: cloudStore.get(code) }));
          return;
        }
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Sync code not found' }));
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), cloudSyncPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modify—file watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});

