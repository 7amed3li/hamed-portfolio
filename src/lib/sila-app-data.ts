export type SilaFeature = {
  icon: string;
  title: string;
  description: string;
};

export type SilaAppData = {
  metaTitle: string;
  metaDescription: string;
  heroTitle: string;
  heroSubtitle: string;
  heroDescription: string;
  downloadLabel: string;
  watchDemoLabel: string;
  watchPromoLabel: string;
  versionLabel: string;
  sizeLabel: string;
  languagesLabel: string;
  freeLabel: string;
  featuresLabel: string;
  featuresHeading: string;
  features: SilaFeature[];
  videosLabel: string;
  videosHeading: string;
  demoVideoTitle: string;
  promoVideoTitle: string;
  techLabel: string;
  techHeading: string;
  techStack: string[];
  ctaTitle: string;
  ctaDescription: string;
  ctaButton: string;
  androidOnly: string;
  breadcrumbHome: string;
  breadcrumbApps: string;
};

export const SILA_VERSION = "4.1.0";
export const SILA_SIZE = "~81MB";
export const SILA_LANGUAGES = ["العربية", "Türkçe", "English", "Français"];

// ──────────────────────────────────────────
// ⚠️ PLACEHOLDER — Replace with actual links
// ──────────────────────────────────────────
export const SILA_DOWNLOAD_URL = "https://github.com/7amed3li/Sila/releases/download/4.1.0/Sila.apk";
export const SILA_DEMO_VIDEO_URL = "https://www.youtube.com/embed/8mgO8QjJ0wM";
export const SILA_PROMO_VIDEO_URL = "https://www.youtube.com/embed/9KujvcqH184";

export const silaAppData: Record<string, SilaAppData> = {
  en: {
    metaTitle: "Sila Islamic App — Prayer Times, Quran & AI Hifz Companion",
    metaDescription:
      "Download Sila Islamic App, the free app featuring accurate prayer times with automatic Adhan, full Quran reader, interactive Hifz system, AI-powered Tasmi (recitation verification), daily Azkar, and Ibadah tracking.",
    heroTitle: "Sila Islamic App",
    heroSubtitle: "Your Complete Prayer Times & Quran Companion",
    heroDescription:
      "Prayer times with automatic Adhan, Quran reader, interactive Hifz memorization, AI-powered recitation verification, daily Azkar, and Ibadah tracking — all in one beautifully crafted app.",
    downloadLabel: "Download APK",
    watchDemoLabel: "Watch Demo",
    watchPromoLabel: "Watch Promo",
    versionLabel: "Version",
    sizeLabel: "Size",
    languagesLabel: "Languages",
    freeLabel: "Free",
    featuresLabel: "Features",
    featuresHeading: "Everything You Need",
    features: [
      {
        icon: "🕌",
        title: "Prayer Times & Adhan",
        description:
          "Accurate prayer times based on your GPS location with automatic Adhan notifications. Supports multiple calculation methods.",
      },
      {
        icon: "📖",
        title: "Quran Reader",
        description:
          "Full Quran with beautiful Uthmanic script, smooth page navigation, and comfortable reading experience.",
      },
      {
        icon: "🧠",
        title: "Interactive Hifz System",
        description:
          "Memorize the Quran using the Interactive Shadow Method — a proven technique that guides you word by word.",
      },
      {
        icon: "🎤",
        title: "AI-Powered Tasmi",
        description:
          "Recite what you've memorized and let the AI verify your accuracy in real-time using Speech-to-Text technology.",
      },
      {
        icon: "📿",
        title: "Azkar & Daily Wird",
        description:
          "Morning and evening Azkar with counter, plus customizable daily Wird to build consistent worship habits.",
      },
      {
        icon: "📊",
        title: "Ibadah Tracker",
        description:
          "Track your daily worship activities — prayers, Quran reading, Azkar — and monitor your spiritual progress.",
      },
    ],
    videosLabel: "See It In Action",
    videosHeading: "Sila Islamic App Preview",
    demoVideoTitle: "Sila Islamic App Demo — Full Walkthrough",
    promoVideoTitle: "Sila Islamic App — Official Promo",
    techLabel: "Built With",
    techHeading: "Technology Stack",
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Firebase",
      "Isar Database",
      "Speech-to-Text",
      "Adhan API",
      "GPS / Geolocation",
      "Local Notifications",
      "Easy Localization",
    ],
    ctaTitle: "Download Sila Now",
    ctaDescription:
      "Transform your phone into a complete Islamic companion. Free, no ads, no account required.",
    ctaButton: "Download for Android",
    androidOnly: "Currently available for Android only",
    breadcrumbHome: "Home",
    breadcrumbApps: "Apps",
  },

  ar: {
    metaTitle: "تطبيق صلة الإسلامي — مواقيت الصلاة، القرآن، والتسميع بالذكاء الاصطناعي",
    metaDescription:
      "حمّل تطبيق صلة الإسلامي المجاني — مواقيت صلاة دقيقة مع أذان تلقائي، قارئ القرآن الكريم، نظام حفظ تفاعلي بطريقة الظل، تسميع القرآن بالذكاء الاصطناعي، وأذكار الصباح والمساء.",
    heroTitle: "تطبيق صِلَة",
    heroSubtitle: "تطبيق صلة الإسلامي — رفيقك لصلاتك وقرآنك",
    heroDescription:
      "مواقيت الصلاة مع أذان تلقائي، قراءة القرآن الكريم، حفظ تفاعلي بطريقة الظل، تسميع بالذكاء الاصطناعي، أذكار يومية، وتتبع العبادات — كل ذلك في تطبيق واحد جميل.",
    downloadLabel: "تحميل التطبيق",
    watchDemoLabel: "شاهد الديمو",
    watchPromoLabel: "شاهد الإعلان",
    versionLabel: "الإصدار",
    sizeLabel: "الحجم",
    languagesLabel: "اللغات",
    freeLabel: "مجاني",
    featuresLabel: "المميزات",
    featuresHeading: "كل ما تحتاجه في تطبيق واحد",
    features: [
      {
        icon: "🕌",
        title: "مواقيت الصلاة والأذان",
        description:
          "مواقيت صلاة دقيقة بناءً على موقعك الجغرافي مع إشعارات أذان تلقائية. يدعم طرق حساب متعددة.",
      },
      {
        icon: "📖",
        title: "قارئ القرآن الكريم",
        description:
          "القرآن الكريم كاملاً بخط عثماني جميل، مع تنقل سلس بين الصفحات وتجربة قراءة مريحة.",
      },
      {
        icon: "🧠",
        title: "نظام الحفظ التفاعلي",
        description:
          "احفظ القرآن الكريم بطريقة الظل التفاعلية — تقنية مثبتة ترشدك كلمة بكلمة.",
      },
      {
        icon: "🎤",
        title: "تسميع بالذكاء الاصطناعي",
        description:
          "سمّع ما حفظته ودع الذكاء الاصطناعي يتحقق من دقتك في الوقت الفعلي باستخدام تقنية تحويل الكلام إلى نص.",
      },
      {
        icon: "📿",
        title: "الأذكار والورد اليومي",
        description:
          "أذكار الصباح والمساء مع عدّاد، بالإضافة إلى ورد يومي قابل للتخصيص لبناء عادات عبادة ثابتة.",
      },
      {
        icon: "📊",
        title: "تتبع العبادات",
        description:
          "تتبع عباداتك اليومية — الصلوات، قراءة القرآن، الأذكار — وراقب تقدمك الروحي.",
      },
    ],
    videosLabel: "شاهد التطبيق",
    videosHeading: "معاينة تطبيق صلة الإسلامي",
    demoVideoTitle: "تطبيق صلة الإسلامي - ديمو كامل (Sila Islamic App)",
    promoVideoTitle: "تطبيق صلة الإسلامي - الإعلان الرسمي (Sila Islamic App)",
    techLabel: "مبني بـ",
    techHeading: "التقنيات المستخدمة",
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Firebase",
      "Isar Database",
      "Speech-to-Text",
      "Adhan API",
      "GPS / تحديد الموقع",
      "إشعارات محلية",
      "Easy Localization",
    ],
    ctaTitle: "حمّل صلة الآن",
    ctaDescription:
      "حوّل هاتفك إلى رفيق إسلامي شامل. مجاني، بدون إعلانات، بدون حساب.",
    ctaButton: "تحميل لأندرويد",
    androidOnly: "متاح حالياً لأندرويد فقط",
    breadcrumbHome: "الرئيسية",
    breadcrumbApps: "التطبيقات",
  },

  tr: {
    metaTitle: "Sıla İslami Uygulaması — Namaz Vakitleri, Kur'an ve Yapay Zeka Hıfz",
    metaDescription:
      "Sıla İslami Uygulamasını indirin — doğru namaz vakitleri ve otomatik ezan, Kur'an okuyucu, interaktif hıfz sistemi, yapay zeka destekli Kur'an dinleme doğrulaması ve günlük zikirler.",
    heroTitle: "Sıla İslami Uygulaması",
    heroSubtitle: "Eksiksiz Namaz Vakitleri ve Kur'an Yardımcınız",
    heroDescription:
      "Otomatik ezanlı namaz vakitleri, Kur'an okuyucu, interaktif hıfz ezberleme, yapay zeka destekli tilavet doğrulama, günlük zikirler ve ibadet takibi — hepsi güzel tasarlanmış tek bir uygulamada.",
    downloadLabel: "APK İndir",
    watchDemoLabel: "Demoyu İzle",
    watchPromoLabel: "Tanıtımı İzle",
    versionLabel: "Sürüm",
    sizeLabel: "Boyut",
    languagesLabel: "Diller",
    freeLabel: "Ücretsiz",
    featuresLabel: "Özellikler",
    featuresHeading: "İhtiyacınız Olan Her Şey",
    features: [
      {
        icon: "🕌",
        title: "Namaz Vakitleri ve Ezan",
        description:
          "GPS konumunuza dayalı doğru namaz vakitleri ve otomatik ezan bildirimleri. Birden fazla hesaplama yöntemini destekler.",
      },
      {
        icon: "📖",
        title: "Kur'an Okuyucu",
        description:
          "Güzel Osmanlı hattıyla tam Kur'an, akıcı sayfa geçişleri ve konforlu okuma deneyimi.",
      },
      {
        icon: "🧠",
        title: "İnteraktif Hıfz Sistemi",
        description:
          "İnteraktif Gölge Yöntemi ile Kur'an ezberleyin — sizi kelime kelime yönlendiren kanıtlanmış bir teknik.",
      },
      {
        icon: "🎤",
        title: "Yapay Zeka Destekli Dinleme",
        description:
          "Ezberlediğinizi okuyun ve yapay zekanın konuşmadan metne teknolojisi ile doğruluğunuzu gerçek zamanlı olarak doğrulamasına izin verin.",
      },
      {
        icon: "📿",
        title: "Zikirler ve Günlük Vird",
        description:
          "Sayaçlı sabah ve akşam zikirleri, ayrıca tutarlı ibadet alışkanlıkları oluşturmak için özelleştirilebilir günlük vird.",
      },
      {
        icon: "📊",
        title: "İbadet Takipçisi",
        description:
          "Günlük ibadetlerinizi takip edin — namazlar, Kur'an okuma, zikirler — ve manevi ilerlemenizi izleyin.",
      },
    ],
    videosLabel: "Uygulamayı Görün",
    videosHeading: "Sıla İslami Uygulama Önizlemesi",
    demoVideoTitle: "Sıla İslami Uygulaması Demosu — Tam İnceleme",
    promoVideoTitle: "Sıla İslami Uygulaması — Resmi Tanıtım",
    techLabel: "Kullanılan Teknolojiler",
    techHeading: "Teknoloji Yığını",
    techStack: [
      "Flutter",
      "Dart",
      "Riverpod",
      "Firebase",
      "Isar Veritabanı",
      "Konuşmadan Metne",
      "Ezan API",
      "GPS / Konum",
      "Yerel Bildirimler",
      "Easy Localization",
    ],
    ctaTitle: "Sıla'yı Şimdi İndirin",
    ctaDescription:
      "Telefonunuzu eksiksiz bir İslami yardımcıya dönüştürün. Ücretsiz, reklamsız, hesap gerektirmez.",
    ctaButton: "Android İçin İndir",
    androidOnly: "Şu anda yalnızca Android için mevcuttur",
    breadcrumbHome: "Ana Sayfa",
    breadcrumbApps: "Uygulamalar",
  },
};

export function getSilaAppData(lang: string): SilaAppData {
  return silaAppData[lang] || silaAppData.en;
}
