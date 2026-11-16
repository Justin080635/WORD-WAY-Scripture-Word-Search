import { Section } from '../types/game';

export const SECTIONS: Section[] = [
  {
    id: 'section-1',
    number: 1,
    title: 'Foundations of Faith',
    subtitle: 'The Genesis of All Things',
    iconName: 'Sparkles',
    description: 'Explore the origin of creation, the living Word, the promise of redemption, and God’s sovereign plan.',
    lessons: [
      {
        id: 'foundations-01',
        sectionId: 'section-1',
        sectionTitle: 'Foundations of Faith',
        lessonNumber: 1,
        title: 'God & Creation',
        subtitle: 'In the beginning',
        description: 'Discover the opening words of Scripture and the majesty of God bringing light into darkness.',
        difficulty: 'beginner',
        gridSize: 8,
        timeLimit: 90,
        words: [
          {
            word: 'GOD',
            definition: 'The eternal Creator, Sovereign over heaven and earth.',
            reference: 'Genesis 1:1',
            explanation: 'Elohim, indicating the almighty power and triune majesty of the Creator.',
            hebrewOrGreek: 'Hebrew: אֱלֹהִים (Elohim)'
          },
          {
            word: 'LIGHT',
            definition: 'The initial radiance spoken forth to dispel darkness.',
            reference: 'Genesis 1:3',
            explanation: 'God said, "Let there be light," establishing order, beauty, and revelation.',
            hebrewOrGreek: 'Hebrew: אוֹר (Ohr)'
          },
          {
            word: 'LIFE',
            definition: 'The breath and vitality imparted to creation by God.',
            reference: 'Genesis 2:7',
            explanation: 'God breathed into man the breath of life, and man became a living being.',
            hebrewOrGreek: 'Hebrew: חַיִּים (Chayim)'
          },
          {
            word: 'EARTH',
            definition: 'The dwelling place formed by God for humanity to steward.',
            reference: 'Psalm 24:1',
            explanation: 'The earth is the Lord’s, and everything in it; the world, and all who live in it.',
            hebrewOrGreek: 'Hebrew: אֶרֶץ (Eretz)'
          },
          {
            word: 'HEAVEN',
            definition: 'The celestial expanse and the dwelling place of God’s glory.',
            reference: 'Genesis 1:1',
            explanation: 'The heavens declare the glory of God; the skies proclaim the work of His hands.',
            hebrewOrGreek: 'Hebrew: שָׁמַיִם (Shamayim)'
          }
        ],
        scripture: {
          reference: 'Genesis 1:1',
          text: 'In the beginning God created the heavens and the earth.',
          context: 'The bedrock declaration of the Bible, establishing God as the uncreated author of all existence.'
        }
      },
      {
        id: 'foundations-02',
        sectionId: 'section-1',
        sectionTitle: 'Foundations of Faith',
        lessonNumber: 2,
        title: 'The Living Word',
        subtitle: 'The Word became flesh',
        description: 'Learn the eternal nature of the Logos, through whom all things were made.',
        difficulty: 'beginner',
        gridSize: 8,
        timeLimit: 90,
        words: [
          {
            word: 'WORD',
            definition: 'The divine Logos, through whom all things were created.',
            reference: 'John 1:1',
            explanation: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
            hebrewOrGreek: 'Greek: Λόγος (Logos)'
          },
          {
            word: 'TRUTH',
            definition: 'The unshakeable reality and faithfulness of God’s character.',
            reference: 'John 14:6',
            explanation: 'God’s word is enduring truth that sanctifies and sets us free.',
            hebrewOrGreek: 'Greek: Ἀλήθεια (Aletheia)'
          },
          {
            word: 'VOICE',
            definition: 'The commanding sound of the Almighty calling forth reality.',
            reference: 'Psalm 29:3',
            explanation: 'The voice of the Lord is over the waters; the God of glory thunders.',
            hebrewOrGreek: 'Hebrew: קוֹל (Qol)'
          },
          {
            word: 'LAMP',
            definition: 'A guiding beacon for the pilgrim’s pathway.',
            reference: 'Psalm 119:105',
            explanation: 'Your word is a lamp for my feet, a light on my path.',
            hebrewOrGreek: 'Hebrew: נֵר (Ner)'
          },
          {
            word: 'SPIRIT',
            definition: 'The Holy Spirit hovering over the deep, giving life.',
            reference: 'Genesis 1:2',
            explanation: 'The Spirit of God was hovering over the face of the waters.',
            hebrewOrGreek: 'Hebrew: רוּחַ (Ruach)'
          }
        ],
        scripture: {
          reference: 'John 1:1',
          text: 'In the beginning was the Word, and the Word was with God, and the Word was God.',
          context: 'The apostle John reveals that Jesus Christ is the eternal Word present before all time.'
        }
      },
      {
        id: 'foundations-03',
        sectionId: 'section-1',
        sectionTitle: 'Foundations of Faith',
        lessonNumber: 3,
        title: 'The Garden & Image',
        subtitle: 'Crowned with glory',
        description: 'Discover how humanity was created in God’s image to walk in fellowship with Him.',
        difficulty: 'beginner',
        gridSize: 8,
        timeLimit: 90,
        words: [
          {
            word: 'IMAGE',
            definition: 'Humanity created in the likeness and reflection of God.',
            reference: 'Genesis 1:27',
            explanation: 'God created mankind in his own image; in the image of God he created them.',
            hebrewOrGreek: 'Hebrew: צֶלֶם (Tselem)'
          },
          {
            word: 'BREATH',
            definition: 'The divine respiration animating mankind.',
            reference: 'Genesis 2:7',
            explanation: 'The Lord God formed man from the dust and breathed life into his nostrils.',
            hebrewOrGreek: 'Hebrew: נְשָׁמָה (Neshamah)'
          },
          {
            word: 'GARDEN',
            definition: 'Eden, a paradise of intimate communion with God.',
            reference: 'Genesis 2:8',
            explanation: 'The Lord God planted a garden eastward in Eden and placed the man there.',
            hebrewOrGreek: 'Hebrew: גַּן (Gan)'
          },
          {
            word: 'PEACE',
            definition: 'Wholeness, harmony, and undisturbed fellowship.',
            reference: 'Numbers 6:26',
            explanation: 'Shalom encompasses health, contentment, and reconciliation with God.',
            hebrewOrGreek: 'Hebrew: שָׁלוֹם (Shalom)'
          },
          {
            word: 'GLORY',
            definition: 'The manifest weight, presence, and honor of God.',
            reference: 'Psalm 8:5',
            explanation: 'You have made them a little lower than the angels and crowned them with glory.',
            hebrewOrGreek: 'Hebrew: כָּבוֹד (Kavod)'
          }
        ],
        scripture: {
          reference: 'Genesis 1:27',
          text: 'So God created mankind in his own image, in the image of God he created them; male and female he created them.',
          context: 'Human life possesses inherent dignity and divine purpose because we bear the Creator’s image.'
        }
      },
      {
        id: 'foundations-04',
        sectionId: 'section-1',
        sectionTitle: 'Foundations of Faith',
        lessonNumber: 4,
        title: 'The Fall & Mercy',
        subtitle: 'Brokenness and redemption',
        description: 'Examine the tragedy of sin and God’s immediate provision of sacrificial covering.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'MERCY',
            definition: 'God withholding the punishment we deserved out of compassion.',
            reference: 'Psalm 103:8',
            explanation: 'The Lord is merciful and gracious, slow to anger, abounding in love.',
            hebrewOrGreek: 'Hebrew: רַחֲמִים (Rachamim)'
          },
          {
            word: 'CLOTHING',
            definition: 'Garments of skin provided by God to cover human shame.',
            reference: 'Genesis 3:21',
            explanation: 'The Lord God made garments of skin for Adam and his wife and clothed them.',
            hebrewOrGreek: 'Hebrew: כָּתְנוֹת (Kotnot)'
          },
          {
            word: 'COVENANT',
            definition: 'A binding sacred promise between God and His people.',
            reference: 'Genesis 9:11',
            explanation: 'God’s unfailing covenant guarantees His redemptive purpose across generations.',
            hebrewOrGreek: 'Hebrew: בְּרִית (Berit)'
          },
          {
            word: 'PROMISE',
            definition: 'The prophetic assurance that the seed of the woman would crush the serpent.',
            reference: 'Genesis 3:15',
            explanation: 'Known as the Protoevangelium, the first gospel promise of Christ’s victory.',
            hebrewOrGreek: 'Greek: Ἐπαγγελία (Epangelia)'
          },
          {
            word: 'PARDON',
            definition: 'Complete forgiveness through divine grace.',
            reference: 'Micah 7:18',
            explanation: 'Who is a God like you, who pardons sin and forgives transgression?',
            hebrewOrGreek: 'Hebrew: סָלַח (Salach)'
          },
          {
            word: 'HOPE',
            definition: 'Confident expectation anchored in God’s faithfulness.',
            reference: 'Romans 5:5',
            explanation: 'Hope does not put us to shame, because God’s love has been poured out into our hearts.',
            hebrewOrGreek: 'Hebrew: תִּקְוָה (Tikvah)'
          }
        ],
        scripture: {
          reference: 'Genesis 3:15',
          text: 'And I will put enmity between you and the woman, and between your offspring and hers; he will crush your head, and you will strike his heel.',
          context: 'The earliest prophecy pointing directly to Jesus Christ conquering sin and death.'
        }
      },
      {
        id: 'foundations-05',
        sectionId: 'section-1',
        sectionTitle: 'Foundations of Faith',
        lessonNumber: 5,
        title: 'The Call of Abraham',
        subtitle: 'Faith credited as righteousness',
        description: 'Follow the patriarch who journeyed by faith toward a city whose architect is God.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'FAITH',
            definition: 'Confident trust in what we hope for and assurance about what we do not see.',
            reference: 'Hebrews 11:1',
            explanation: 'Abram believed the Lord, and he credited it to him as righteousness.',
            hebrewOrGreek: 'Greek: Πίστις (Pistis)'
          },
          {
            word: 'BLESSING',
            definition: 'Divine favor and multiplication bestowed by God.',
            reference: 'Genesis 12:2',
            explanation: 'I will bless you; I will make your name great, and you will be a blessing.',
            hebrewOrGreek: 'Hebrew: בְּרָכָה (Berakhah)'
          },
          {
            word: 'ALTAR',
            definition: 'A consecrated place of prayer, thanksgiving, and surrender.',
            reference: 'Genesis 12:7',
            explanation: 'Abraham built altars as markers of God’s revelations along his journey.',
            hebrewOrGreek: 'Hebrew: מִזְבֵּחַ (Mizbe’ach)'
          },
          {
            word: 'STARS',
            definition: 'The vast number of Abraham’s spiritual offspring promised by God.',
            reference: 'Genesis 15:5',
            explanation: 'Look up at the sky and count the stars—so shall your offspring be.',
            hebrewOrGreek: 'Hebrew: כּוֹכָבִים (Kokhavim)'
          },
          {
            word: 'SHIELD',
            definition: 'God as the protector and great reward of His saints.',
            reference: 'Genesis 15:1',
            explanation: 'Do not be afraid, Abram. I am your shield, your very great reward.',
            hebrewOrGreek: 'Hebrew: מָגֵן (Magen)'
          },
          {
            word: 'JOURNEY',
            definition: 'Stepping out in obedience without knowing the earthly destination.',
            reference: 'Hebrews 11:8',
            explanation: 'By faith Abraham obeyed when called to go to a place he would later receive.',
            hebrewOrGreek: 'Hebrew: הֲלִיכָה (Halikhah)'
          }
        ],
        scripture: {
          reference: 'Genesis 15:6',
          text: 'Abram believed the Lord, and he credited it to him as righteousness.',
          context: 'The foundational biblical principle that salvation and righteousness come through faith.'
        }
      }
    ]
  },
  {
    id: 'section-2',
    number: 2,
    title: 'Knowing God',
    subtitle: 'The Heart & Character of the Father',
    iconName: 'Heart',
    description: 'Encounter the holiness, unfailing love, steadfast grace, and majesty of the Lord.',
    lessons: [
      {
        id: 'knowing-01',
        sectionId: 'section-2',
        sectionTitle: 'Knowing God',
        lessonNumber: 1,
        title: 'God’s Holiness',
        subtitle: 'Holy, holy, holy',
        description: 'Stand in awe before the thrice-holy God who dwells in unapproachable light.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'HOLY',
            definition: 'Set apart, pure, transcendent, and completely without sin.',
            reference: 'Isaiah 6:3',
            explanation: 'Holy, holy, holy is the Lord Almighty; the whole earth is full of his glory.',
            hebrewOrGreek: 'Hebrew: קָדוֹשׁ (Kadosh)'
          },
          {
            word: 'PURITY',
            definition: 'Clean hands and a pure heart that can stand in His holy place.',
            reference: 'Psalm 24:3-4',
            explanation: 'Who may ascend the mountain of the Lord? He who has clean hands and a pure heart.',
            hebrewOrGreek: 'Hebrew: טָהוֹר (Tahor)'
          },
          {
            word: 'MAJESTY',
            definition: 'The supreme royal sovereignty and greatness of God.',
            reference: 'Psalm 93:1',
            explanation: 'The Lord reigns, he is robed in majesty and armed with strength.',
            hebrewOrGreek: 'Hebrew: גֵּאוּת (Ge’ut)'
          },
          {
            word: 'THRONE',
            definition: 'The seat of universal reign and everlasting justice.',
            reference: 'Hebrews 4:16',
            explanation: 'Let us approach God’s throne of grace with confidence to receive mercy.',
            hebrewOrGreek: 'Greek: Θρόνος (Thronos)'
          },
          {
            word: 'PRAISE',
            definition: 'The natural adoration of a heart captivated by God’s perfection.',
            reference: 'Psalm 150:6',
            explanation: 'Let everything that has breath praise the Lord.',
            hebrewOrGreek: 'Hebrew: תְּהִלָּה (Tehillah)'
          },
          {
            word: 'AWE',
            definition: 'Reverent wonder and respectful dread in the divine presence.',
            reference: 'Hebrews 12:28',
            explanation: 'Let us worship God acceptably with reverence and awe.',
            hebrewOrGreek: 'Hebrew: יִרְאָה (Yir’ah)'
          }
        ],
        scripture: {
          reference: 'Isaiah 6:3',
          text: 'And they were calling to one another: "Holy, holy, holy is the Lord Almighty; the whole earth is full of his glory."',
          context: 'The prophet Isaiah’s heavenly vision of the seraphim glorifying God in the temple.'
        }
      },
      {
        id: 'knowing-02',
        sectionId: 'section-2',
        sectionTitle: 'Knowing God',
        lessonNumber: 2,
        title: 'Steadfast Love',
        subtitle: 'Hesed — Everlasting kindness',
        description: 'Explore God’s unfailing covenant love that endures forever.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'HESED',
            definition: 'Covenant loyal love, unfailing kindness, and steadfast devotion.',
            reference: 'Psalm 136:1',
            explanation: 'Give thanks to the Lord, for he is good. His love endures forever.',
            hebrewOrGreek: 'Hebrew: חֶסֶד (Hesed)'
          },
          {
            word: 'KINDNESS',
            definition: 'Gentle warmth, goodwill, and active benevolence toward others.',
            reference: 'Titus 3:4',
            explanation: 'When the kindness and love of God our Savior appeared, he saved us.',
            hebrewOrGreek: 'Greek: Χρηστότης (Chrestotes)'
          },
          {
            word: 'PATIENCE',
            definition: 'Slow to anger and rich in forbearance toward weak sinners.',
            reference: 'Exodus 34:6',
            explanation: 'The Lord is compassionate and gracious, slow to anger, abounding in love.',
            hebrewOrGreek: 'Hebrew: אֶרֶךְ אַפַּיִם (Erekh Apayim)'
          },
          {
            word: 'FATHER',
            definition: 'The intimate, protective, and loving relationship God invites us into.',
            reference: 'Romans 8:15',
            explanation: 'By the Spirit of sonship we cry out, "Abba, Father."',
            hebrewOrGreek: 'Aramaic: אַבָּא (Abba)'
          },
          {
            word: 'REFUGE',
            definition: 'A secure shelter under the shadow of the Almighty’s wings.',
            reference: 'Psalm 91:2',
            explanation: 'I will say of the Lord, "He is my refuge and my fortress, my God in whom I trust."',
            hebrewOrGreek: 'Hebrew: מַחְסֶה (Machseh)'
          },
          {
            word: 'COMFORT',
            definition: 'Consolation and peace supplied by the God of all comfort.',
            reference: '2 Corinthians 1:3',
            explanation: 'Praise be to the God and Father of our Lord Jesus Christ, the Father of compassion.',
            hebrewOrGreek: 'Greek: Παράκλησις (Paraklesis)'
          }
        ],
        scripture: {
          reference: 'Psalm 136:1',
          text: 'Give thanks to the Lord, for he is good. His love endures forever.',
          context: 'A great liturgical psalm celebrating the steadfast love (hesed) of the Lord throughout history.'
        }
      },
      {
        id: 'knowing-03',
        sectionId: 'section-2',
        sectionTitle: 'Knowing God',
        lessonNumber: 3,
        title: 'Marvelous Grace',
        subtitle: 'Unmerited favor',
        description: 'Understand the gift of salvation given freely, not earned by human merit.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'GRACE',
            definition: 'Unearned, undeserved divine favor and empowering strength.',
            reference: 'Ephesians 2:8',
            explanation: 'For it is by grace you have been saved, through faith—and this is not from yourselves.',
            hebrewOrGreek: 'Greek: Χάρις (Charis)'
          },
          {
            word: 'GIFT',
            definition: 'Something freely bestowed without payment or human qualification.',
            reference: 'Romans 6:23',
            explanation: 'The gift of God is eternal life in Christ Jesus our Lord.',
            hebrewOrGreek: 'Greek: Χάρισμα (Charisma)'
          },
          {
            word: 'RANSOM',
            definition: 'The price paid by Christ to deliver sinners from bondage.',
            reference: 'Mark 10:45',
            explanation: 'The Son of Man did not come to be served, but to serve, and to give his life as a ransom.',
            hebrewOrGreek: 'Greek: Λύτρον (Lytron)'
          },
          {
            word: 'JUSTICE',
            definition: 'God’s perfect righteousness that upholds moral order.',
            reference: 'Micah 6:8',
            explanation: 'What does the Lord require of you? To act justly and to love mercy.',
            hebrewOrGreek: 'Hebrew: מִשְׁפָּט (Mishpat)'
          },
          {
            word: 'ADOPTION',
            definition: 'Being welcomed as full sons and daughters into God’s eternal family.',
            reference: 'Galatians 4:5',
            explanation: 'God sent his Son so that we might receive adoption to sonship.',
            hebrewOrGreek: 'Greek: Υἱοθεσία (Huiothesia)'
          },
          {
            word: 'FREEDOM',
            definition: 'Liberation from the penalty and enslaving power of sin.',
            reference: 'Galatians 5:1',
            explanation: 'It is for freedom that Christ has set us free. Stand firm, then.',
            hebrewOrGreek: 'Greek: Ἐλευθερία (Eleutheria)'
          },
          {
            word: 'REST',
            definition: 'Sabbath stillness found in ceasing from self-justifying works.',
            reference: 'Matthew 11:28',
            explanation: 'Come to me, all you who are weary and burdened, and I will give you rest.',
            hebrewOrGreek: 'Hebrew: מְנוּחָה (Menuchah)'
          }
        ],
        scripture: {
          reference: 'Ephesians 2:8–9',
          text: 'For it is by grace you have been saved, through faith—and this is not from yourselves, it is the gift of God—not by works, so that no one can boast.',
          context: 'Paul’s definitive explanation of salvation resting entirely upon the grace of God.'
        }
      },
      {
        id: 'knowing-04',
        sectionId: 'section-2',
        sectionTitle: 'Knowing God',
        lessonNumber: 4,
        title: 'Unfailing Faithfulness',
        subtitle: 'Great is Thy faithfulness',
        description: 'Rest in the God whose promises never fail and whose mercies are new every morning.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'FAITHFUL',
            definition: 'Completely dependable, true to His word, and unchanging.',
            reference: 'Lamentations 3:23',
            explanation: 'They are new every morning; great is your faithfulness.',
            hebrewOrGreek: 'Hebrew: אֱמוּנָה (Emunah)'
          },
          {
            word: 'ANCHOR',
            definition: 'A secure hold for the soul that reaches into the heavenly sanctuary.',
            reference: 'Hebrews 6:19',
            explanation: 'We have this hope as an anchor for the soul, firm and secure.',
            hebrewOrGreek: 'Greek: Ἄγκυρα (Ankyra)'
          },
          {
            word: 'ROCK',
            definition: 'An immovable foundation upon which believers build their lives.',
            reference: 'Psalm 18:2',
            explanation: 'The Lord is my rock, my fortress and my deliverer.',
            hebrewOrGreek: 'Hebrew: צוּר (Tzur)'
          },
          {
            word: 'MORNING',
            definition: 'The dawn of God’s renewed mercies after the dark night.',
            reference: 'Psalm 30:5',
            explanation: 'Weeping may stay for the night, but rejoicing comes in the morning.',
            hebrewOrGreek: 'Hebrew: בֹּקֶר (Boker)'
          },
          {
            word: 'ETERNAL',
            definition: 'Existing without beginning or end across all ages.',
            reference: 'Psalm 90:2',
            explanation: 'From everlasting to everlasting you are God.',
            hebrewOrGreek: 'Hebrew: עוֹלָם (Olam)'
          },
          {
            word: 'SHEPHERD',
            definition: 'The watchful guardian who leads his sheep by still waters.',
            reference: 'Psalm 23:1',
            explanation: 'The Lord is my shepherd, I lack nothing.',
            hebrewOrGreek: 'Hebrew: רֹעֶה (Ro’eh)'
          },
          {
            word: 'PROVIDENCE',
            definition: 'God’s sovereign caring governance orchestrating all things for good.',
            reference: 'Romans 8:28',
            explanation: 'In all things God works for the good of those who love him.',
            hebrewOrGreek: 'Latin: Providentia'
          }
        ],
        scripture: {
          reference: 'Lamentations 3:22–23',
          text: 'Because of the Lord’s great love we are not consumed, for his compassions never fail. They are new every morning; great is your faithfulness.',
          context: 'Jeremiah’s triumph of hope written even amid the ruins of Jerusalem.'
        }
      },
      {
        id: 'knowing-05',
        sectionId: 'section-2',
        sectionTitle: 'Knowing God',
        lessonNumber: 5,
        title: 'The Sovereign King',
        subtitle: 'Lord of Heaven and Earth',
        description: 'Bow before the Lord whose kingdom cannot be shaken and who works all things for good.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'SOVEREIGN',
            definition: 'Possessing supreme authority, power, and dominion over all things.',
            reference: 'Daniel 4:35',
            explanation: 'He does as he pleases with the powers of heaven and the peoples of the earth.',
            hebrewOrGreek: 'Hebrew: שַׁלִּיט (Shallit)'
          },
          {
            word: 'DOMINION',
            definition: 'The supreme royal rule and jurisdiction of God over the cosmos.',
            reference: 'Psalm 145:13',
            explanation: 'Your kingdom is an everlasting kingdom, and your dominion endures.',
            hebrewOrGreek: 'Hebrew: מֶמְשָׁלָה (Memshalah)'
          },
          {
            word: 'VICTORY',
            definition: 'Triumph over sin, despair, and death through Christ our Lord.',
            reference: '1 Corinthians 15:57',
            explanation: 'Thanks be to God! He gives us the victory through our Lord Jesus Christ.',
            hebrewOrGreek: 'Greek: Νῖκος (Nikos)'
          },
          {
            word: 'CROWN',
            definition: 'The emblem of royal honor and the reward of the faithful runner.',
            reference: 'James 1:12',
            explanation: 'Blessed is the one who perseveres; they will receive the crown of life.',
            hebrewOrGreek: 'Greek: Στέφανος (Stephanos)'
          },
          {
            word: 'WISDOM',
            definition: 'Skill in living godly life according to the fear of the Lord.',
            reference: 'Proverbs 9:10',
            explanation: 'The fear of the Lord is the beginning of wisdom.',
            hebrewOrGreek: 'Hebrew: חָכְמָה (Chokhmah)'
          },
          {
            word: 'RIGHTEOUS',
            definition: 'Morally upright, equitable, and completely aligned with God’s law.',
            reference: 'Psalm 11:7',
            explanation: 'For the Lord is righteous, he loves justice; the upright will see his face.',
            hebrewOrGreek: 'Hebrew: צַדִּיק (Tzaddik)'
          },
          {
            word: 'ALMIGHTY',
            definition: 'El Shaddai, all-powerful and all-sufficient Provider.',
            reference: 'Revelation 1:8',
            explanation: '"I am the Alpha and the Omega," says the Lord God, "who is, and who was, and who is to come, the Almighty."',
            hebrewOrGreek: 'Hebrew: שַׁדַּי (Shaddai)'
          }
        ],
        scripture: {
          reference: '1 Timothy 1:17',
          text: 'Now to the King eternal, immortal, invisible, the only God, be honor and glory for ever and ever. Amen.',
          context: 'Paul’s doxology exalting the sovereign majesty of the living God.'
        }
      }
    ]
  },
  {
    id: 'section-3',
    number: 3,
    title: 'Following Jesus',
    subtitle: 'The Way, the Truth, and the Life',
    iconName: 'Compass',
    description: 'Walk in the footsteps of Christ: His incarnation, sacrificial love, resurrection, and call to discipleship.',
    lessons: [
      {
        id: 'jesus-01',
        sectionId: 'section-3',
        sectionTitle: 'Following Jesus',
        lessonNumber: 1,
        title: 'The Good Shepherd',
        subtitle: 'I know my sheep',
        description: 'Discover the Savior who leaves the ninety-nine to rescue the one lost sheep.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'JESUS',
            definition: 'Yeshua, meaning "The Lord saves" or Savior of humanity.',
            reference: 'Matthew 1:21',
            explanation: 'You are to give him the name Jesus, because he will save his people from their sins.',
            hebrewOrGreek: 'Hebrew: יֵשׁוּעַ (Yeshua)'
          },
          {
            word: 'SHEPHERD',
            definition: 'The guardian who lays down his life for his beloved flock.',
            reference: 'John 10:11',
            explanation: 'I am the good shepherd. The good shepherd lays down his life for the sheep.',
            hebrewOrGreek: 'Greek: Ποιμήν (Poimen)'
          },
          {
            word: 'PASTURE',
            definition: 'Abundant spiritual nourishment provided by the Lord.',
            reference: 'John 10:9',
            explanation: 'Whoever enters through me will be saved. They will come in and go out, and find pasture.',
            hebrewOrGreek: 'Greek: Νομή (Nome)'
          },
          {
            word: 'FLOCK',
            definition: 'The community of believers gathered under Christ’s gentle care.',
            reference: 'Luke 12:32',
            explanation: 'Do not be afraid, little flock, for your Father has been pleased to give you the kingdom.',
            hebrewOrGreek: 'Greek: Ποίμνιον (Poimnion)'
          },
          {
            word: 'CALL',
            definition: 'The voice of the Savior that his sheep recognize and obey.',
            reference: 'John 10:27',
            explanation: 'My sheep listen to my voice; I know them, and they follow me.',
            hebrewOrGreek: 'Greek: Κλῆσις (Klesis)'
          },
          {
            word: 'WAY',
            definition: 'The singular path leading to the Father and everlasting life.',
            reference: 'John 14:6',
            explanation: 'Jesus answered, "I am the way and the truth and the life. No one comes to the Father except through me."',
            hebrewOrGreek: 'Greek: Ὁδός (Hodos)'
          }
        ],
        scripture: {
          reference: 'John 10:14',
          text: 'I am the good shepherd; I know my sheep and my sheep know me.',
          context: 'Jesus reveals the intimate, protective relationship He shares with every believer.'
        }
      },
      {
        id: 'jesus-02',
        sectionId: 'section-3',
        sectionTitle: 'Following Jesus',
        lessonNumber: 2,
        title: 'The Cross of Calvary',
        subtitle: 'It is finished',
        description: 'Reflect upon the sacrifice that cancelled our debt and reconciled us to God.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'CROSS',
            definition: 'The Roman instrument of execution transformed into the symbol of triumph.',
            reference: '1 Peter 2:24',
            explanation: 'He himself bore our sins in his body on the cross, so that we might die to sins and live for righteousness.',
            hebrewOrGreek: 'Greek: Σταυρός (Stauros)'
          },
          {
            word: 'BLOOD',
            definition: 'The precious blood of the spotless Lamb shedding atonement.',
            reference: '1 Peter 1:19',
            explanation: 'Redeemed with the precious blood of Christ, a lamb without blemish or defect.',
            hebrewOrGreek: 'Greek: Αἷμα (Haima)'
          },
          {
            word: 'LAMB',
            definition: 'The sacrificial victim prophesied by Isaiah and heralded by John.',
            reference: 'John 1:29',
            explanation: 'Look, the Lamb of God, who takes away the sin of the world!',
            hebrewOrGreek: 'Greek: Ἀμνός (Amnos)'
          },
          {
            word: 'SACRIFICE',
            definition: 'The ultimate offering that puts an end to all ceremonial sacrifices.',
            reference: 'Hebrews 10:10',
            explanation: 'We have been made holy through the sacrifice of the body of Jesus Christ once for all.',
            hebrewOrGreek: 'Greek: Θυσία (Thysia)'
          },
          {
            word: 'ATONEMENT',
            definition: 'Reconciliation and payment covering moral offense against God.',
            reference: 'Romans 3:25',
            explanation: 'God presented Christ as a sacrifice of atonement, through the shedding of his blood.',
            hebrewOrGreek: 'Hebrew: כִּפֻּר (Kippur)'
          },
          {
            word: 'FINISHED',
            definition: 'Tetelestai — "Paid in full!" Christ’s victorious final word on the cross.',
            reference: 'John 19:30',
            explanation: 'When he had received the drink, Jesus said, "It is finished." With that, he bowed his head and gave up his spirit.',
            hebrewOrGreek: 'Greek: Τετέλεσται (Tetelestai)'
          }
        ],
        scripture: {
          reference: '1 Corinthians 1:18',
          text: 'For the message of the cross is foolishness to those who are perishing, but to us who are being saved it is the power of God.',
          context: 'Paul declares the central power of the gospel centered in Christ crucified.'
        }
      },
      {
        id: 'jesus-03',
        sectionId: 'section-3',
        sectionTitle: 'Following Jesus',
        lessonNumber: 3,
        title: 'The Empty Tomb',
        subtitle: 'He is risen indeed',
        description: 'Celebrate the resurrection that shattered the bonds of the grave forever.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'RESURRECTION',
            definition: 'The bodily rising from the dead into indestructible life.',
            reference: 'John 11:25',
            explanation: 'Jesus said, "I am the resurrection and the life. The one who believes in me will live, even though they die."',
            hebrewOrGreek: 'Greek: Ἀνάστασις (Anastasis)'
          },
          {
            word: 'ALIVE',
            definition: 'Living forevermore, holding the keys of death and Hades.',
            reference: 'Revelation 1:18',
            explanation: 'I am the Living One; I was dead, and now look, I am alive for ever and ever!',
            hebrewOrGreek: 'Greek: Ζῶν (Zon)'
          },
          {
            word: 'TOMB',
            definition: 'The rock-hewn sepulcher left empty on the third day.',
            reference: 'Luke 24:2',
            explanation: 'They found the stone rolled away from the tomb, but when they entered, they did not find the body.',
            hebrewOrGreek: 'Greek: Μνημεῖον (Mnemeion)'
          },
          {
            word: 'DAWN',
            definition: 'The first light of Sunday when women hurried to anoint Jesus.',
            reference: 'Matthew 28:1',
            explanation: 'After the Sabbath, at dawn on the first day of the week, Mary Magdalene went to look at the tomb.',
            hebrewOrGreek: 'Greek: Ἐπιφώσκουσα (Epiphoskousa)'
          },
          {
            word: 'ANGEL',
            definition: 'The heavenly messenger who proclaimed, "He is not here!"',
            reference: 'Matthew 28:6',
            explanation: 'He is not here; he has risen, just as he said. Come and see the place where he lay.',
            hebrewOrGreek: 'Greek: Ἄγγελος (Angelos)'
          },
          {
            word: 'TRIUMPH',
            definition: 'Decisive overthrow of spiritual rulers and death itself.',
            reference: 'Colossians 2:15',
            explanation: 'Having disarmed the powers and authorities, he made a public spectacle of them, triumphing over them.',
            hebrewOrGreek: 'Greek: Θριαμβεύσας (Thriambeusas)'
          },
          {
            word: 'WITNESS',
            definition: 'Those who saw the risen Christ and bore testimony with their lives.',
            reference: 'Acts 1:8',
            explanation: 'You will receive power when the Holy Spirit comes on you; and you will be my witnesses.',
            hebrewOrGreek: 'Greek: Μάρτυς (Martys)'
          }
        ],
        scripture: {
          reference: '1 Corinthians 15:20',
          text: 'But Christ has indeed been raised from the dead, the firstfruits of those who have fallen asleep.',
          context: 'Paul’s glorious defense of the bodily resurrection as the foundation of Christian hope.'
        }
      },
      {
        id: 'jesus-04',
        sectionId: 'section-3',
        sectionTitle: 'Following Jesus',
        lessonNumber: 4,
        title: 'The Cost of Discipleship',
        subtitle: 'Take up your cross',
        description: 'Heed the call of Christ to deny oneself, follow daily, and find true life.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'DISCIPLE',
            definition: 'A lifelong learner and follower apprenticed to Jesus.',
            reference: 'Luke 14:27',
            explanation: 'Whoever does not carry their cross and follow me cannot be my disciple.',
            hebrewOrGreek: 'Greek: Μαθητής (Mathetes)'
          },
          {
            word: 'FOLLOW',
            definition: 'Walking in the steps, teachings, and character of Jesus.',
            reference: 'Matthew 4:19',
            explanation: '"Come, follow me," Jesus said, "and I will send you out to fish for people."',
            hebrewOrGreek: 'Greek: Ἀκολουθέω (Akoloutheo)'
          },
          {
            word: 'SERVANT',
            definition: 'One who considers others above themselves with humble posture.',
            reference: 'Matthew 20:26',
            explanation: 'Whoever wants to become great among you must be your servant.',
            hebrewOrGreek: 'Greek: Διάκονος (Diakonos)'
          },
          {
            word: 'DENIAL',
            definition: 'Surrendering self-centered ambition to embrace God’s will.',
            reference: 'Luke 9:23',
            explanation: 'Whoever wants to be my disciple must deny themselves and take up their cross daily.',
            hebrewOrGreek: 'Greek: Ἀπαρνέομαι (Aparneomai)'
          },
          {
            word: 'OBEDIENCE',
            definition: 'Faithful adherence to Christ’s commandments out of love.',
            reference: 'John 14:15',
            explanation: 'If you love me, keep my commands.',
            hebrewOrGreek: 'Greek: Ὑπακοή (Hypakoe)'
          },
          {
            word: 'HUMILITY',
            definition: 'Recognizing one’s complete dependence on God without pride.',
            reference: 'Philippians 2:3',
            explanation: 'Do nothing out of selfish ambition or vain conceit. Rather, in humility value others above yourselves.',
            hebrewOrGreek: 'Greek: Ταπεινοφροσύνη (Tapeinophrosyne)'
          },
          {
            word: 'PERSEVERE',
            definition: 'Steadfast endurance in the race set before us.',
            reference: 'Hebrews 12:1',
            explanation: 'Let us run with perseverance the race marked out for us, fixing our eyes on Jesus.',
            hebrewOrGreek: 'Greek: Ὑπομονή (Hypomone)'
          }
        ],
        scripture: {
          reference: 'Luke 9:23',
          text: 'Then he said to them all: "Whoever wants to be my disciple must deny themselves and take up their cross daily and follow me."',
          context: 'Jesus instructs His followers on the radical lifestyle of daily dedication.'
        }
      },
      {
        id: 'jesus-05',
        sectionId: 'section-3',
        sectionTitle: 'Following Jesus',
        lessonNumber: 5,
        title: 'The Great Commission',
        subtitle: 'Go into all the world',
        description: 'Carry the message of redemption to every nation under Christ’s authority.',
        difficulty: 'master',
        gridSize: 14,
        timeLimit: 45,
        words: [
          {
            word: 'COMMISSION',
            definition: 'The divine mandate entrusted by Jesus to His church.',
            reference: 'Matthew 28:19',
            explanation: 'Go and make disciples of all nations, baptizing them in the name of the Father, Son, and Holy Spirit.',
            hebrewOrGreek: 'Latin: Commissio'
          },
          {
            word: 'NATIONS',
            definition: 'Every people group, tongue, tribe, and culture.',
            reference: 'Revelation 7:9',
            explanation: 'A great multitude that no one could count, from every nation, tribe, people and language.',
            hebrewOrGreek: 'Greek: Ἔθνη (Ethne)'
          },
          {
            word: 'BAPTIZE',
            definition: 'Public identification with Christ’s death, burial, and resurrection.',
            reference: 'Romans 6:4',
            explanation: 'We were therefore buried with him through baptism into death.',
            hebrewOrGreek: 'Greek: Βαπτίζω (Baptizo)'
          },
          {
            word: 'AUTHORITY',
            definition: 'Universal supreme power given to Christ in heaven and on earth.',
            reference: 'Matthew 28:18',
            explanation: 'All authority in heaven and on earth has been given to me.',
            hebrewOrGreek: 'Greek: Ἐξουσία (Exousia)'
          },
          {
            word: 'TEACHING',
            definition: 'Instructing believers to observe everything Christ commanded.',
            reference: 'Acts 2:42',
            explanation: 'They devoted themselves to the apostles’ teaching and to fellowship.',
            hebrewOrGreek: 'Greek: Διδαχή (Didache)'
          },
          {
            word: 'PRESENCE',
            definition: 'The abiding assurance: "I am with you always, to the end of the age."',
            reference: 'Matthew 28:20',
            explanation: 'And surely I am with you always, to the very end of the age.',
            hebrewOrGreek: 'Hebrew: פָּנִים (Panim)'
          },
          {
            word: 'GOSPEL',
            definition: 'The good news that Christ died for our sins and rose victorious.',
            reference: 'Romans 1:16',
            explanation: 'For I am not ashamed of the gospel, because it is the power of God that brings salvation.',
            hebrewOrGreek: 'Greek: Εὐαγγέλιον (Euangelion)'
          },
          {
            word: 'HARVEST',
            definition: 'The spiritual fields ripe for the gathering of souls.',
            reference: 'Luke 10:2',
            explanation: 'The harvest is plentiful, but the workers are few. Ask the Lord of the harvest to send out workers.',
            hebrewOrGreek: 'Greek: Θερισμός (Therismos)'
          }
        ],
        scripture: {
          reference: 'Matthew 28:19–20',
          text: 'Therefore go and make disciples of all nations, baptizing them in the name of the Father and of the Son and of the Holy Spirit, and teaching them to obey everything I have commanded you.',
          context: 'The climactic commission given by the risen Lord on the mountain in Galilee.'
        }
      }
    ]
  },
  {
    id: 'section-4',
    number: 4,
    title: 'The Holy Spirit',
    subtitle: 'The Helper, Comforter & Guide',
    iconName: 'Flame',
    description: 'Learn the person and work of the Holy Spirit: conviction, the Fruit of the Spirit, spiritual gifts, and daily walking in power.',
    lessons: [
      {
        id: 'spirit-01',
        sectionId: 'section-4',
        sectionTitle: 'The Holy Spirit',
        lessonNumber: 1,
        title: 'The Promise of the Helper',
        subtitle: 'The Paraclete sent from the Father',
        description: 'Receive the assurance of the Comforter who dwells with us and will be in us.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'HELPER',
            definition: 'The Paraclete called alongside to counsel, advocate, and strengthen.',
            reference: 'John 14:16',
            explanation: 'I will ask the Father, and he will give you another advocate to help you and be with you forever.',
            hebrewOrGreek: 'Greek: Παράκλητος (Parakletos)'
          },
          {
            word: 'PENTECOST',
            definition: 'The outpouring of the Holy Spirit upon the disciples in Jerusalem.',
            reference: 'Acts 2:1',
            explanation: 'When the day of Pentecost came, they were all together in one place.',
            hebrewOrGreek: 'Greek: Πεντηκοστή (Pentekoste)'
          },
          {
            word: 'FIRE',
            definition: 'The purifying, blazing presence of God filling His people.',
            reference: 'Acts 2:3',
            explanation: 'They saw what seemed to be tongues of fire that separated and came to rest on each of them.',
            hebrewOrGreek: 'Hebrew: אֵשׁ (Esh)'
          },
          {
            word: 'WIND',
            definition: 'The sovereign, mysterious movement of the Spirit blowing where He wills.',
            reference: 'John 3:8',
            explanation: 'The wind blows wherever it pleases. You hear its sound, but you cannot tell where it comes from.',
            hebrewOrGreek: 'Hebrew: רוּחַ (Ruach)'
          },
          {
            word: 'TEMPLE',
            definition: 'The physical body of the believer as a sanctuary for God’s Spirit.',
            reference: '1 Corinthians 6:19',
            explanation: 'Do you not know that your bodies are temples of the Holy Spirit, who is in you?',
            hebrewOrGreek: 'Greek: Ναός (Naos)'
          },
          {
            word: 'SEAL',
            definition: 'The divine guarantee marking the believer as God’s permanent possession.',
            reference: 'Ephesians 1:13',
            explanation: 'When you believed, you were marked in him with a seal, the promised Holy Spirit.',
            hebrewOrGreek: 'Greek: Σφραγίς (Sphragis)'
          }
        ],
        scripture: {
          reference: 'John 14:26',
          text: 'But the Advocate, the Holy Spirit, whom the Father will send in my name, will teach you all things and will remind you of everything I have said to you.',
          context: 'Jesus comforts His disciples before His arrest with the promise of the indwelling Spirit.'
        }
      },
      {
        id: 'spirit-02',
        sectionId: 'section-4',
        sectionTitle: 'The Holy Spirit',
        lessonNumber: 2,
        title: 'The Fruit of the Spirit',
        subtitle: 'Character born of the Vine',
        description: 'Cultivate the virtues produced in our lives when we abide in the Spirit.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'LOVE',
            definition: 'Agape: selfless, sacrificial, unconditional divine love.',
            reference: 'Galatians 5:22',
            explanation: 'The fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness.',
            hebrewOrGreek: 'Greek: Ἀγάπη (Agape)'
          },
          {
            word: 'JOY',
            definition: 'Deep supernatural gladness rooted in Christ, independent of circumstances.',
            reference: 'Galatians 5:22',
            explanation: 'Joy springs from the presence of God; in His presence is fullness of joy.',
            hebrewOrGreek: 'Greek: Χαρά (Chara)'
          },
          {
            word: 'PEACE',
            definition: 'Inner tranquil calm surpassing all human understanding.',
            reference: 'Philippians 4:7',
            explanation: 'The peace of God, which transcends all understanding, will guard your hearts and your minds.',
            hebrewOrGreek: 'Greek: Εἰρήνη (Eirene)'
          },
          {
            word: 'PATIENCE',
            definition: 'Long-suffering endurance with difficult people and trying situations.',
            reference: 'Galatians 5:22',
            explanation: 'Makrothumia — holding back anger and waiting gracefully upon the Lord.',
            hebrewOrGreek: 'Greek: Μακροθυμία (Makrothumia)'
          },
          {
            word: 'GOODNESS',
            definition: 'Moral integrity, generous actions, and upright behavior.',
            reference: 'Galatians 5:22',
            explanation: 'Goodness actively blesses others and reflects the Father of lights.',
            hebrewOrGreek: 'Greek: Ἀγαθωσύνη (Agathosyne)'
          },
          {
            word: 'GENTLENESS',
            definition: 'Meekness: strength under submission to God’s Spirit.',
            reference: 'Galatians 5:23',
            explanation: 'Blessed are the meek, for they will inherit the earth.',
            hebrewOrGreek: 'Greek: Πραΰτης (Prautes)'
          },
          {
            word: 'FAITHFUL',
            definition: 'Trustworthiness, loyalty, and unwavering reliability.',
            reference: 'Galatians 5:22',
            explanation: 'Faithfulness manifests when our words and commitments remain steadfast.',
            hebrewOrGreek: 'Greek: Πίστις (Pistis)'
          },
          {
            word: 'TEMPERANCE',
            definition: 'Self-control through the mastery of the Spirit over fleshly desires.',
            reference: 'Galatians 5:23',
            explanation: 'Enkrateia — disciplined living aligned with the commandments of God.',
            hebrewOrGreek: 'Greek: Ἐγκράτεια (Enkrateia)'
          }
        ],
        scripture: {
          reference: 'Galatians 5:22–23',
          text: 'But the fruit of the Spirit is love, joy, peace, forbearance, kindness, goodness, faithfulness, gentleness and self-control. Against such things there is no law.',
          context: 'Paul contrasts the works of the flesh with the ninefold harvest of the Holy Spirit.'
        }
      },
      {
        id: 'spirit-03',
        sectionId: 'section-4',
        sectionTitle: 'The Holy Spirit',
        lessonNumber: 3,
        title: 'Spiritual Gifts',
        subtitle: 'Empowered for the Body',
        description: 'Learn how the Spirit equips every believer to build up the church in love.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'GIFTS',
            definition: 'Supernatural empowerments distributed by the Spirit for the common good.',
            reference: '1 Corinthians 12:4',
            explanation: 'There are different kinds of gifts, but the same Spirit distributes them.',
            hebrewOrGreek: 'Greek: Χαρίσματα (Charismata)'
          },
          {
            word: 'EDIFY',
            definition: 'Building up, encouraging, and strengthening fellow believers in faith.',
            reference: '1 Corinthians 14:12',
            explanation: 'Try to excel in those gifts that build up the church.',
            hebrewOrGreek: 'Greek: Οἰκοδομή (Oikodome)'
          },
          {
            word: 'UNITY',
            definition: 'The oneness of the body of Christ under one Lord, one faith, one baptism.',
            reference: 'Ephesians 4:3',
            explanation: 'Make every effort to keep the unity of the Spirit through the bond of peace.',
            hebrewOrGreek: 'Greek: Ἑνότης (Henotes)'
          },
          {
            word: 'PROPHECY',
            definition: 'Speaking forth God’s word for strengthening, encouraging, and comfort.',
            reference: '1 Corinthians 14:3',
            explanation: 'The one who prophesies speaks to people for their strengthening, encouraging and comfort.',
            hebrewOrGreek: 'Greek: Προφητεία (Propheteia)'
          },
          {
            word: 'WISDOM',
            definition: 'The spiritual insight to apply divine truth to complex situations.',
            reference: '1 Corinthians 12:8',
            explanation: 'To one there is given through the Spirit a message of wisdom.',
            hebrewOrGreek: 'Greek: Σοφία (Sophia)'
          },
          {
            word: 'HEALING',
            definition: 'Gifts of divine restoration and health through the name of Jesus.',
            reference: '1 Corinthians 12:9',
            explanation: 'To another gifts of healing by that one Spirit.',
            hebrewOrGreek: 'Greek: Ἴαμα (Iama)'
          },
          {
            word: 'SERVICE',
            definition: 'Humble, practical ministry meeting the physical and spiritual needs of saints.',
            reference: 'Romans 12:7',
            explanation: 'If your gift is serving, then serve; if it is teaching, then teach.',
            hebrewOrGreek: 'Greek: Διακονία (Diakonia)'
          }
        ],
        scripture: {
          reference: '1 Corinthians 12:7',
          text: 'Now to each one the manifestation of the Spirit is given for the common good.',
          context: 'Paul explains that spiritual gifts are not for personal pride, but for serving the body.'
        }
      },
      {
        id: 'spirit-04',
        sectionId: 'section-4',
        sectionTitle: 'The Holy Spirit',
        lessonNumber: 4,
        title: 'Walking in the Spirit',
        subtitle: 'Living in step with God',
        description: 'Keep in step with the Holy Spirit and overcome the cravings of the flesh.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'WALK',
            definition: 'The daily habitual conduct and lifestyle of the believer.',
            reference: 'Galatians 5:16',
            explanation: 'So I say, walk by the Spirit, and you will not gratify the desires of the flesh.',
            hebrewOrGreek: 'Greek: Περιπατέω (Peripateo)'
          },
          {
            word: 'GUIDE',
            definition: 'The Holy Spirit leading disciples into all truth.',
            reference: 'John 16:13',
            explanation: 'When he, the Spirit of truth, comes, he will guide you into all the truth.',
            hebrewOrGreek: 'Greek: Ὁδηγέω (Hodegeo)'
          },
          {
            word: 'RENEWAL',
            definition: 'The ongoing restoration of the mind and spirit after God’s likeness.',
            reference: 'Titus 3:5',
            explanation: 'He saved us through the washing of rebirth and renewal by the Holy Spirit.',
            hebrewOrGreek: 'Greek: Ἀνακαίνωσις (Anakainosis)'
          },
          {
            word: 'CONVICT',
            definition: 'The gentle yet piercing illumination of sin, righteousness, and judgment.',
            reference: 'John 16:8',
            explanation: 'When he comes, he will prove the world to be in the wrong about sin and righteousness.',
            hebrewOrGreek: 'Greek: Ἐλέγχω (Elencho)'
          },
          {
            word: 'POWER',
            definition: 'Dunamis: divine capability and strength granted for holy living and witness.',
            reference: 'Acts 1:8',
            explanation: 'You will receive power when the Holy Spirit comes on you.',
            hebrewOrGreek: 'Greek: Δύναμις (Dunamis)'
          },
          {
            word: 'INTERCEDE',
            definition: 'The Spirit groaning on our behalf with wordless sighs in prayer.',
            reference: 'Romans 8:26',
            explanation: 'The Spirit himself intercedes for us through wordless groans.',
            hebrewOrGreek: 'Greek: Ὑπερεντυγχάνω (Hyperentynchano)'
          },
          {
            word: 'ANOINTING',
            definition: 'The consecrated touch and presence of the Spirit resting upon the saint.',
            reference: '1 John 2:20',
            explanation: 'You have an anointing from the Holy One, and all of you know the truth.',
            hebrewOrGreek: 'Greek: Χρῖσμα (Chrisma)'
          }
        ],
        scripture: {
          reference: 'Galatians 5:25',
          text: 'Since we live by the Spirit, let us keep in step with the Spirit.',
          context: 'Paul’s call to march in harmony with the divine tempo of the Holy Spirit.'
        }
      },
      {
        id: 'spirit-05',
        sectionId: 'section-4',
        sectionTitle: 'The Holy Spirit',
        lessonNumber: 5,
        title: 'Transformation & Glory',
        subtitle: 'From glory to glory',
        description: 'Be transformed into the image of Christ by the sovereign work of the Spirit.',
        difficulty: 'master',
        gridSize: 14,
        timeLimit: 45,
        words: [
          {
            word: 'TRANSFORMATION',
            definition: 'Metamorphosis: deep supernatural overhaul from within by the Spirit.',
            reference: 'Romans 12:2',
            explanation: 'Do not conform to the pattern of this world, but be transformed by the renewing of your mind.',
            hebrewOrGreek: 'Greek: Μεταμόρφωσις (Metamorphosis)'
          },
          {
            word: 'SANCTIFY',
            definition: 'Being set apart and cleansed to become progressively more like Christ.',
            reference: '1 Thessalonians 5:23',
            explanation: 'May God himself, the God of peace, sanctify you through and through.',
            hebrewOrGreek: 'Greek: Ἁγιάζω (Hagiazo)'
          },
          {
            word: 'REVELATION',
            definition: 'The unveiling of spiritual truth that human wisdom cannot uncover.',
            reference: 'Ephesians 1:17',
            explanation: 'May God give you the Spirit of wisdom and revelation, so that you may know him better.',
            hebrewOrGreek: 'Greek: Ἀποκάλυψις (Apokalypsis)'
          },
          {
            word: 'ILLUMINATE',
            definition: 'Shining light upon the spiritual eyes to comprehend the hope of His calling.',
            reference: 'Ephesians 1:18',
            explanation: 'I pray that the eyes of your heart may be enlightened in order that you may know the hope.',
            hebrewOrGreek: 'Greek: Φωτίζω (Photizo)'
          },
          {
            word: 'CONSECRATE',
            definition: 'Dedicating one’s whole life exclusively to the glory and service of God.',
            reference: 'Joshua 3:5',
            explanation: 'Consecrate yourselves, for tomorrow the Lord will do amazing things among you.',
            hebrewOrGreek: 'Hebrew: קָדַשׁ (Qadash)'
          },
          {
            word: 'RIGHTEOUSNESS',
            definition: 'The beauty of a life walking in true moral holiness and integrity.',
            reference: 'Romans 6:18',
            explanation: 'You have been set free from sin and have become slaves to righteousness.',
            hebrewOrGreek: 'Greek: Δικαιοσύνη (Dikaiosyne)'
          },
          {
            word: 'REDEMPTION',
            definition: 'Full deliverance purchased by Christ, culminating in the bodily resurrection.',
            reference: 'Ephesians 1:7',
            explanation: 'In him we have redemption through his blood, the forgiveness of sins.',
            hebrewOrGreek: 'Greek: Ἀπολύτρωσις (Apolytrosis)'
          },
          {
            word: 'FELLOWSHIP',
            definition: 'Koinonia: deep spiritual communion shared between saints and God.',
            reference: '2 Corinthians 13:14',
            explanation: 'May the grace of the Lord Jesus Christ, and the fellowship of the Holy Spirit be with you all.',
            hebrewOrGreek: 'Greek: Κοινωνία (Koinonia)'
          }
        ],
        scripture: {
          reference: '2 Corinthians 3:18',
          text: 'And we all, who with unveiled faces contemplate the Lord’s glory, are being transformed into his image with ever-increasing glory, which comes from the Lord, who is the Spirit.',
          context: 'Paul describes the believer’s progressive sanctification into the likeness of Jesus.'
        }
      }
    ]
  },
  {
    id: 'section-5',
    number: 5,
    title: 'Kingdom Life',
    subtitle: 'Walking in Light & Eternal Hope',
    iconName: 'Crown',
    description: 'Live as citizens of heaven: the Sermon on the Mount, the whole armor of God, fervent prayer, and our eternal hope.',
    lessons: [
      {
        id: 'kingdom-01',
        sectionId: 'section-5',
        sectionTitle: 'Kingdom Life',
        lessonNumber: 1,
        title: 'Sermon on the Mount',
        subtitle: 'Blessed are the poor in spirit',
        description: 'Study the upside-down kingdom values proclaimed by Jesus upon the hillside.',
        difficulty: 'intermediate',
        gridSize: 10,
        timeLimit: 75,
        words: [
          {
            word: 'BLESSED',
            definition: 'Makarios: genuinely fortunate, joyful, and approved in God’s sight.',
            reference: 'Matthew 5:3',
            explanation: 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.',
            hebrewOrGreek: 'Greek: Μακάριος (Makarios)'
          },
          {
            word: 'SALT',
            definition: 'Believers preserving moral integrity and adding divine flavor to society.',
            reference: 'Matthew 5:13',
            explanation: 'You are the salt of the earth. But if the salt loses its saltiness, how can it be made salty again?',
            hebrewOrGreek: 'Greek: Ἅλας (Halas)'
          },
          {
            word: 'LIGHT',
            definition: 'A city set on a hill that cannot be hidden from view.',
            reference: 'Matthew 5:14',
            explanation: 'You are the light of the world. A town built on a hill cannot be hidden.',
            hebrewOrGreek: 'Greek: Φῶς (Phos)'
          },
          {
            word: 'SHINE',
            definition: 'Letting your good deeds be seen so people glorify your heavenly Father.',
            reference: 'Matthew 5:16',
            explanation: 'Let your light shine before others, that they may see your good deeds and glorify your Father.',
            hebrewOrGreek: 'Greek: Λάμπω (Lampo)'
          },
          {
            word: 'MERCIFUL',
            definition: 'Showing compassion to others, just as our Father in heaven is merciful.',
            reference: 'Matthew 5:7',
            explanation: 'Blessed are the merciful, for they will be shown mercy.',
            hebrewOrGreek: 'Greek: Ἐλεήμων (Eleemon)'
          },
          {
            word: 'PEACEMAKER',
            definition: 'Those who bridge divisions with reconciliation, called children of God.',
            reference: 'Matthew 5:9',
            explanation: 'Blessed are the peacemakers, for they will be called children of God.',
            hebrewOrGreek: 'Greek: Εἰρηνοποιός (Eirenopoios)'
          }
        ],
        scripture: {
          reference: 'Matthew 5:16',
          text: 'In the same way, let your light shine before others, that they may see your good deeds and glorify your Father in heaven.',
          context: 'Jesus charges His disciples to illuminate a dark world with active love.'
        }
      },
      {
        id: 'kingdom-02',
        sectionId: 'section-5',
        sectionTitle: 'Kingdom Life',
        lessonNumber: 2,
        title: 'Prayer & Supplication',
        subtitle: 'Lord, teach us to pray',
        description: 'Draw near to the throne of grace with heartfelt petitions and thanksgiving.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'PRAYER',
            definition: 'Communion with our Heavenly Father, aligning our desires with His kingdom.',
            reference: 'Philippians 4:6',
            explanation: 'Do not be anxious about anything, but in every situation, by prayer and petition, make your requests known.',
            hebrewOrGreek: 'Greek: Προσευχή (Proseuche)'
          },
          {
            word: 'FASTING',
            definition: 'Abstaining from food to hunger primarily for God’s presence and will.',
            reference: 'Matthew 6:16',
            explanation: 'When you fast, do not look somber as the hypocrites do, for they disfigure their faces.',
            hebrewOrGreek: 'Greek: Νηστεία (Nesteia)'
          },
          {
            word: 'THANKS',
            definition: 'Gratitude celebrating God’s continual benevolence and faithfulness.',
            reference: '1 Thessalonians 5:18',
            explanation: 'Give thanks in all circumstances; for this is God’s will for you in Christ Jesus.',
            hebrewOrGreek: 'Greek: Εὐχαριστία (Eucharistia)'
          },
          {
            word: 'PETITION',
            definition: 'Humbly bringing specific personal and communal needs before God.',
            reference: '1 John 5:15',
            explanation: 'If we know that he hears us—whatever we ask—we know that we have what we asked of him.',
            hebrewOrGreek: 'Greek: Αἴτημα (Aitema)'
          },
          {
            word: 'SECRET',
            definition: 'Praying in the private closet where the Father sees and rewards.',
            reference: 'Matthew 6:6',
            explanation: 'When you pray, go into your room, close the door and pray to your Father, who is unseen.',
            hebrewOrGreek: 'Greek: Κρυπτός (Kryptos)'
          },
          {
            word: 'WORSHIP',
            definition: 'Bowing our will and affections before the Lord in spirit and truth.',
            reference: 'John 4:24',
            explanation: 'God is spirit, and his worshipers must worship in the Spirit and in truth.',
            hebrewOrGreek: 'Greek: Προσκυνέω (Proskyneo)'
          },
          {
            word: 'AMEN',
            definition: 'So be it! A firm affirmation of certainty and trust in God’s word.',
            reference: '2 Corinthians 1:20',
            explanation: 'No matter how many promises God has made, they are "Yes" in Christ. And so through him the "Amen" is spoken.',
            hebrewOrGreek: 'Hebrew: אָמֵן (Amen)'
          }
        ],
        scripture: {
          reference: 'Philippians 4:6–7',
          text: 'Do not be anxious about anything, but in every situation, by prayer and petition, with thanksgiving, present your requests to God. And the peace of God, which transcends all understanding, will guard your hearts and your minds in Christ Jesus.',
          context: 'Paul’s beloved antidote to anxiety through grateful prayer.'
        }
      },
      {
        id: 'kingdom-03',
        sectionId: 'section-5',
        sectionTitle: 'Kingdom Life',
        lessonNumber: 3,
        title: 'The Armor of God',
        subtitle: 'Stand firm against the schemes',
        description: 'Suit up with divine defenses to stand undefeated in the day of evil.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'ARMOR',
            definition: 'The panoply of spiritual virtues and truths provided by God for battle.',
            reference: 'Ephesians 6:11',
            explanation: 'Put on the full armor of God, so that you can take your stand against the devil’s schemes.',
            hebrewOrGreek: 'Greek: Πανοπλία (Panoplia)'
          },
          {
            word: 'TRUTH',
            definition: 'The belt buckled around the waist that holds everything securely in place.',
            reference: 'Ephesians 6:14',
            explanation: 'Stand firm then, with the belt of truth buckled around your waist.',
            hebrewOrGreek: 'Greek: Ἀλήθεια (Aletheia)'
          },
          {
            word: 'SHIELD',
            definition: 'The large shield of faith that extinguishes all flaming arrows of evil.',
            reference: 'Ephesians 6:16',
            explanation: 'Take up the shield of faith, with which you can extinguish all the flaming arrows of the evil one.',
            hebrewOrGreek: 'Greek: Θυρεός (Thyreos)'
          },
          {
            word: 'HELMET',
            definition: 'The helmet of salvation guarding our mind and thought life.',
            reference: 'Ephesians 6:17',
            explanation: 'Take the helmet of salvation and the sword of the Spirit, which is the word of God.',
            hebrewOrGreek: 'Greek: Περικεφαλαία (Perikephalaia)'
          },
          {
            word: 'SWORD',
            definition: 'The spoken Scripture: sharper than any double-edged blade.',
            reference: 'Hebrews 4:12',
            explanation: 'For the word of God is alive and active. Sharper than any double-edged sword.',
            hebrewOrGreek: 'Greek: Μάχαιρα (Machaira)'
          },
          {
            word: 'BREASTPLATE',
            definition: 'The breastplate of righteousness guarding the heart and vital organs.',
            reference: 'Ephesians 6:14',
            explanation: 'With the breastplate of righteousness in place.',
            hebrewOrGreek: 'Greek: Θώραξ (Thorax)'
          },
          {
            word: 'STAND',
            definition: 'Remaining immovable in Christ after doing everything to withstand the day.',
            reference: 'Ephesians 6:13',
            explanation: 'So that when the day of evil comes, you may be able to stand your ground, and after you have done everything, to stand.',
            hebrewOrGreek: 'Greek: Ἵστημι (Histemi)'
          }
        ],
        scripture: {
          reference: 'Ephesians 6:11',
          text: 'Put on the full armor of God, so that you can take your stand against the devil’s schemes.',
          context: 'Paul’s martial imagery urging believers to rely on God’s invincible defense.'
        }
      },
      {
        id: 'kingdom-04',
        sectionId: 'section-5',
        sectionTitle: 'Kingdom Life',
        lessonNumber: 4,
        title: 'Walking in the Light',
        subtitle: 'If we walk in the light',
        description: 'Live transparently with God and brethren, cleansed continuously by Jesus’ blood.',
        difficulty: 'advanced',
        gridSize: 12,
        timeLimit: 60,
        words: [
          {
            word: 'LIGHT',
            definition: 'God is light, and in Him there is no darkness at all.',
            reference: '1 John 1:5',
            explanation: 'This is the message we have heard from him and declare to you: God is light; in him there is no darkness at all.',
            hebrewOrGreek: 'Greek: Φῶς (Phos)'
          },
          {
            word: 'CONFESS',
            definition: 'Agreeing with God regarding our shortcomings with genuine repentance.',
            reference: '1 John 1:9',
            explanation: 'If we confess our sins, he is faithful and just and will forgive us our sins and purify us.',
            hebrewOrGreek: 'Greek: Ὁμολογέω (Homologeo)'
          },
          {
            word: 'CLEANSE',
            definition: 'Purification that removes all stain of unrighteousness.',
            reference: '1 John 1:7',
            explanation: 'The blood of Jesus, his Son, purifies us from all sin.',
            hebrewOrGreek: 'Greek: Καθαρίζω (Katharizo)'
          },
          {
            word: 'BROTHER',
            definition: 'Fellow traveler in Christ whom we love with genuine affection.',
            reference: '1 John 3:14',
            explanation: 'We know that we have passed from death to life, because we love each other.',
            hebrewOrGreek: 'Greek: Ἀδελφός (Adelphos)'
          },
          {
            word: 'ABIDE',
            definition: 'Remaining continually nestled in the Vine of Christ’s presence.',
            reference: 'John 15:4',
            explanation: 'Remain in me, as I also remain in you. No branch can bear fruit by itself; it must remain in the vine.',
            hebrewOrGreek: 'Greek: Μένω (Meno)'
          },
          {
            word: 'OVERCOME',
            definition: 'Conquering the world through faith in the Son of God.',
            reference: '1 John 5:4',
            explanation: 'For everyone born of God overcomes the world. This is the victory that has overcome the world, even our faith.',
            hebrewOrGreek: 'Greek: Νικάω (Nikao)'
          },
          {
            word: 'COMMAND',
            definition: 'Love one another as Christ has loved us.',
            reference: 'John 13:34',
            explanation: 'A new command I give you: Love one another. As I have loved you, so you must love one another.',
            hebrewOrGreek: 'Greek: Ἐντολή (Entole)'
          }
        ],
        scripture: {
          reference: '1 John 1:7',
          text: 'But if we walk in the light, as he is in the light, we have fellowship with one another, and the blood of Jesus, his Son, purifies us from all sin.',
          context: 'John highlights authentic fellowship rooted in honesty before God.'
        }
      },
      {
        id: 'kingdom-05',
        sectionId: 'section-5',
        sectionTitle: 'Kingdom Life',
        lessonNumber: 5,
        title: 'The New Jerusalem',
        subtitle: 'Behold, I make all things new',
        description: 'Anticipate the consummation of all history: the celestial city where God wipes away every tear.',
        difficulty: 'master',
        gridSize: 14,
        timeLimit: 45,
        words: [
          {
            word: 'JERUSALEM',
            definition: 'The holy celestial city descending out of heaven from God as a bride prepared.',
            reference: 'Revelation 21:2',
            explanation: 'I saw the Holy City, the new Jerusalem, coming down out of heaven from God.',
            hebrewOrGreek: 'Hebrew: יְרוּשָׁלַיִם (Yerushalayim)'
          },
          {
            word: 'CITIZEN',
            definition: 'Our true citizenship is in heaven, from where we eagerly await our Savior.',
            reference: 'Philippians 3:20',
            explanation: 'Our citizenship is in heaven. And we eagerly await a Savior from there.',
            hebrewOrGreek: 'Greek: Πολίτευμα (Politeuma)'
          },
          {
            word: 'TEARS',
            definition: 'Every sorrow, grief, and weep wiped away forever by the Father’s own hand.',
            reference: 'Revelation 21:4',
            explanation: 'He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain.',
            hebrewOrGreek: 'Greek: Δάκρυον (Dakryon)'
          },
          {
            word: 'MARANATHA',
            definition: 'An ancient Aramaic prayer of the early church: "Come, O Lord!"',
            reference: '1 Corinthians 16:22',
            explanation: 'Our Lord, come! The ardent cry of the bride awaiting her bridegroom.',
            hebrewOrGreek: 'Aramaic: מָרָנָא תָא (Maranatha)'
          },
          {
            word: 'INHERITANCE',
            definition: 'An incorruptible, undefiled eternal reward reserved in heaven.',
            reference: '1 Peter 1:4',
            explanation: 'Into an inheritance that can never perish, spoil or fade. This inheritance is kept in heaven for you.',
            hebrewOrGreek: 'Greek: Κληρονομία (Kleronomia)'
          },
          {
            word: 'HALLELUJAH',
            definition: 'Praise the Lord! The celestial chorus echoing across eternity.',
            reference: 'Revelation 19:1',
            explanation: 'Hallelujah! Salvation and glory and power belong to our God.',
            hebrewOrGreek: 'Hebrew: הַלְלוּיָהּ (Hallelujah)'
          },
          {
            word: 'BRIDEGROOM',
            definition: 'Christ who gave Himself for the Church and will present her without spot.',
            reference: 'Revelation 19:7',
            explanation: 'Let us rejoice and be glad and give him glory! For the wedding of the Lamb has come.',
            hebrewOrGreek: 'Greek: Νυμφίος (Nymphios)'
          },
          {
            word: 'EVERLASTING',
            definition: 'Enduring without terminus in the glorious presence of the King of Kings.',
            reference: 'Daniel 7:14',
            explanation: 'His dominion is an everlasting dominion that will not pass away, and his kingdom is one that will never be destroyed.',
            hebrewOrGreek: 'Hebrew: עָלַם (Alam)'
          }
        ],
        scripture: {
          reference: 'Revelation 21:3–4',
          text: 'Look! God’s dwelling place is now among the people, and he will dwell with them. They will be his people, and God himself will be with them and be their God. "He will wipe every tear from their eyes. There will be no more death or mourning or crying or pain, for the old order of things has passed away."',
          context: 'The ultimate climax of the biblical story: eternal fellowship between God and His redeemed people.'
        }
      }
    ]
  }
];

export const ALL_LESSONS = SECTIONS.flatMap(s => s.lessons);

export function getLessonById(id: string) {
  return ALL_LESSONS.find(l => l.id === id);
}

export function getNextLesson(currentId: string) {
  const currentIndex = ALL_LESSONS.findIndex(l => l.id === currentId);
  if (currentIndex >= 0 && currentIndex < ALL_LESSONS.length - 1) {
    return ALL_LESSONS[currentIndex + 1];
  }
  return null;
}
