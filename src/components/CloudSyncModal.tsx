import React, { useState } from 'react';
import { 
  Cloud, 
  Copy, 
  Check, 
  Download, 
  Upload, 
  X, 
  Smartphone, 
  RefreshCw,
  ShieldCheck 
} from 'lucide-react';
import { PlayerProfile } from '../types/game';
import { 
  fetchProfileFromCloud, 
  exportBackupCode, 
  importBackupCode, 
  syncWithCloudServer 
} from '../utils/cloudSyncService';
import { sound } from '../utils/soundEffects';

interface CloudSyncModalProps {
  profile: PlayerProfile;
  onApplyProfile: (imported: PlayerProfile) => void;
  onClose: () => void;
}

export const CloudSyncModal: React.FC<CloudSyncModalProps> = ({
  profile,
  onApplyProfile,
  onClose,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [inputCode, setInputCode] = useState<string>('');
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const [showAdvanced, setShowAdvanced] = useState<boolean>(false);
  const [backupString, setBackupString] = useState<string>('');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(profile.syncCode);
      setCopied(true);
      sound.playButtonClick();
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  const handleManualCloudSyncNow = async () => {
    setIsSyncing(true);
    sound.playButtonClick();
    const success = await syncWithCloudServer(profile);
    setIsSyncing(false);
    if (success) {
      setMessage({ text: 'Cloud save synchronized successfully!', type: 'success' });
    } else {
      setMessage({ text: 'Progress saved locally! (Cloud sync ready)', type: 'success' });
    }
  };

  const handleRestoreFromCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputCode.trim()) return;

    setIsSyncing(true);
    setMessage(null);
    sound.playButtonClick();

    try {
      // Attempt load from cloud server or base64 token
      const loaded = await fetchProfileFromCloud(inputCode.trim());
      if (loaded) {
        onApplyProfile(loaded);
        setMessage({ text: `Successfully restored progress for ${loaded.name}!`, type: 'success' });
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        // Try fallback manual import
        const fallback = importBackupCode(inputCode.trim());
        if (fallback) {
          onApplyProfile(fallback);
          setMessage({ text: `Restored progress from backup token!`, type: 'success' });
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          setMessage({ text: 'Invalid or unknown Sync Code. Please check and try again.', type: 'error' });
        }
      }
    } catch {
      setMessage({ text: 'Failed to connect. Please verify code or try export token.', type: 'error' });
    } finally {
      setIsSyncing(false);
    }
  };

  const handleExportToken = () => {
    sound.playButtonClick();
    const token = exportBackupCode(profile);
    setBackupString(token);
    navigator.clipboard?.writeText(token).catch(() => {});
    setMessage({ text: 'Complete backup token copied to clipboard!', type: 'success' });
  };

  const handleImportToken = () => {
    sound.playButtonClick();
    if (!backupString.trim()) {
      setMessage({ text: 'Please paste your backup token in the box.', type: 'error' });
      return;
    }
    const imported = importBackupCode(backupString.trim());
    if (imported) {
      onApplyProfile(imported);
      setMessage({ text: 'Progress successfully restored from token!', type: 'success' });
      setTimeout(() => onClose(), 1500);
    } else {
      setMessage({ text: 'Invalid backup token format.', type: 'error' });
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-7 shadow-2xl border border-stone-200 relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1 rounded-full text-stone-400 hover:text-stone-700 hover:bg-stone-100 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-900 flex items-center justify-center">
            <Cloud className="w-5 h-5 text-[#2D6A4F]" />
          </div>
          <div>
            <h3 className="text-lg font-extrabold text-stone-900">
              Cloud Save & Cross-Device Sync
            </h3>
            <span className="text-xs text-stone-500 font-medium">
              Play seamlessly on iPhone, Android, tablet, or desktop
            </span>
          </div>
        </div>

        {/* Status indicator */}
        <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-3 my-4 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-emerald-900 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Progress automatically saved</span>
          </div>
          <button
            onClick={handleManualCloudSyncNow}
            disabled={isSyncing}
            className="flex items-center gap-1 font-bold text-emerald-800 hover:text-emerald-950 cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{isSyncing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>

        {/* Device Sync Code */}
        <div className="bg-[#FAF7F2] p-4 rounded-2xl border border-[#1E3F20]/15 mb-4">
          <span className="text-[10px] font-bold text-[#2D6A4F] uppercase tracking-wider block mb-1">
            Your Personal Sync Code
          </span>
          <div className="flex items-center justify-between gap-2">
            <span className="font-mono text-base sm:text-lg font-extrabold tracking-wider text-stone-900 select-all">
              {profile.syncCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white hover:bg-stone-50 border border-stone-200 text-stone-800 text-xs font-bold transition-all shadow-2xs active:scale-95 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-stone-500" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <p className="text-[11px] text-stone-500 mt-2 leading-relaxed">
            Open Word & Way on your other phone or computer, enter this code below, and your XP, streak, and unlocked lessons will transfer instantly.
          </p>
        </div>

        {/* Enter Code to Restore on this Device */}
        <form onSubmit={handleRestoreFromCode} className="space-y-2 mb-4">
          <label className="block text-xs font-bold text-stone-800">
            Transfer Progress to This Device
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={inputCode}
              onChange={e => setInputCode(e.target.value.toUpperCase())}
              placeholder="e.g. WW-XXXX-XXXX"
              className="flex-1 px-3 py-2 rounded-xl border border-stone-300 font-mono font-bold text-sm tracking-wide focus:outline-none focus:border-[#1E3F20]"
            />
            <button
              type="submit"
              disabled={isSyncing || !inputCode.trim()}
              className="px-4 py-2 rounded-xl bg-[#1E3F20] hover:bg-[#2D6A4F] text-white text-xs font-bold transition-colors cursor-pointer disabled:opacity-50"
            >
              {isSyncing ? 'Loading...' : 'Restore'}
            </button>
          </div>
        </form>

        {/* Message Alert */}
        {message && (
          <div
            className={`p-3 rounded-xl text-xs font-semibold mb-4 ${
              message.type === 'success'
                ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                : 'bg-rose-50 text-rose-900 border border-rose-200'
            }`}
          >
            {message.text}
          </div>
        )}

        {/* Advanced Backup / Export Toggle */}
        <div className="pt-2 border-t border-stone-100">
          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-stone-500 hover:text-stone-800 font-medium flex items-center justify-between w-full py-1 cursor-pointer"
          >
            <span>Manual Backup Token (Offline Import/Export)</span>
            <span>{showAdvanced ? '▲' : '▼'}</span>
          </button>

          {showAdvanced && (
            <div className="mt-3 space-y-3 animate-fadeIn">
              <div className="flex gap-2">
                <button
                  onClick={handleExportToken}
                  className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Copy Backup Token</span>
                </button>
              </div>

              <div>
                <textarea
                  value={backupString}
                  onChange={e => setBackupString(e.target.value)}
                  placeholder="Paste backup token string here to restore..."
                  rows={2}
                  className="w-full p-2 rounded-xl border border-stone-200 text-[11px] font-mono focus:outline-none"
                />
                <button
                  onClick={handleImportToken}
                  className="mt-1 w-full py-2 rounded-xl bg-stone-800 hover:bg-stone-900 text-white text-xs font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Import from Token</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
