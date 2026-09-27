import { World } from '../types/curriculum';

export const WORLDS_DATA: World[] = [
  // ==========================================
  // WORLD 1: ME, MY FAMILY & FRIENDS (TERM 1)
  // ==========================================
  {
    id: 'world-1',
    term: 1,
    nameEn: 'Me, My Family & Friends',
    nameAr: 'أنا وعائلتي وأصدقائي',
    theme: 'Sunny Algerian Oasis & School Start',
    bgTheme: 'from-amber-400 via-orange-300 to-yellow-200',
    descriptionEn: 'Start your journey with Massi! Learn greetings, letters, numbers, classroom commands, and family.',
    descriptionAr: 'ابدأ رحلتك مع ماسي! تعلم التحيات، الحروف، الأرقام، أوامر القسم، وأفراد العائلة.',
    badgeName: 'Golden Fennec Explorer',
    badgeIcon: '🦊',
    units: [
      {
        id: 'u1-greetings',
        unitNumber: 1,
        term: 1,
        titleEn: 'Greetings & Self-Introduction',
        titleAr: 'التحيات والتعريف بالنفس',
        subtitle: 'Hello! What is your name?',
        icon: '👋',
        color: 'bg-emerald-500',
        bgGradient: 'from-emerald-500 to-teal-600',
        description: 'Meet Gaya and Arenas, say hello, talk about your age and where you live in Algeria!',
        vocabulary: [
          {
            id: 'w1',
            english: 'Hello',
            arabic: 'مرحباً / أهلاً',
            french: 'Bonjour / Salut',
            category: 'Greetings',
            emoji: '👋',
            phonetic: '/həˈloʊ/',
            exampleSentence: 'Hello, my name is Massi!',
            exampleArabic: 'مرحباً، اسمي ماسي!'
          },
          {
            id: 'w2',
            english: 'Hi',
            arabic: 'أهلاً',
            french: 'Salut',
            category: 'Greetings',
            emoji: '✋',
            phonetic: '/haɪ/',
            exampleSentence: 'Hi friend!',
            exampleArabic: 'أهلاً يا صديقي!'
          },
          {
            id: 'w3',
            english: 'Good morning',
            arabic: 'صباح الخير',
            french: 'Bonjour (le matin)',
            category: 'Greetings',
            emoji: '🌅',
            phonetic: '/ɡʊd ˈmɔːrnɪŋ/',
            exampleSentence: 'Good morning, teacher!',
            exampleArabic: 'صباح الخير يا معلمتي!'
          },
          {
            id: 'w4',
            english: 'Good afternoon',
            arabic: 'تحية بعد الظهر',
            french: 'Bon après-midi',
            category: 'Greetings',
            emoji: '☀️',
            phonetic: '/ɡʊd ˌæftərˈnuːn/',
            exampleSentence: 'Good afternoon, classmates!',
            exampleArabic: 'تحية بعد الظهر يا زملائي!'
          },
          {
            id: 'w5',
            english: 'Good evening',
            arabic: 'مساء الخير',
            french: 'Bonsoir',
            category: 'Greetings',
            emoji: '🌆',
            phonetic: '/ɡʊd ˈiːvnɪŋ/',
            exampleSentence: 'Good evening, Mom!',
            exampleArabic: 'مساء الخير يا أمي!'
          },
          {
            id: 'w6',
            english: 'Good night',
            arabic: 'تصبح على خير / ليلة سعيدة',
            french: 'Bonne nuit',
            category: 'Greetings',
            emoji: '🌙',
            phonetic: '/ɡʊd naɪt/',
            exampleSentence: 'Good night, sleep well!',
            exampleArabic: 'تصبح على خير ونم جيداً!'
          },
          {
            id: 'w7',
            english: 'Goodbye',
            arabic: 'إلى اللقاء',
            french: 'Au revoir',
            category: 'Greetings',
            emoji: '👋',
            phonetic: '/ɡʊdˈbaɪ/',
            exampleSentence: 'Goodbye, see you tomorrow!',
            exampleArabic: 'إلى اللقاء، نلتقي غداً!'
          },
          {
            id: 'w8',
            english: 'Algeria',
            arabic: 'الجزائر',
            french: 'Algérie',
            category: 'Self-Introduction',
            emoji: '🇩🇿',
            phonetic: '/ælˈdʒɪəriə/',
            exampleSentence: "I am from Algeria!",
            exampleArabic: 'أنا من الجزائر!'
          },
          {
            id: 'w9',
            english: 'Live',
            arabic: 'يعيش / أسكن',
            french: 'Vivre / Habiter',
            category: 'Self-Introduction',
            emoji: '🏡',
            phonetic: '/lɪv/',
            exampleSentence: 'I live in Bouira.',
            exampleArabic: 'أنا أعيش في البويرة.'
          },
          {
            id: 'w10',
            english: 'Speak',
            arabic: 'يتكلم / أتحدث',
            french: 'Parler',
            category: 'Self-Introduction',
            emoji: '🗣️',
            phonetic: '/spiːk/',
            exampleSentence: 'I speak Arabic, Tamazight, English, and French.',
            exampleArabic: 'أتحدث العربية، الأمازيغية، الإنجليزية، والفرنسية.'
          }
        ],
        tracingLetters: ['I', 'i', 'J', 'j', 'L', 'l', 'T', 't', 'U', 'u'],
        flashcardTargets: ['HELLO', 'GOODBYE', 'ALGERIA', 'HI', 'LIVE'],
        quizQuestions: [
          {
            id: 'q1-1',
            type: 'listen-choice',
            promptEn: 'Listen and choose: How do you say "صباح الخير"?',
            promptAr: 'استمع واختر: كيف نقول "صباح الخير"؟',
            targetWord: 'Good morning',
            options: [
              { id: 'opt1', text: 'Good morning', emoji: '🌅', isCorrect: true },
              { id: 'opt2', text: 'Good night', emoji: '🌙', isCorrect: false },
              { id: 'opt3', text: 'Goodbye', emoji: '👋', isCorrect: false }
            ],
            explanationEn: 'Good morning is said in the morning when the sun rises!'
          },
          {
            id: 'q1-2',
            type: 'match',
            promptEn: 'Gaya says: "I live in..."',
            promptAr: 'غايا يقول: "I live in..."',
            targetWord: 'Algeria',
            options: [
              { id: 'opt1', text: 'Algeria', emoji: '🇩🇿', isCorrect: true },
              { id: 'opt2', text: 'Goodbye', emoji: '👋', isCorrect: false },
              { id: 'opt3', text: 'Yellow', emoji: '🟡', isCorrect: false }
            ],
            explanationEn: '"I live in Algeria" means أنا أعيش في الجزائر!'
          }
        ]
      },
      {
        id: 'u2-alphabet-numbers',
        unitNumber: 2,
        term: 1,
        titleEn: 'Alphabet & Numbers (0 - 10)',
        titleAr: 'الحروف والأرقام (0 إلى 10)',
        subtitle: 'A B C and 1 2 3!',
        icon: '🔢',
        color: 'bg-indigo-500',
        bgGradient: 'from-indigo-500 to-purple-600',
        description: 'Master capital & small letters and learn to count from zero to ten like a champ!',
        vocabulary: [
          { id: 'n0', english: 'Zero', arabic: 'صفر', french: 'Zéro', category: 'Numbers', emoji: '0️⃣', phonetic: '/ˈzɪə.roʊ/' },
          { id: 'n1', english: 'One', arabic: 'واحد', french: 'Un', category: 'Numbers', emoji: '1️⃣', phonetic: '/wʌn/' },
          { id: 'n2', english: 'Two', arabic: 'اثنان', french: 'Deux', category: 'Numbers', emoji: '2️⃣', phonetic: '/tuː/' },
          { id: 'n3', english: 'Three', arabic: 'ثلاثة', french: 'Trois', category: 'Numbers', emoji: '3️⃣', phonetic: '/θriː/' },
          { id: 'n4', english: 'Four', arabic: 'أربعة', french: 'Quatre', category: 'Numbers', emoji: '4️⃣', phonetic: '/fɔːr/' },
          { id: 'n5', english: 'Five', arabic: 'خمسة', french: 'Cinq', category: 'Numbers', emoji: '5️⃣', phonetic: '/faɪv/' },
          { id: 'n6', english: 'Six', arabic: 'ستة', french: 'Six', category: 'Numbers', emoji: '6️⃣', phonetic: '/sɪks/' },
          { id: 'n7', english: 'Seven', arabic: 'سبعة', french: 'Sept', category: 'Numbers', emoji: '7️⃣', phonetic: '/ˈsev.ən/' },
          { id: 'n8', english: 'Eight', arabic: 'ثمانية', french: 'Huit', category: 'Numbers', emoji: '8️⃣', phonetic: '/eɪt/' },
          { id: 'n9', english: 'Nine', arabic: 'تسعة', french: 'Neuf', category: 'Numbers', emoji: '9️⃣', phonetic: '/naɪn/' },
          { id: 'n10', english: 'Ten', arabic: 'عشرة', french: 'Dix', category: 'Numbers', emoji: '🔟', phonetic: '/ten/' }
        ],
        tracingLetters: ['A', 'B', 'C', 'I', 'J', 'L', 'T', 'U'],
        flashcardTargets: ['ONE', 'TWO', 'THREE', 'FOUR', 'FIVE', 'SIX', 'SEVEN', 'EIGHT', 'NINE', 'TEN'],
        quizQuestions: [
          {
            id: 'q2-1',
            type: 'listen-choice',
            promptEn: 'How many apples? 🍏 🍏 🍏',
            promptAr: 'كم عدد التفاحات؟ 🍏 🍏 🍏',
            targetWord: 'Three',
            options: [
              { id: 'opt1', text: 'Three', emoji: '3️⃣', isCorrect: true },
              { id: 'opt2', text: 'Two', emoji: '2️⃣', isCorrect: false },
              { id: 'opt3', text: 'Five', emoji: '5️⃣', isCorrect: false }
            ],
            explanationEn: '1, 2, 3! That is THREE apples!'
          },
          {
            id: 'q2-2',
            type: 'match',
            promptEn: 'What is 5 + 2?',
            promptAr: 'ما هو حاصل 5 + 2؟',
            targetWord: 'Seven',
            options: [
              { id: 'opt1', text: 'Seven', emoji: '7️⃣', isCorrect: true },
              { id: 'opt2', text: 'Six', emoji: '6️⃣', isCorrect: false },
              { id: 'opt3', text: 'Eight', emoji: '8️⃣', isCorrect: false }
            ],
            explanationEn: '5 plus 2 equals 7 (Seven)!'
          }
        ]
      },
      {
        id: 'u3-commands',
        unitNumber: 3,
        term: 1,
        titleEn: 'School Commands',
        titleAr: 'أوامر داخل القسم',
        subtitle: 'Listen, Look, Read, Write!',
        icon: '📋',
        color: 'bg-amber-500',
        bgGradient: 'from-amber-500 to-orange-600',
        description: 'Understand what teacher says in class: Circle, Match, Tick, Cross, Draw, Colour!',
        vocabulary: [
          { id: 'c1', english: 'Listen', arabic: 'استمع', french: 'Écoute', category: 'Commands', emoji: '👂', phonetic: '/ˈlɪs.ən/' },
          { id: 'c2', english: 'Look', arabic: 'انظر', french: 'Regarde', category: 'Commands', emoji: '👀', phonetic: '/lʊk/' },
          { id: 'c3', english: 'Read', arabic: 'اقرأ', french: 'Lis', category: 'Commands', emoji: '📖', phonetic: '/riːd/' },
          { id: 'c4', english: 'Draw', arabic: 'ارسم', french: 'Dessine', category: 'Commands', emoji: '🎨', phonetic: '/drɔː/' },
          { id: 'c5', english: 'Colour', arabic: 'لوّن', french: 'Colorie', category: 'Commands', emoji: '🖍️', phonetic: '/ˈkʌl.ər/' },
          { id: 'c6', english: 'Write', arabic: 'اكتب', french: 'Écris', category: 'Commands', emoji: '✍️', phonetic: '/raɪt/' },
          { id: 'c7', english: 'Repeat', arabic: 'أعد / ردّد', french: 'Répète', category: 'Commands', emoji: '🦜', phonetic: '/rɪˈpiːt/' },
          { id: 'c8', english: 'Tick', arabic: 'ضع علامة صحيح (✓)', french: 'Coche (✓)', category: 'Commands', emoji: '✅', phonetic: '/tɪk/' },
          { id: 'c9', english: 'Cross', arabic: 'ضع علامة خطأ (✗)', french: 'Barre (✗)', category: 'Commands', emoji: '❌', phonetic: '/krɒs/' },
          { id: 'c10', english: 'Circle', arabic: 'أحِط بدائرة', french: 'Entoure', category: 'Commands', emoji: '⭕', phonetic: '/ˈsɜː.kəl/' },
          { id: 'c11', english: 'Match', arabic: 'اربط / صِل', french: 'Relie', category: 'Commands', emoji: '🔄', phonetic: '/mætʃ/' },
          { id: 'c12', english: 'Show / Point', arabic: 'أشِر إلى', french: 'Montre du doigt', category: 'Commands', emoji: '👉', phonetic: '/ʃoʊ/' }
        ],
        tracingLetters: ['L', 'l', 'R', 'r', 'W', 'w', 'T', 't'],
        flashcardTargets: ['LISTEN', 'LOOK', 'READ', 'WRITE', 'CIRCLE', 'TICK', 'CROSS'],
        quizQuestions: [
          {
            id: 'q3-1',
            type: 'listen-choice',
            promptEn: 'Which command means "ضع علامة صحيح"?',
            promptAr: 'أي أمر يعني "ضع علامة صحيح"؟',
            targetWord: 'Tick',
            options: [
              { id: 'opt1', text: 'Tick ✓', emoji: '✅', isCorrect: true },
              { id: 'opt2', text: 'Cross ✗', emoji: '❌', isCorrect: false },
              { id: 'opt3', text: 'Circle ⭕', emoji: '⭕', isCorrect: false }
            ],
            explanationEn: 'Tick means put a checkmark ✓!'
          },
          {
            id: 'q3-2',
            type: 'command-action',
            promptEn: 'Teacher says: "Circle the answer!" What shape is it?',
            promptAr: 'المعلمة تقول: "Circle the answer!" ما هو هذا الشكل؟',
            targetWord: 'Circle',
            options: [
              { id: 'opt1', text: 'Circle ⭕', emoji: '⭕', isCorrect: true },
              { id: 'opt2', text: 'Cross ❌', emoji: '❌', isCorrect: false },
              { id: 'opt3', text: 'Write ✍️', emoji: '✍️', isCorrect: false }
            ],
            explanationEn: 'Circle means to draw a round loop around the item!'
          }
        ]
      },
      {
        id: 'u4-family',
        unitNumber: 4,
        term: 1,
        titleEn: 'Family Members & Pronouns',
        titleAr: 'أفراد العائلة والضمائر',
        subtitle: 'Father, Mother, Brother, Sister',
        icon: '👨‍👩‍👧‍👦',
        color: 'bg-rose-500',
        bgGradient: 'from-rose-500 to-pink-600',
        description: 'Meet my family: Father (Dad/Daddy), Mother (Mum/Mommy), Grandfather, Grandmother!',
        vocabulary: [
          { id: 'f1', english: 'Father', arabic: 'الأب (Dad / Daddy)', french: 'Père / Papa', category: 'Family', emoji: '👨', phonetic: '/ˈfɑː.ðər/' },
          { id: 'f2', english: 'Mother', arabic: 'الأم (Mum / Mommy)', french: 'Mère / Maman', category: 'Family', emoji: '👩', phonetic: '/ˈmʌð.ər/' },
          { id: 'f3', english: 'Brother', arabic: 'الأخ', french: 'Frère', category: 'Family', emoji: '👦', phonetic: '/ˈbrʌð.ər/' },
          { id: 'f4', english: 'Sister', arabic: 'الأخت', french: 'Sœur', category: 'Family', emoji: '👧', phonetic: '/ˈsɪs.tər/' },
          { id: 'f5', english: 'Grandfather', arabic: 'الجد', french: 'Grand-père', category: 'Family', emoji: '👴', phonetic: '/ˈɡræn.fɑː.ðər/' },
          { id: 'f6', english: 'Grandmother', arabic: 'الجدة', french: 'Grand-mère', category: 'Family', emoji: '👵', phonetic: '/ˈɡræn.mʌð.ər/' },
          { id: 'f7', english: 'Me', arabic: 'أنا', french: 'Moi', category: 'Family', emoji: '🧒', phonetic: '/miː/' },
          { id: 'p1', english: 'I', arabic: 'أنا', french: 'Je', category: 'Pronouns', emoji: '🙋‍♂️', phonetic: '/aɪ/' },
          { id: 'p2', english: 'You', arabic: 'أنتَ / أنتِ', french: 'Tu / Vous', category: 'Pronouns', emoji: '🫵', phonetic: '/juː/' },
          { id: 'p3', english: 'He', arabic: 'هو', french: 'Il', category: 'Pronouns', emoji: '👦', phonetic: '/hiː/' },
          { id: 'p4', english: 'She', arabic: 'هي', french: 'Elle', category: 'Pronouns', emoji: '👧', phonetic: '/ʃiː/' }
        ],
        tracingLetters: ['F', 'f', 'M', 'm', 'B', 'b', 'S', 's'],
        flashcardTargets: ['FATHER', 'MOTHER', 'BROTHER', 'SISTER', 'GRANDFATHER', 'GRANDMOTHER'],
        quizQuestions: [
          {
            id: 'q4-1',
            type: 'listen-choice',
            promptEn: 'Who is "Mother"?',
            promptAr: 'من هي "Mother"؟',
            targetWord: 'Mother',
            options: [
              { id: 'opt1', text: 'الأم (Mum / Mommy)', emoji: '👩', isCorrect: true },
              { id: 'opt2', text: 'الأخ (Brother)', emoji: '👦', isCorrect: false },
              { id: 'opt3', text: 'الجد (Grandfather)', emoji: '👴', isCorrect: false }
            ],
            explanationEn: 'Mother is our lovely Mum!'
          },
          {
            id: 'q4-2',
            type: 'match',
            promptEn: 'For a boy, we say: "..." is my brother.',
            promptAr: 'للولد نقول: "... is my brother"',
            targetWord: 'He',
            options: [
              { id: 'opt1', text: 'He (هو)', emoji: '👦', isCorrect: true },
              { id: 'opt2', text: 'She (هي)', emoji: '👧', isCorrect: false },
              { id: 'opt3', text: 'I (أنا)', emoji: '🙋', isCorrect: false }
            ],
            explanationEn: 'He is used for boys (He is my brother)!'
          }
        ]
      }
    ]
  },

  // ==========================================
  // WORLD 2: MY SCHOOL, HOME & PLAY TIME (TERM 2)
  // ==========================================
  {
    id: 'world-2',
    term: 2,
    nameEn: 'My School & Play Time',
    nameAr: 'مدرستي ووقت لعبي ومنزلي',
    theme: 'Colorful Town & Playground',
    bgTheme: 'from-sky-400 via-blue-300 to-cyan-200',
    descriptionEn: 'Explore school objects, house rooms, toys, and radiant colors!',
    descriptionAr: 'اكتشف أدوات المدرسة، غرف المنزل، الألعاب، والألوان الزاهية!',
    badgeName: 'School & Playground Champion',
    badgeIcon: '🚀',
    units: [
      {
        id: 'u5-school-colours',
        unitNumber: 5,
        term: 2,
        titleEn: 'School Things & Colours',
        titleAr: 'أدوات المدرسة والألوان',
        subtitle: 'What is this? What colour is it?',
        icon: '🎒',
        color: 'bg-blue-500',
        bgGradient: 'from-blue-500 to-indigo-600',
        description: 'Pen, pencil, book, bag and all the rainbow colours!',
        vocabulary: [
          { id: 's1', english: 'Pen', arabic: 'قلم جاف', french: 'Stylo', category: 'School', emoji: '🖊️', phonetic: '/pen/' },
          { id: 's2', english: 'Pencil', arabic: 'قلم رصاص', french: 'Crayon', category: 'School', emoji: '✏️', phonetic: '/ˈpen.səl/' },
          { id: 's3', english: 'Book', arabic: 'كتاب', french: 'Livre', category: 'School', emoji: '📚', phonetic: '/bʊk/' },
          { id: 's4', english: 'Bag', arabic: 'محفظة', french: 'Cartable', category: 'School', emoji: '🎒', phonetic: '/bæɡ/' },
          { id: 's5', english: 'Eraser', arabic: 'ممحاة', french: 'Gomme', category: 'School', emoji: '🧼', phonetic: '/ɪˈreɪ.zər/' },
          { id: 's6', english: 'Ruler', arabic: 'مسطرة', french: 'Règle', category: 'School', emoji: '📏', phonetic: '/ˈruː.lər/' },
          { id: 'col1', english: 'Red', arabic: 'أحمر', french: 'Rouge', category: 'Colours', emoji: '🔴', phonetic: '/red/' },
          { id: 'col2', english: 'Blue', arabic: 'أزرق', french: 'Bleu', category: 'Colours', emoji: '🔵', phonetic: '/bluː/' },
          { id: 'col3', english: 'Yellow', arabic: 'أصفر', french: 'Jaune', category: 'Colours', emoji: '🟡', phonetic: '/ˈjel.oʊ/' },
          { id: 'col4', english: 'Green', arabic: 'أخضر', french: 'Vert', category: 'Colours', emoji: '🟢', phonetic: '/ɡriːn/' },
          { id: 'col5', english: 'Black', arabic: 'أسود', french: 'Noir', category: 'Colours', emoji: '⚫', phonetic: '/blæk/' },
          { id: 'col6', english: 'White', arabic: 'أبيض', french: 'Blanc', category: 'Colours', emoji: '⚪', phonetic: '/waɪt/' }
        ],
        tracingLetters: ['B', 'b', 'H', 'h', 'K', 'k', 'M', 'm'],
        flashcardTargets: ['PEN', 'PENCIL', 'BOOK', 'BAG', 'RED', 'BLUE', 'YELLOW', 'GREEN'],
        quizQuestions: [
          {
            id: 'q5-1',
            type: 'listen-choice',
            promptEn: 'What is inside the school bag? (كتاب)',
            promptAr: 'ماذا يوجد داخل المحفظة؟ (كتاب)',
            targetWord: 'Book',
            options: [
              { id: 'opt1', text: 'Book', emoji: '📚', isCorrect: true },
              { id: 'opt2', text: 'Dog', emoji: '🐶', isCorrect: false },
              { id: 'opt3', text: 'Car', emoji: '🚗', isCorrect: false }
            ],
            explanationEn: 'Book is كتاب!'
          },
          {
            id: 'q5-2',
            type: 'match',
            promptEn: 'What colour is the Algerian flag star? 🇩🇿',
            promptAr: 'ما لون نجمة العلم الجزائري؟ 🇩🇿',
            targetWord: 'Red',
            options: [
              { id: 'opt1', text: 'Red 🔴', emoji: '🔴', isCorrect: true },
              { id: 'opt2', text: 'Blue 🔵', emoji: '🔵', isCorrect: false },
              { id: 'opt3', text: 'Yellow 🟡', emoji: '🟡', isCorrect: false }
            ],
            explanationEn: 'The star and crescent are Red!'
          }
        ]
      },
      {
        id: 'u6-home',
        unitNumber: 6,
        term: 2,
        titleEn: 'My Home',
        titleAr: 'منزلي',
        subtitle: 'Where is the kitchen? In / On / Under',
        icon: '🏠',
        color: 'bg-violet-500',
        bgGradient: 'from-violet-500 to-purple-600',
        description: 'Rooms of the house: Bedroom, Kitchen, Living-room, Bathroom, Garden.',
        vocabulary: [
          { id: 'h1', english: 'Bedroom', arabic: 'غرفة النوم', french: 'Chambre à coucher', category: 'Home', emoji: '🛏️', phonetic: '/ˈbed.ruːm/' },
          { id: 'h2', english: 'Kitchen', arabic: 'المطبخ', french: 'Cuisine', category: 'Home', emoji: '🍳', phonetic: '/ˈkɪtʃ.ən/' },
          { id: 'h3', english: 'Living-room', arabic: 'غرفة الجلوس', french: 'Salon', category: 'Home', emoji: '🛋️', phonetic: '/ˈlɪv.ɪŋ ˌruːm/' },
          { id: 'h4', english: 'Bathroom', arabic: 'الحمام', french: 'Salle de bain', category: 'Home', emoji: '🛁', phonetic: '/ˈbɑːθ.ruːm/' },
          { id: 'h5', english: 'Garden', arabic: 'الحديقة', french: 'Jardin', category: 'Home', emoji: '🏡', phonetic: '/ˈɡɑː.dən/' },
          { id: 'prep1', english: 'In', arabic: 'في / داخل', french: 'Dans', category: 'Prepositions', emoji: '📥', phonetic: '/ɪn/' },
          { id: 'prep2', english: 'On', arabic: 'على / فوق', french: 'Sur', category: 'Prepositions', emoji: '🔝', phonetic: '/ɒn/' },
          { id: 'prep3', english: 'Under', arabic: 'تحت', french: 'Sous', category: 'Prepositions', emoji: '👇', phonetic: '/ˈʌn.dər/' }
        ],
        tracingLetters: ['N', 'n', 'P', 'p', 'R', 'r'],
        flashcardTargets: ['KITCHEN', 'BEDROOM', 'GARDEN', 'BATHROOM', 'IN', 'ON', 'UNDER'],
        quizQuestions: [
          {
            id: 'q6-1',
            type: 'listen-choice',
            promptEn: 'Where do we cook delicious couscous?',
            promptAr: 'أين نطبخ الكسكس اللذيذ؟',
            targetWord: 'Kitchen',
            options: [
              { id: 'opt1', text: 'Kitchen', emoji: '🍳', isCorrect: true },
              { id: 'opt2', text: 'Bedroom', emoji: '🛏️', isCorrect: false },
              { id: 'opt3', text: 'Garden', emoji: '🏡', isCorrect: false }
            ],
            explanationEn: 'Kitchen is المطبخ where delicious meals are cooked!'
          }
        ]
      },
      {
        id: 'u7-toys',
        unitNumber: 7,
        term: 2,
        titleEn: 'My Play Time & Toys',
        titleAr: 'وقت لعبي وألعابي',
        subtitle: 'Kite, Train, Bike, Doll, Robot, Car!',
        icon: '🪁',
        color: 'bg-pink-500',
        bgGradient: 'from-pink-500 to-rose-600',
        description: 'What is your favourite toy? A red ball or a fast bike?',
        vocabulary: [
          { id: 't1', english: 'Kite', arabic: 'طائرة ورقية', french: 'Cerf-volant', category: 'Toys', emoji: '🪁', phonetic: '/kaɪt/' },
          { id: 't2', english: 'Train', arabic: 'قطار', french: 'Train', category: 'Toys', emoji: '🚂', phonetic: '/treɪn/' },
          { id: 't3', english: 'Bike', arabic: 'دراجة هوائية', french: 'Vélo', category: 'Toys', emoji: '🚲', phonetic: '/baɪk/' },
          { id: 't4', english: 'Doll', arabic: 'دمية', french: 'Poupée', category: 'Toys', emoji: '🪆', phonetic: '/dɒl/' },
          { id: 't5', english: 'Robot', arabic: 'روبوت / إنسان آلي', french: 'Robot', category: 'Toys', emoji: '🤖', phonetic: '/ˈroʊ.bɑːt/' },
          { id: 't6', english: 'Car', arabic: 'سيارة', french: 'Voiture', category: 'Toys', emoji: '🚗', phonetic: '/kɑːr/' },
          { id: 't7', english: 'Ball', arabic: 'كرة', french: 'Ballon', category: 'Toys', emoji: '⚽', phonetic: '/bɔːl/' }
        ],
        tracingLetters: ['C', 'c', 'A', 'a', 'D', 'd', 'E', 'e', 'G', 'g'],
        flashcardTargets: ['KITE', 'TRAIN', 'BIKE', 'DOLL', 'ROBOT', 'CAR', 'BALL'],
        quizQuestions: [
          {
            id: 'q7-1',
            type: 'listen-choice',
            promptEn: 'Which toy flies in the sky?',
            promptAr: 'أي لعبة تطير في السماء مع الرياح؟',
            targetWord: 'Kite',
            options: [
              { id: 'opt1', text: 'Kite 🪁', emoji: '🪁', isCorrect: true },
              { id: 'opt2', text: 'Car 🚗', emoji: '🚗', isCorrect: false },
              { id: 'opt3', text: 'Doll 🪆', emoji: '🪆', isCorrect: false }
            ],
            explanationEn: 'A Kite flies high in the sky!'
          }
        ]
      }
    ]
  },

  // ==========================================
  // WORLD 3: PETS, BIRTHDAY & BODY (TERM 3)
  // ==========================================
  {
    id: 'world-3',
    term: 3,
    nameEn: 'Pets, Birthday & Body',
    nameAr: 'حيواناتي الأليفة، عيد ميلادي، وجسمي',
    theme: 'Joyful Celebration & Animal Oasis',
    bgTheme: 'from-emerald-400 via-teal-300 to-lime-200',
    descriptionEn: 'Discover cute pets, celebrate a fancy birthday party, and learn face & body parts!',
    descriptionAr: 'اكتشف الحيوانات الأليفة، احتفل بعيد الميلاد، وتعلم أجزاء الوجه والمشاعر!',
    badgeName: 'Master of 3PS English',
    badgeIcon: '👑',
    units: [
      {
        id: 'u8-pets',
        unitNumber: 8,
        term: 3,
        titleEn: 'My Pets',
        titleAr: 'حيواناتي الأليفة',
        subtitle: 'I have got a cat! Have you got a pet?',
        icon: '🐾',
        color: 'bg-emerald-600',
        bgGradient: 'from-emerald-600 to-green-700',
        description: 'Dog, cat, canary, goldfish, rabbit, chick! Small or big!',
        vocabulary: [
          { id: 'pet1', english: 'Dog', arabic: 'كلب', french: 'Chien', category: 'Pets', emoji: '🐶', phonetic: '/dɒɡ/' },
          { id: 'pet2', english: 'Cat', arabic: 'قط', french: 'Chat', category: 'Pets', emoji: '🐱', phonetic: '/kæt/' },
          { id: 'pet3', english: 'Canary', arabic: 'كناري / طائر مغرد', french: 'Canari', category: 'Pets', emoji: '🐤', phonetic: '/kəˈneə.ri/' },
          { id: 'pet4', english: 'Goldfish', arabic: 'سمكة ذهبية', french: 'Poisson rouge', category: 'Pets', emoji: '🐟', phonetic: '/ˈɡoʊld.fɪʃ/' },
          { id: 'pet5', english: 'Rabbit', arabic: 'أرنب', french: 'Lapin', category: 'Pets', emoji: '🐰', phonetic: '/ˈræb.ɪt/' },
          { id: 'pet6', english: 'Chick', arabic: 'كتكوت / صوص', french: 'Poussin', category: 'Pets', emoji: '🐣', phonetic: '/tʃɪk/' },
          { id: 'adj1', english: 'Big', arabic: 'كبير', french: 'Grand', category: 'Adjectives', emoji: '🐘', phonetic: '/bɪɡ/' },
          { id: 'adj2', english: 'Small', arabic: 'صغير', french: 'Petit', category: 'Adjectives', emoji: '🐭', phonetic: '/smɔːl/' }
        ],
        tracingLetters: ['O', 'o', 'Q', 'q', 'F', 'f', 'S', 's'],
        flashcardTargets: ['DOG', 'CAT', 'RABBIT', 'CANARY', 'CHICK', 'BIG', 'SMALL'],
        quizQuestions: [
          {
            id: 'q8-1',
            type: 'listen-choice',
            promptEn: 'Which pet says "Meow"?',
            promptAr: 'أي حيوان يقول "مياو"؟',
            targetWord: 'Cat',
            options: [
              { id: 'opt1', text: 'Cat 🐱', emoji: '🐱', isCorrect: true },
              { id: 'opt2', text: 'Dog 🐶', emoji: '🐶', isCorrect: false },
              { id: 'opt3', text: 'Rabbit 🐰', emoji: '🐰', isCorrect: false }
            ],
            explanationEn: 'The cat says Meow!'
          }
        ]
      },
      {
        id: 'u9-birthday',
        unitNumber: 9,
        term: 3,
        titleEn: 'My Fancy Birthday',
        titleAr: 'عيد ميلادي الرائع',
        subtitle: 'Cake, candle, juice, sweets & presents!',
        icon: '🎂',
        color: 'bg-fuchsia-500',
        bgGradient: 'from-fuchsia-500 to-purple-600',
        description: 'Celebrate your birthday! Cake, candle, juice, plates, and saying Thank You!',
        vocabulary: [
          { id: 'b1', english: 'Cake', arabic: 'كعكة / طورطة', french: 'Gâteau', category: 'Birthday', emoji: '🎂', phonetic: '/keɪk/' },
          { id: 'b2', english: 'Candle', arabic: 'شمعة', french: 'Bougie', category: 'Birthday', emoji: '🕯️', phonetic: '/ˈkæn.dəl/' },
          { id: 'b3', english: 'Juice', arabic: 'عصير', french: 'Jus', category: 'Birthday', emoji: '🧃', phonetic: '/dʒuːs/' },
          { id: 'b4', english: 'Plate', arabic: 'صحن', french: 'Assiette', category: 'Birthday', emoji: '🍽️', phonetic: '/pleɪt/' },
          { id: 'b5', english: 'Glass', arabic: 'كأس', french: 'Verre', category: 'Birthday', emoji: '🥛', phonetic: '/ɡlɑːs/' },
          { id: 'b6', english: 'Sweet', arabic: 'حلوى', french: 'Bonbon', category: 'Birthday', emoji: '🍬', phonetic: '/swiːt/' },
          { id: 'b7', english: 'Thank you', arabic: 'شكراً لك', french: 'Merci', category: 'Politeness', emoji: '🙏', phonetic: '/ˈθæŋk ˌjuː/' }
        ],
        tracingLetters: ['V', 'v', 'W', 'w', 'X', 'x', 'Y', 'y', 'Z', 'z'],
        flashcardTargets: ['CAKE', 'CANDLE', 'JUICE', 'PLATE', 'SWEET', 'GLASS'],
        quizQuestions: [
          {
            id: 'q9-1',
            type: 'listen-choice',
            promptEn: 'What do we blow on a birthday cake? 🎂',
            promptAr: 'ماذا نطفئ فوق كعكة عيد الميلاد؟ 🎂',
            targetWord: 'Candle',
            options: [
              { id: 'opt1', text: 'Candle 🕯️', emoji: '🕯️', isCorrect: true },
              { id: 'opt2', text: 'Plate 🍽️', emoji: '🍽️', isCorrect: false },
              { id: 'opt3', text: 'Juice 🧃', emoji: '🧃', isCorrect: false }
            ],
            explanationEn: 'We blow out candles on the birthday cake!'
          }
        ]
      },
      {
        id: 'u10-body-feelings',
        unitNumber: 10,
        term: 3,
        titleEn: 'Face, Body & Feelings',
        titleAr: 'الوجه والجسم والمشاعر',
        subtitle: 'Eyes, ears, nose, mouth & Happy / Sad',
        icon: '😊',
        color: 'bg-rose-500',
        bgGradient: 'from-rose-500 to-orange-500',
        description: 'Parts of the face and feelings: Are you happy or sad?',
        vocabulary: [
          { id: 'face1', english: 'Eyes', arabic: 'عينان', french: 'Yeux', category: 'Face', emoji: '👀', phonetic: '/aɪz/' },
          { id: 'face2', english: 'Ears', arabic: 'أذنان', french: 'Oreilles', category: 'Face', emoji: '👂', phonetic: '/ɪərz/' },
          { id: 'face3', english: 'Nose', arabic: 'أنف', french: 'Nez', category: 'Face', emoji: '👃', phonetic: '/noʊz/' },
          { id: 'face4', english: 'Mouth', arabic: 'فم', french: 'Bouche', category: 'Face', emoji: '👄', phonetic: '/maʊθ/' },
          { id: 'feel1', english: 'Happy', arabic: 'سعيد / فرحان', french: 'Heureux / Content', category: 'Feelings', emoji: '😄', phonetic: '/ˈhæp.i/' },
          { id: 'feel2', english: 'Sad', arabic: 'حزين', french: 'Triste', category: 'Feelings', emoji: '😢', phonetic: '/sæd/' }
        ],
        tracingLetters: ['E', 'e', 'N', 'n', 'M', 'm', 'H', 'h'],
        flashcardTargets: ['EYES', 'EARS', 'NOSE', 'MOUTH', 'HAPPY', 'SAD'],
        quizQuestions: [
          {
            id: 'q10-1',
            type: 'listen-choice',
            promptEn: 'Look at Massi smiling! How does he feel? 😄',
            promptAr: 'انظر لماسي وهو يبتسم! كيف يشعر؟ 😄',
            targetWord: 'Happy',
            options: [
              { id: 'opt1', text: 'Happy 😄', emoji: '😄', isCorrect: true },
              { id: 'opt2', text: 'Sad 😢', emoji: '😢', isCorrect: false },
              { id: 'opt3', text: 'Sleeping 😴', emoji: '😴', isCorrect: false }
            ],
            explanationEn: 'Massi is Happy and smiling!'
          }
        ]
      }
    ]
  }
];

export const BADGES_LIST = [
  { id: 'badge-fennec-friend', title: 'Sahara Star', titleAr: 'نجم الصحراء', icon: '🦊', desc: 'Welcome to English Adventure with Massi!' },
  { id: 'badge-pronunciation-star', title: 'Voice Hero', titleAr: 'بطل النطق', icon: '🎙️', desc: 'Passed 3 voice pronunciation challenges with Massi AI!' },
  { id: 'badge-camera-scout', title: 'Camera Scout', titleAr: 'كشاف الكاميرا', icon: '📷', desc: 'Scanned 3 flashcards in front of your webcam!' },
  { id: 'badge-alphabet-master', title: 'Alphabet Master', titleAr: 'بطل الحروف', icon: '🔤', desc: 'Practiced alphabet tracing & classroom commands!' },
  { id: 'badge-curriculum-champ', title: '3PS Super Champion', titleAr: 'بطل السنة الثالثة', icon: '🏆', desc: 'Collected over 50 gold stars across all terms!' }
];
