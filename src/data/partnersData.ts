export interface PartnerProduct {
  id: string;
  title: string;
  titleAr: string;
  category: 'books' | 'supplies' | 'audio' | 'reading' | 'courses';
  categoryLabel: string;
  partnerName: string;
  partnerLogo: string;
  description: string;
  originalPriceDzd: number;
  promoPriceDzd: number;
  promoCode: string;
  discountPercentage: number;
  badge: string;
  features: string[];
  deliveryInfo: string;
  inStock: boolean;
  rating: number;
  reviewsCount: number;
}

export const PARTNERS_PRODUCTS: PartnerProduct[] = [
  {
    id: 'p1-manual-activity',
    title: 'Official 3PS English Textbook & Activity Workbook Pack + 48 Color Flashcards',
    titleAr: 'كتاب ودفتر الأنشطة المعتمد لمادة الإنجليزية 3 ابتدائي مع 48 بطاقة كلمات ملونة',
    category: 'books',
    categoryLabel: '📚 Textbooks & School Books',
    partnerName: 'National Dar El-Djawhar Algiers Bookstore',
    partnerLogo: '📖',
    description: 'The essential school pack 100% compliant with the official National Ministry of Education curriculum. Contains the illustrated course textbook, the activity workbook with 60 exercises, and 48 pre-cut laminated flashcards.',
    originalPriceDzd: 1400,
    promoPriceDzd: 990,
    promoCode: 'FENNECO15',
    discountPercentage: 29,
    badge: 'Ministry Approved',
    features: [
      'Fully compliant with official 3PS 2026/2027 national curriculum',
      'Printed QR Codes to instantly stream official audio MP3 tracks',
      '48 high-quality pre-cut vocabulary flashcards',
      'Thick, bleed-resistant paper suitable for elementary markers and pencils'
    ],
    deliveryInfo: 'Express home delivery across all 58 Wilayas within 24h-48h (Yalidine Express / StopDesk or Doorstep)',
    inStock: true,
    rating: 4.9,
    reviewsCount: 184
  },
  {
    id: 'p2-school-pack',
    title: '3PS School Stationery Kit: English Ruling Dry-Erase Slate + 4 Fine Markers & Case',
    titleAr: 'طقم اللوازم المدرسية الكامل: لوحة مسطرة للتخطيط الإنجليزي، 4 أقلام ومقلمة ماسي',
    category: 'supplies',
    categoryLabel: '🎒 School Supplies & Stationery',
    partnerName: 'El-Amel Central Stationery',
    partnerLogo: '🎒',
    description: 'Complete set designed for practicing English cursive handwriting and script letters without smudges. Includes a double-sided white slate with English 4-line rulings, 4 fine dry-erase markers, and a reinforced pencil case.',
    originalPriceDzd: 1800,
    promoPriceDzd: 1350,
    promoCode: 'SLATETOP',
    discountPercentage: 25,
    badge: 'School Best-Seller',
    features: [
      'Special 4-line cursive English ruling double-sided dry-erase whiteboard',
      '4 fine-tip dry-erase markers 1.5mm (black, blue, red, green)',
      'Residue-free magnetic microfiber eraser cloth',
      'Durable washable pencil case featuring Massi the Fennec'
    ],
    deliveryInfo: 'Secure Cash on Delivery (COD) service nationwide across Algeria',
    inStock: true,
    rating: 4.8,
    reviewsCount: 132
  },
  {
    id: 'p3-headset-voice',
    title: 'Kids Stereo Audio Headset with Noise-Canceling Mic & 85dB Volume Limiter',
    titleAr: 'سماعات رأس تعليمية مع ميكروفون عازل للصوت مخصص لتمارين النطق الصوتی بالذكاء الاصطناعي',
    category: 'audio',
    categoryLabel: '🎧 Audio & Electronics',
    partnerName: 'TechKids Dz Informatique',
    partnerLogo: '🎧',
    description: 'Specially optimized headset for Fenneco AI Voice practice sessions. Captures the child’s voice with crystal clarity for AI phonetic phoneme analysis while protecting young hearing with a safe 85 dB ceiling.',
    originalPriceDzd: 2800,
    promoPriceDzd: 2190,
    promoCode: 'FENNECVOICE',
    discountPercentage: 22,
    badge: 'AI Voice Studio Pick',
    features: [
      'Gooseneck noise-cancelling microphone for 99% voice recognition accuracy',
      '85 dB volume limiter ceiling (aligned with WHO pediatric safety guidelines)',
      'Ultra-lightweight padded headband sized specifically for 6-11 year olds',
      'Tangle-free braided cable with 3.5mm jack + USB/Type-C adapter included'
    ],
    deliveryInfo: '6-month immediate replacement warranty + 24h dispatch nationwide',
    inStock: true,
    rating: 5.0,
    reviewsCount: 96
  },
  {
    id: 'p4-dictionary-visual',
    title: 'My First Trilingual Visual Dictionary: English - Arabic - French (3PS Edition)',
    titleAr: 'قاموسي المصور الأول: إنجليزي - عربي - فرنسي مخصص لتلاميذ الطور الابتدائي',
    category: 'books',
    categoryLabel: '📚 Textbooks & School Books',
    partnerName: 'Dar El-Kitab El-Hadith Publishing',
    partnerLogo: '📕',
    description: 'Over 600 illustrated words organized by curriculum themes (school, family, animals, toys, home, numbers, colors, fruits & vegetables). Features simplified phonetics to boost visual memory.',
    originalPriceDzd: 1600,
    promoPriceDzd: 1200,
    promoCode: 'DICTIO3PS',
    discountPercentage: 25,
    badge: 'Teacher Favorite',
    features: [
      '600+ essential vocabulary words with large full-color illustrations',
      'Adapted phonetic transcription tailored for native Arabic speakers',
      'Bilingual quick-lookup thematic index at the back of the book',
      'Tear-resistant rigid hardcover built to last the entire school year'
    ],
    deliveryInfo: 'Home delivery or bookstore pickup in Algiers, Oran, Constantine, and Sétif',
    inStock: true,
    rating: 4.9,
    reviewsCount: 158
  },
  {
    id: 'p5-bilingual-tales',
    title: 'Boxed Set of 4 English/Arabic Storybooks: "The Adventures of Massi"',
    titleAr: 'سلسلة 4 قصص مصورة ثنائية اللغة: مغامرات الفنك ماسي مع ملفات صوتية مرفقة',
    category: 'reading',
    categoryLabel: '📖 Storybooks & Graded Readers',
    partnerName: 'Ziri Youth Publishing',
    partnerLogo: '🦊',
    description: 'A charming collection of 4 illustrated stories built around the 3PS syllabus: Massi Goes to School, The Backpack Secret, Family Celebration, and Animals of the Desert. Each page includes English & Arabic text with QR audio.',
    originalPriceDzd: 2200,
    promoPriceDzd: 1690,
    promoCode: 'STORIES3PS',
    discountPercentage: 23,
    badge: 'Educational Award Winner',
    features: [
      'Engaging short stories authored by certified 3PS English teachers',
      'Streamable MP3 audio narration recorded with native English voice actors',
      'Observation games and mini reading comprehension quizzes in every book',
      'Celebrates Algerian natural heritage, landscapes, and cultural landmarks'
    ],
    deliveryInfo: 'Tracked postal parcel or doorstep courier across all 58 Wilayas',
    inStock: true,
    rating: 4.9,
    reviewsCount: 124
  },
  {
    id: 'p6-flashcards-box',
    title: 'Magnetic 3PS Flashcards Box: 120 Vocabulary Words & Classroom Commands',
    titleAr: 'علبة 120 بطاقة مغناطيسية للمفردات وأوامر القسم مع حامل مغناطيسي',
    category: 'supplies',
    categoryLabel: '🎒 School Supplies & Stationery',
    partnerName: 'EducToys Algeria',
    partnerLogo: '🧩',
    description: 'The ultimate tactile support for home practice on the fridge or classroom magnetic whiteboards: 120 waterproof laminated magnetic cards with image on front and English word with phonetics on back.',
    originalPriceDzd: 2100,
    promoPriceDzd: 1590,
    promoCode: 'MAGNET3PS',
    discountPercentage: 24,
    badge: 'Family Practice Top Pick',
    features: [
      '120 durable magnetic cards with child-safe rounded corners',
      'Covers all 6 full units of the official 3PS English syllabus',
      'Fully compatible with Fenneco camera OCR cards detection mode',
      'Heavy-duty tin storage box included to prevent loss'
    ],
    deliveryInfo: '48h express delivery nationwide in Algeria, pay upon delivery',
    inStock: true,
    rating: 4.9,
    reviewsCount: 88
  },
  {
    id: 'p7-calligraphy-workbook',
    title: 'Master English Cursive Handwriting & Letter Formation Workbook (A4 Format)',
    titleAr: 'كراس الخط الإنجليزي الموسع: تعلم كتابة الحروف والكلمات بخط متصل أنيق',
    category: 'books',
    categoryLabel: '📚 Textbooks & School Books',
    partnerName: 'Al-Qalam Educational Publishing',
    partnerLogo: '✍️',
    description: 'Step-by-step English handwriting book with directional guide arrows, English Seyès ruling, and practice sheets for every alphabet letter, numbers 1 to 20, and common primary vocabulary.',
    originalPriceDzd: 900,
    promoPriceDzd: 690,
    promoCode: 'CALAME3PS',
    discountPercentage: 23,
    badge: 'Handwriting Special',
    features: [
      'Precise stroke direction arrows preventing poor pencil posture',
      'Side-by-side models in clean print and joined cursive script',
      'Fenneco motivational sticker sheet included in centerfold',
      'Spacious A4 format providing ample room for young learners'
    ],
    deliveryInfo: 'Can be combined in a single parcel with the official course textbook',
    inStock: true,
    rating: 4.8,
    reviewsCount: 110
  },
  {
    id: 'p8-club-conversation',
    title: 'Live Online English Conversation Club (4 Monthly Sessions with Certified Teacher)',
    titleAr: 'ورشات المحادثة التفاعلية عبر الإنترنت: 4 حصص شهرياً في أفواج مصغرة مع أستاذ معتمد',
    category: 'courses',
    categoryLabel: '🎓 Courses & Partner Workshops',
    partnerName: 'British Academy Kids Algeria',
    partnerLogo: '🇬🇧',
    description: 'Lively 45-minute speaking sessions in small cohorts of maximum 5 students via secure video link, guided by certified English teachers to foster speaking confidence and natural pronunciation.',
    originalPriceDzd: 4500,
    promoPriceDzd: 3400,
    promoCode: 'ACADEMY3PS',
    discountPercentage: 24,
    badge: 'Elite Speaking Club',
    features: [
      'Micro-groups of 5 children at the exact same 3PS level',
      'Certified bilingual instructors trained in positive encouraging pedagogy',
      'Personalized monthly oral progress report sent to parents',
      'Flexible time slots available on Wednesday afternoons and Saturday mornings'
    ],
    deliveryInfo: 'Instant activation link sent via email upon enrollment confirmation',
    inStock: true,
    rating: 5.0,
    reviewsCount: 67
  }
];
