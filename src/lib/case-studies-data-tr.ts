import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    slug: "qr-attendance-system",
    title: "QR Kodlu Yoklama Sistemi",
    metaTitle: "QR Yoklama Sistemi Örnek Olay İncelemesi | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in 6 fakültede 2.000'den fazla öğrenci için nasıl %98 gecikme azalması ve %99.9 çalışma süresi sağlayan QR tabanlı bir yoklama sistemi kurduğunu okuyun.",
    category: "Full-Stack Sistem · Performans Mühendisliği",
    year: "2025–Günümüz",
    tags: ["Node.js", "React.js", "PostgreSQL", "Redis", "Docker", "QR", "Yönetici Paneli"],
    heroStat: { value: "2.000+", label: "Canlı Kullanıcı" },
    problem:
      "Bir üniversitenin 6 farklı fakültedeki binlerce öğrencinin yoklamasını takip etmesi gerekiyordu. Mevcut süreç manueldi, kağıt yoklama listeleri, Excel tabloları ve eğitmenler için büyük bir zaman kaybı. Kurulacak sistem, bir dersin başlangıcında yüzlerce öğrencinin aynı anda kod taradığı yoğun yük (peak load) anlarını kaldırabilmeli, uygulama indirmeden herhangi bir telefonda çalışabilmeli, yöneticilere kayıtları görüntülemeleri ve dışa aktarmaları için bir kontrol paneli sunmalı ve mesai saatlerinde %100 oranında kesintisiz çalışmalıydı.",
    solution:
      "Hamed, eksiksiz bir QR tabanlı yoklama sistemi tasarladı ve geliştirdi. Öğrenciler, sınıfta görüntülenen bir QR kodunu tarar, kod tarayıcılarında açılır, yoklamayı anında kaydeder ve kapanır. Hile yapılmasını önlemek için her QR kodun kısa bir geçerlilik süresi vardır. Eğitmenler ve fakülte yöneticileri; kayıtları görmek, raporlar oluşturmak ve sistemi yönetmek için bir kontrol paneline giriş yaparlar. Arka planda (backend) Hamed hibrit bir doğrulama hattı kurdu: hız için bellek içi (in-memory) kontroller, doğruluk için veritabanı onayı ve herhangi bir parçanın arızalanması durumunda otomatik yedekleme (fallback). Yoğun tarama zamanlarında veritabanı yükünü büyük ölçüde azaltmak için Redis önbellekleme (caching) eklendi.",
    technologies: [
      "Node.js + Express.js (backend API)",
      "React.js (öğrenci check-in arayüzü)",
      "React.js + admin paneli (fakülte kontrol paneli)",
      "PostgreSQL (öğrenci ve yoklama veritabanı)",
      "Redis (yoğun anlar için önbellek katmanı)",
      "Docker (konteynerli dağıtım)",
      "JWT (güvenli, süre sınırlı QR token'lar)",
      "Opossum (%99.9 çalışma süresi için Devre Kesici - Circuit Breaker)",
    ],
    results: [
      {
        metric: "%98 gecikme (latency) azalması",
        description: "Redis önbelleğe alma ve sorgu optimizasyonundan sonra API yanıt süresi 94.91ms'den yalnızca 1.53ms'ye düştü.",
      },
      {
        metric: "+%6.100 daha fazla işlem kapasitesi",
        description: "Sistem artık saniyede 653 isteğe kadar işlem yapabiliyor, aynı anda yüzlerce öğrencinin taramasını kaldırabiliyor.",
      },
      {
        metric: "2.000+ kayıtlı öğrenci",
        description: "Sistem, 6 üniversite fakültesindeki öğrenciler ve öğretim üyeleri tarafından canlı (production) olarak kullanılıyor.",
      },
      {
        metric: "%99.9 çalışma süresi (uptime)",
        description: "Devre Kesici (Circuit Breaker) deseni, bir arka uç (backend) hizmeti sorun yaşasa bile sistemin canlı kalmasını sağlar.",
      },
      {
        metric: "~%85 test kapsamı",
        description: "Doğrulama akışlarını, başarısızlık senaryolarını ve uç (edge) durumları kapsayan kapsamlı test paketi.",
      },
      {
        metric: "15+ güvenlik açığı düzeltildi",
        description: "SAST/DAST güvenlik taraması, sistem canlıya geçmeden önce 15'ten fazla sorunu yakaladı ve çözdü.",
      },
    ],
    clientProof:
      "Bu, bir demo değil, canlı bir sistemdir. Türkiye'de Tokat Gaziosmanpaşa Üniversitesi'nde gerçek öğrenciler ve öğretim üyeleri tarafından her gün çalışmaktadır. Yönetici paneline yzdd.gop.edu.tr/qr-admin/ ve öğrenci arayüzüne yzdd.gop.edu.tr/qr-ui/ adresinden erişilebilir.",
    cta: "Okulunuz, şirketiniz veya etkinliğiniz için bir yoklama sistemine ihtiyacınız varsa, Hamed sizin için bir tane geliştirebilir.",
  },
  {
    slug: "kardesler-restaurant-platform",
    title: "Kardeşler Cihangir: Canlı Üretim Restoran Platformu",
    metaTitle: "Kardeşler Restoran Platformu Vaka Analizi | Hamed Mohamed",
    metaDescription: "Hamed Mohamed'in kardeslercihangir.com için geliştirdiği restoran platformu: 10 dil, 6 para biriminde canlı döviz, WhatsApp sipariş ve Schema.org Yerel SEO.",
    category: "Full-Stack · Next.js · Canlı Müşteri Web Sitesi",
    year: "2026",
    tags: ["Next.js 16", "React 19", "Supabase", "Tailwind CSS v4", "Schema.org SEO", "10 Dil", "Canlı Döviz", "WhatsApp Sipariş"],
    heroStat: { value: "100+", label: "Canlı Üretimde Günlük Ziyaretçi" },
    problem: "Kardeşler Kebap & Cafe, İstanbul Cihangir'de (Taksim yakınlarında en turistik semtlerden biri) 28 yıldır faaliyet gösteren köklü bir restorandır. Restoran, yavaş, mobil uyumlu olmayan ve yalnızca Türkçe kullanılabilen eski bir WordPress sitesi kullanıyordu. Menü, turistlerin okuyamadığı ve arama yapamadığı statik bir PDF idi ve işletme sahibinin geliştiriciyi aramadan fiyatları güncellemesinin hiçbir yolu yoktu. Sitede Google için hiçbir yapılandırılmış veri (Structured Data) ve çoklu dil desteği bulunmuyordu; bu da bölgedeki restoranları arayan uluslararası turistlerin restoranı bulmasını imkansız kılıyordu.",
    solution: "Next.js 16 (App Router), React 19, Tailwind CSS v4 ve Supabase kullanılarak sıfırdan eksiksiz ve modern bir dijital restoran platformu inşa edildi. 10 dil için (Türkçe, İngilizce, Arapça, Rusça, Fransızca, Farsça, Almanca, İtalyanca, İspanyolca, Çince) dinamik yönlendirme ve eksiksiz hreflang etiketleri uygulandı. Gerçek zamanlı döviz kuru API'si ile 6 para birimini (TRY, USD, EUR, GBP, RUB, SAR) destekleyen canlı bir para birimi dönüştürücüsü geliştirildi. Her ziyaretçinin diline göre yerelleştirilmiş mesaj şablonlarıyla WhatsApp üzerinden doğrudan sipariş sistemi ve sepet akışı kuruldu. İşletme sahibinin teknik bilgiye ihtiyaç duymadan Supabase üzerinden fiyat ve ürün durumunu anında güncelleyebileceği bir yönetim paneli hazırlandı. Google sıralamalarını korumak için 25'ten fazla kalıcı 301 yönlendirme kuralıyla eksiksiz bir WordPress göçü gerçekleştirildi. Kapsamlı Yerel SEO uygulandı: Schema.org yapılandırılmış verileri (Restaurant, Menu, ImageGallery, BreadcrumbList, WebSite), Open Graph etiketleri, Twitter Cards, dinamik site haritası ve kanonik URL'ler.",
    technologies: ["Next.js 16 (App Router)", "React 19", "Tailwind CSS v4", "Supabase (Auth + PostgreSQL)", "Sharp (Görsel Optimizasyonu)", "Schema.org (Restaurant, Menu, ImageGallery)", "WhatsApp Business API", "Gerçek Zamanlı Döviz API", "Vercel Analytics"],
    results: [
      { metric: "~100 Günlük Ziyaretçi", description: "Turistler, yerel müşteriler ve müdavimler dahil her gün gerçek kullanıcılara hizmet veren canlı üretim sitesi" },
      { metric: "10 Canlı Dil", description: "Bölgedeki en kapsamlı dil desteği ile uluslararası turistlere eksiksiz erişim" },
      { metric: "6 Canlı Para Birimi", description: "Turistlerin fiyatları kendi para birimlerinde görmesini sağlayan anlık döviz çevirisi" },
      { metric: "WordPress → Next.js Göçü", description: "25'ten fazla kalıcı 301 yönlendirme kuralı ile Google sıralamalarında sıfır kayıp" },
      { metric: "Kapsamlı Yerel SEO", description: "Schema.org yapılandırılmış verileri, hreflang, OG etiketleri ve dizine eklenen dinamik site haritası" },
      { metric: "WhatsApp Sipariş Akışı", description: "10 dilde otomatik oluşturulan sipariş şablonlarıyla anında WhatsApp üzerinden sipariş tamamlama" },
      { metric: "Yönetici Paneli (Kodsuz)", description: "Restoran sahibi, fiyatları ve menü öğelerini bir geliştiriciye ihtiyaç duymadan anında güncelleyebilir" },
    ],
    clientProof: "Bu, bir demo veya yan proje değil; gerçek bir ticari web sitesidir. İstanbul'un en turistik semtlerinden birinde 28 yıldır faaliyet gösteren gerçek bir restoran için her gün kesintisiz çalışmaktadır. kardeslercihangir.com adresinden ziyaret edebilirsiniz. Geliştirici referans sayfası kardeslercihangir.com/tasarim-gelistirme adresinde resmi olarak belgelenmiştir.",
    cta: "Bir restoran web sitesine, dijital menüye veya çok dilli bir işletme platformuna ihtiyacınız varsa, Hamed sizin için en yüksek kalitede inşa edebilir.",
    liveUrl: "https://www.kardeslercihangir.com",
    statusBadge: "Canlı Üretimde (Live in Production)",
    images: [
      { src: "/case-studies/kardesler/hero.png", alt: "Kardeşler Cihangir Masaüstü Ana Sayfa", caption: "Anlık döviz seçici ve 10 dil desteğine sahip modern ana sayfa" },
      { src: "/case-studies/kardesler/menu.png", alt: "Kardeşler Cihangir Dijital Menü ve Sipariş", caption: "6 para biriminde canlı fiyatlar ve WhatsApp siparişi içeren dijital menü" },
      { src: "/case-studies/kardesler/mobile.png", alt: "Kardeşler Cihangir Mobil Deneyimi", caption: "Turistlerin QR kod taramasıyla anında erişebildiği optimize edilmiş mobil arayüz" },
    ],
  },
  {
    slug: "nodesecure-open-source",
    title: "NodeSecure Açık Kaynak Güvenlik Katkıları",
    metaTitle: "NodeSecure Açık Kaynak Katkıları | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in Node.js için bir güvenlik tarama ekosistemi olan NodeSecure projesine yaptığı ve AST analizi ile SSRF tespitini geliştiren katkıları.",
    category: "Güvenlik Araştırması · Açık Kaynak (Open Source)",
    year: "1. Çeyrek 2026",
    tags: ["TypeScript", "AST Analizi", "SSRF Tespiti", "Node.js", "Güvenlik", "Açık Kaynak"],
    heroStat: { value: "7", label: "Birleştirilmiş (Merged) Pull Request" },
    problem:
      "NodeSecure, dünyadaki geliştiriciler tarafından JavaScript ve Node.js kodlarını güvenlik açıkları açısından analiz etmek için kullanılan bir güvenlik tarama ekosistemidir. Araçların birkaç alanda iyileştirmeye ihtiyacı vardı: güvenli olmayan kod desenlerinin (güvensiz rastgele sayı üretimi gibi) daha iyi tespiti, daha akıllı SSRF (Sunucu Tarafı İstek Sahtekarlığı) tespiti, tarama hassasiyetini ayarlama yeteneği ve analiz hızını zaman içinde takip etmek için performans karşılaştırması (benchmarking).",
    solution:
      "Hamed, NodeSecure depolarında (js-x-ray ve scanner) her biri belirli bir iyileştirmeyi hedefleyen 7 pull request'te katkıda bulundu: güvenli olmayan kod desenlerini tespit eden yeni güvenlik probları oluşturmak, SSRF risklerini yakalamak için URL analizini iyileştirmek, geliştiricilerin katı ve esnek analiz arasında seçim yapabilmesi için yapılandırılabilir hassasiyet seviyeleri eklemek ve analiz performansını zaman içinde ölçmek için bir karşılaştırma (benchmarking) sistemi kurmak.",
    technologies: [
      "TypeScript (tüm katkılarda)",
      "AST (Soyut Sözdizimi Ağacı) analizi",
      "NodeSecure js-x-ray (kod analiz motoru)",
      "NodeSecure scanner (tam proje tarayıcısı)",
      "mitata (benchmarking kütüphanesi)",
      "Node.js çalışma zamanı güvenlik kalıpları",
    ],
    results: [
      {
        metric: "PR #452. Güvensiz Rastgele Sayı Probu",
        description: "Geliştiricilerin yaygın bir kriptografi hatasından kaçınmasına yardımcı olmak için güvenlik açısından hassas bağlamlarda Math.random() kullanımını işaretleyen bir prob geliştirdi.",
      },
      {
        metric: "PR #462, SSRF Tespiti",
        description: "Node.js kodundaki localhost referanslarını ve SSRF riski taşıyan URL desenlerini daha iyi tespit etmek için shady-url denetleyicisini iyileştirdi.",
      },
      {
        metric: "PR #456. Hassasiyet (Sensitivity) Seçeneği",
        description: "Mevcut herhangi bir davranışı bozmadan AstAnalyser, ProbeRunner ve SourceFile genelinde muhafazakar/agresif (conservative/aggressive) hassasiyet modları ekledi.",
      },
      {
        metric: "PR #467. Adlandırılmış Ana İşleyiciler (Named Main Handlers)",
        description: "Probların birden fazla doğrulama senaryosunu temiz bir şekilde ele alabilmesi için isSerializeEnv'ye Adlandırılmış Ana İşleyiciler (Named Main Handlers) modelini ekledi.",
      },
      {
        metric: "PR #468, E-posta Dizisi (Literal) Tespiti",
        description: "CollectableSet API'sini kullanarak 5 kapsamlı test durumuyla e-posta dizisi (email literal) toplama özelliğini uyguladı.",
      },
      {
        metric: "PR #496. Kıyaslama (Benchmarking) Altyapısı",
        description: "NodeSecure sürümleri arasında AST analiz performansını izlemek için mitata kütüphanesini kullanarak eksiksiz bir kıyaslama (benchmarking) kurulumu geliştirdi.",
      },
    ],
    clientProof:
      "Bu katkılar NodeSecure organizasyonu altında GitHub'da herkese açık ve doğrulanabilirdir. Hamed'in gerçek güvenlik araçları üzerinde çalışma, karmaşık AST analiz kodunu anlama ve küresel olarak geliştiriciler tarafından kullanılan bir açık kaynak (open-source) projesine temiz, test edilmiş iyileştirmeler ekleme yeteneğini göstermektedir.",
    cta: "Uygulamanız için güvenlik uzmanlığına (kod incelemesi, güvenlik açığı taraması veya güvenlik mimarisi) ihtiyacınız varsa, Hamed yardımcı olabilir.",
  },
  {
    slug: "dragonsploit",
    title: "DragonSploit: Yapay Zeka Destekli Güvenlik Tarayıcısı",
    metaTitle: "DragonSploit Yapay Zeka Zafiyet Tarayıcısı | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in, niyet tabanlı (intent-based) yönlendirme ile yanlış alarmları (false positives) %70 oranında azaltan DragonSploit platformunu nasıl geliştirdiği.",
    category: "Yapay Zeka (AI) · Güvenlik · Backend Mühendisliği",
    year: "2025",
    tags: ["Node.js", "AI Orkestrasyonu", "Güvenlik Açığı Taraması", "Yığın (Stack) Tespiti", "Güvenlik"],
    heroStat: { value: "%70", label: "Daha Az Yanlış Alarm (False Positive)" },
    problem:
      "Geleneksel güvenlik açığı tarayıcıları, hangi teknolojiyi çalıştırdığına bakılmaksızın her hedefte aynı kontrolleri çalıştırır. Bu iki sorun yaratır: Alakasız kontrolleri çalıştırarak kaybedilen zaman ve geliştiricilerin görmezden gelmeyi öğrendiği çok fazla yanlış alarm (false positive). Buradaki zorluk, taradığı sistemin ne tür bir sistem olduğunu anlayan ve yalnızca ilgili güvenlik testlerini çalıştıran daha akıllı bir tarayıcı (scanner) oluşturmaktı.",
    solution:
      "Hamed, DragonSploit'i niyet tabanlı (intent-based) bir orkestrasyon motoruyla oluşturdu. Motor, sabit bir kontrol listesi çalıştırmak yerine, hedefi analiz ederek hangi teknoloji yığınını (WordPress, Nginx, Node.js vb.) kullandığını tespit eder ve ardından çalıştırılacak en alakalı güvenlik açıklarını dinamik olarak seçer. Bir Yapay Zeka (AI) katmanı, tarama niyetini yorumlamaya ve doğru stratejiye yönlendirmeye yardımcı olur. Deterministik (belirleyici) bir doğrulama katmanı, yapay zekanın uydurduğu (hallucination) verilerin yanlış sonuçlar üretmesini önlemek için AI çıktılarını doğrular.",
    technologies: [
      "Node.js (orkestrasyon motoru)",
      "Yapay Zeka / LLM entegrasyonu (niyet tabanlı yönlendirme)",
      "Teknoloji yığını (stack) tespiti modülü (WordPress, Nginx, Node.js vb.)",
      "Deterministik (belirleyici) doğrulama katmanı",
      "Modüler prob mimarisi",
    ],
    results: [
      {
        metric: "+%40 verimlilik artışı",
        description: "Her hedef için yalnızca ilgili kontrolleri çalıştırarak, tarayıcı statik kuyruk tabanlı yaklaşımlardan daha hızlı tamamlanır.",
      },
      {
        metric: "%70 daha az yanlış alarm",
        description: "Bağlama duyarlı yığın (stack) tespiti, tarayıcının hedefin gerçek teknolojisiyle alakalı olmayan sorunları işaretlemediği anlamına gelir.",
      },
      {
        metric: "Niyet tabanlı (Intent-based) orkestrasyon",
        description: "Motor, tarama niyetini yorumlar ve stratejileri dinamik olarak seçer, manuel yapılandırma gerekmez.",
      },
      {
        metric: "AI halüsinasyon koruması",
        description: "Deterministik (belirleyici) bir doğrulama katmanı, yapay zeka tarafından oluşturulan bulguları raporlanmadan önce onaylayarak doğruluğu garanti eder.",
      },
    ],
    clientProof:
      "DragonSploit, Hamed'in yapay zeka yeteneklerini pratik güvenlik mühendisliği ile birleştirme, sadece teknik olarak etkileyici değil, aynı zamanda geleneksel yaklaşımlardan daha doğru ve kullanışlı sistemler kurma, yeteneğini göstermektedir.",
    cta: "Uygulamanızın güvenlik incelemesine ihtiyacınız varsa veya özel bir güvenlik aracı hakkında görüşmek isterseniz, Hamed'le iletişime geçin.",
  },
  {
    slug: "genc-group-corporate-platform",
    title: "Genç Group: Kurumsal İnşaat ve Otomotiv Platformu",
    metaTitle: "Genç Group Kurumsal Platformu Vaka Analizi | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in İstanbul merkezli Genç Group (Genç Group İnşaat & AutoClub Merter) için etkileşimli 3D/AI mimari laboratuvarlı kurumsal platform geliştirmesi.",
    category: "Kurumsal Web Platformu · İnşaat & Otomotiv · 3D / Next.js",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "Three.js / 3D",
      "Framer Motion",
      "TR / EN / AR (RTL)",
      "Kurumsal SEO",
      "İnşaat & Otomotiv",
    ],
    heroStat: { value: "2 Sektör", label: "Kurumsal Grup Platformu · 3 Dil" },
    problem:
      "İstanbul'da iki ana sektörde faaliyet gösteren Genç Group. Zeytinburnu merkezli Genç Group İnşaat (mimari yapı ve kentsel dönüşüm) ile Merter/Güngören merkezli AutoClub Merter (kaporta, boya, PDR ve PPF koruma), iki farklı uzmanlık alanını tek bir lüks ve güven veren kurumsal çatı altında sunmak, mimari dönüşüm aşamaları ile otomotiv hassasiyetini etkileşimli biçimde sergilemek ve Türkçe, İngilizce ve Arapça (RTL) müşteri adaylarına ulaşmak istiyordu.",
    solution:
      "Next.js 16, React 19, Tailwind CSS v4 ve Three.js + Draco 3D teknolojileriyle kurumsal bir holding platformu geliştirildi. İnşaat (/construction; aşamalı dönüşüm ve öncesi/sonrası karşılaştırmaları) ve Otomotiv (/automotive; 4 aşamalı etkileşimli araç anatomisi) için özel deneyimler kuruldu. Karar vericilerin kütle, malzeme ve aydınlatmayı canlı değiştirebildiği 3D/AI Mimari Stüdyo (/case-study), React Hook Form + Zod doğrulamalı iletişim formları ve Kurumsal Schema.org SEO eklendi.",
    technologies: [
      "Next.js 16 (App Router)",
      "React 19",
      "TypeScript",
      "Three.js & Draco 3D Geometri Sıkıştırma",
      "Framer Motion",
      "Tailwind CSS v4",
      "React Hook Form + Zod",
      "Schema.org Kurumsal Yerel SEO",
    ],
    results: [
      {
        metric: "2 Sektörlü Bütünleşik Kurumsal Platform",
        description:
          "Genç Group İnşaat ve AutoClub Merter hizmetleri gencgroupinsaat.com.tr altında tek kurumsal yapıda birleştirildi.",
      },
      {
        metric: "Etkileşimli 3D / AI Mimari Laboratuvarı",
        description:
          "Kütle kurgusu, cephe malzemeleri (traverten, brüt beton, cam) ve gün batımı/mavi saat ışığını gerçek zamanlı değiştiren /case-study stüdyosu.",
      },
      {
        metric: "4 Aşamalı Otomotiv Mühendislik Anatomisi",
        description:
          "AutoClub Merter için ±0.05 mm lazer hizalama toleranslı kaporta, boya ve PPF teknik vitrini.",
      },
      {
        metric: "3 Dilli Kurumsal UX (TR / EN / AR RTL)",
        description:
          "Tüm proje ve kurumsal iletişim akışlarında Türkçe, İngilizce ve tam sağdan sola Arapça desteği.",
      },
    ],
    clientProof:
      "İstanbul'da (Zeytinburnu ve Platform Merter Suites) Genç Group için yayına alınan gerçek bir kurumsal şirket web sitesidir. gencgroupinsaat.com.tr adresinde yayındadır ve etkileşimli 3D stüdyosu gencgroupinsaat.com.tr/case-study sayfasında belgelenmiştir.",
    cta: "Şirketiniz için yüksek otoriteye sahip kurumsal bir web sitesi veya etkileşimli ürün platformu mu gerekiyor? Hamed ile iletişime geçin.",
    liveUrl: "https://www.gencgroupinsaat.com.tr",
    statusBadge: "Canlı Üretimde (Live in Production)",
    images: [
      {
        src: "/case-studies/genc-group/hero.png",
        alt: "Genç Group Kurumsal Platformu Ana Sayfası",
        caption: "İstanbul'da Genç Group İnşaat ve AutoClub Merter'i birleştiren kurumsal vitrin",
      },
      {
        src: "/case-studies/genc-group/case-study.png",
        alt: "Genç Group Etkileşimli 3D ve Mimari Stüdyo",
        caption: "Kütle, malzeme ve ışık senaryolarını canlı test eden 3D çalışma alanı",
      },
      {
        src: "/case-studies/genc-group/mobile.png",
        alt: "Genç Group Mobil Kurumsal Deneyim",
        caption: "Yöneticiler ve kurumsal müşteriler için optimize edilmiş mobil arayüz",
      },
    ],
  },
  {
    slug: "cihangir-ev-yemekleri-platform",
    title: "Cihangir Ev Yemekleri & Pide: 10 Dilli Restoran ve Yönetim Platformu",
    metaTitle: "Cihangir Ev Yemekleri Vaka Analizi | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed tarafından Next.js 16, PostgreSQL + Prisma 7, Argon2 güvenli admin paneli, 10 dil (RTL) ve 6 canlı kur ile geliştirilen cihangirevyemekler.com.tr.",
    category: "Full-Stack · Next.js 16 · Restoran Platformu ve Yönetim Paneli",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "PostgreSQL",
      "Prisma ORM",
      "Argon2 Güvenlik",
      "10 Dil (RTL)",
      "6 Canlı Döviz",
      "970+ SSG Sayfa",
    ],
    heroStat: { value: "970+", label: "Önceden Derlenmiş Statik Sayfa (10 Dil)" },
    problem:
      "Beyoğlu Cihangir'in hem yerel müdavimlere hem de uluslararası turistlere hizmet veren geleneksel ev yemekleri ve taş fırın pide restoranı, her gün değişen 85+ tencere yemeği ve pide çeşidini 10 dilde (Arapça ve Farsça RTL dahil) ve 6 canlı para biriminde hızlıca sunmak, ayrıca günlük menüyü geliştirici olmadan PostgreSQL üzerinden yönetmek istiyordu.",
    solution:
      "Next.js 16 (App Router + Turbopack) ve PostgreSQL + Prisma 7 ile 10 dil için 970'ten fazla statik (SSG) sayfa üreten tam kapsamlı bir platform inşa edildi. Ürünler, Kategoriler, DailyMenu, Offers, PriceHistory ve AuditLog dahil 12 ilişkisel modelden oluşan kendi kendini onaran veritabanı tasarlandı. Argon2 şifrelemeli güvenli yönetim paneli, 0 ms FOUC sunan 318 KB 10 katmanlı WebP Smart Splash ve canlı döviz dönüştürücü kuruldu.",
    technologies: [
      "Next.js 16 (App Router & Turbopack SSG)",
      "React 19 & TypeScript",
      "PostgreSQL + Prisma 7 ORM (12 Model)",
      "Argon2 Kimlik Doğrulama ve Denetim Kayıtları",
      "10 Dilli Dinamik Yönlendirme + RTL",
      "6 Para Birimi için Canlı Döviz API",
      "Schema.org Restaurant & Menu Rich Snippets",
      "Vercel Analytics",
    ],
    results: [
      {
        metric: "10 Dilde 970+ Statik (SSG) Sayfa",
        description:
          "TR, EN, AR, RU, FA, FR, DE, IT, ES ve ZH dillerinde her yemek ve kategori için önceden derlenmiş sayfalar.",
      },
      {
        metric: "PostgreSQL + Prisma 7 İlişkisel Mimari",
        description:
          "Günlük değişen tencere menüsü, kampanyalar, fiyat geçmişi ve denetim kayıtlarını tutan 12 tabloluk veri katmanı.",
      },
      {
        metric: "Argon2 Korumalı İşletme Yönetim Paneli",
        description:
          "Restoran yönetiminin günlük menü ve stok durumunu tek tıkla güncellemesini sağlar.",
      },
      {
        metric: "85+ Yemek Kataloğu · 6 Canlı Para Birimi",
        description:
          "TRY, USD, EUR, GBP, RUB ve SAR arasında anlık kur dönüşümü ve sıfır ekran parlamalı açılış animasyonu.",
      },
    ],
    clientProof:
      "Beyoğlu, İstanbul'da cihangirevyemekler.com.tr adresinde aktif olarak çalışan canlı bir ticari platformdur. Resmi geliştirici vaka analizi cihangirevyemekler.com.tr/tr/tasarim-gelistirme sayfasında yer almaktadır.",
    cta: "Gerçek PostgreSQL yönetim paneline sahip 10 dilli ve ultra hızlı bir restoran platformu mu istiyorsunuz? Hamed ile iletişime geçin.",
    liveUrl: "https://www.cihangirevyemekler.com.tr",
    statusBadge: "Canlı Üretimde (Live in Production)",
    images: [
      {
        src: "/case-studies/cihangir-ev-yemekleri/hero.png",
        alt: "Cihangir Ev Yemekleri & Pide Masaüstü Ana Sayfa",
        caption: "Beyoğlu sakinleri ve uluslararası ziyaretçiler için 10 dilli vitrin",
      },
      {
        src: "/case-studies/cihangir-ev-yemekleri/menu.png",
        alt: "Cihangir Ev Yemekleri Menü ve Canlı Döviz Dönüşümü",
        caption: "6 para biriminde canlı fiyatlarla 85+ ev yemeği ve taş fırın pide çeşidi",
      },
      {
        src: "/case-studies/cihangir-ev-yemekleri/mobile.png",
        alt: "Cihangir Ev Yemekleri Mobil QR Menü Deneyimi",
        caption: "Masa QR taramaları için sıfır gecikmeli mobil arayüz",
      },
    ],
  },
  {
    slug: "lucky-sushi-multi-branch-platform",
    title: "Lucky Sushi & Chinese: 3 Şubeli Asya Mutfağı Platformu",
    metaTitle: "Lucky Sushi & Chinese Vaka Analizi | Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in İstanbul'da 3 şube için Next.js 16, next-intl ve Supabase ile 5 dilde geliştirdiği luckysushichinese.com.tr sipariş platformu.",
    category: "Full-Stack · Next.js · Çok Şubeli Restoran Platformu",
    year: "2026",
    tags: [
      "Next.js 16",
      "React 19",
      "next-intl",
      "Supabase",
      "5 Dil (RTL + Çince)",
      "3 Şube Yönlendirme",
      "WhatsApp Sipariş",
      "JSON-LD SEO",
    ],
    heroStat: { value: "3 Şube", label: "İstanbul Gece Operasyonu · 5 Dil" },
    problem:
      "Lucky Sushi & Chinese, İstanbul Avrupa Yakası'nda üç farklı mutfak işletiyor: Alibeyköy Merkez (04:00'e kadar salon + paket), Zeytinburnu (03:00'e kadar gel-al + paket) ve Reşitpaşa/Sarıyer (03:00'e kadar sadece paket servis). Tek şubeli klasik bir menü çalışma saatleri ve teslimat bölgelerinde karışıklık yaratıyor; ayrıca müşteriler Türkçe, İngilizce, Arapça, Rusça ve Çince dillerinde akıcı sipariş vermek istiyordu.",
    solution:
      "Next.js App Router, React 19, next-intl ve Supabase kullanılarak şubeye duyarlı çok dilli bir platform geliştirildi. Tek kaynaklı şube ve teslimat bölgesi yapısıyla müşteriler bulundukları ilçeye uygun mutfağın çalışma saatlerini ve WhatsApp sipariş hattını anında görür. 5 dilde (TR, EN, AR RTL, RU, ZH) eksiksiz Yerel SEO, dinamik site haritası ve Restaurant JSON-LD uygulandı.",
    technologies: [
      "Next.js 16 App Router (SSG)",
      "React 19",
      "next-intl (5 Dilli Yerelleştirme + RTL)",
      "Supabase",
      "Şube Bazlı Teslimat Bölgesi & Sepet",
      "Şubeye Doğrudan WhatsApp Siparişi",
      "JSON-LD Restaurant & Breadcrumb SEO",
      "Vercel Analytics",
    ],
    results: [
      {
        metric: "3 Şubeli İstanbul Mutfak Yönlendirmesi",
        description:
          "Alibeyköy (04:00), Zeytinburnu ve Reşitpaşa/Sarıyer şubelerini kendi teslimat bölgeleri ve WhatsApp hatlarıyla senkronize eder.",
      },
      {
        metric: "5 Yerel Dil (TR / EN / AR / RU / 中文)",
        description:
          "Arapça tam RTL arayüzü, Kiril ve Çince karakter uyumuyla doğal çok dilli deneyim.",
      },
      {
        metric: "Komisyonsuz Doğrudan WhatsApp Siparişi",
        description:
          "Mobil sepet, seçilen şubenin mutfağına aracı platform komisyonu olmadan doğrudan düzenli sipariş iletir.",
      },
      {
        metric: "Her Ürün İçin Teknik SEO & Hreflang",
        description:
          "Tüm menü ürünleri için dinamik URL'ler ve 5 dil arasında karşılıklı hreflang etiketleri.",
      },
    ],
    clientProof:
      "İstanbul genelinde luckysushichinese.com.tr adresinden gerçek siparişlere hizmet veren canlı çok şubeli platformdur. Geliştirici vaka çalışması ve mobil akış simülatörü luckysushichinese.com.tr/en/tasarim-gelistirme adresinde yayındadır.",
    cta: "Birden fazla şubesi olan bir restoran veya bulut mutfak mı yönetiyorsunuz? Komisyonsuz platformunuzu birlikte kuralım.",
    liveUrl: "https://www.luckysushichinese.com.tr",
    statusBadge: "Canlı Üretimde (Live in Production)",
    images: [
      {
        src: "/case-studies/lucky-sushi/hero.png",
        alt: "Lucky Sushi & Chinese Masaüstü Ana Sayfa",
        caption: "İstanbul'da Alibeyköy, Zeytinburnu ve Sarıyer'e hizmet veren 5 dilli platform",
      },
      {
        src: "/case-studies/lucky-sushi/menu.png",
        alt: "Lucky Sushi Menü ve Şube Seçici",
        caption: "Şube bazlı WhatsApp sipariş akışıyla geniş suşi, wok ve ramen kataloğu",
      },
      {
        src: "/case-studies/lucky-sushi/mobile.png",
        alt: "Lucky Sushi & Chinese Mobil Deneyim",
        caption: "Gece siparişlerinde yüksek dönüşüm için tasarlanan mobil-öncelikli arayüz",
      },
    ],
  },
  {
    slug: "healix-medical-platform",
    title: "Healix Medical: 5 Dilli Uluslararası Hasta Koordinasyon Platformu",
    metaTitle: "Healix Medical Vaka Analizi | 5 Dilli Next.js Sağlık Platformu | Hamed Mohamed",
    metaDescription:
      "İstanbul'da 5 dilde (Arapça RTL), 337 statik sayfa, 33 anlaşmalı kurum rehberi ve Google #1 marka sıralamasına sahip hasta koordinasyon platformu.",
    category: "Kurumsal & Sağlık Platformları · Next.js 16 · Çok Dilli SEO & GEO",
    year: "2026",
    tags: [
      "Next.js 16.4 (SSG)",
      "React 19 RSC",
      "TypeScript 5",
      "Tailwind CSS v4 (Logical RTL)",
      "5 Dil (AR / EN / FR / RU / TR)",
      "Derleme Zamanı i18n Kapısı",
      "Teknik SEO + GEO (llms.txt)",
      "Gizlilik Öncelikli İletişim API",
    ],
    heroStat: {
      value: "Google #1 · 337 SSG Sayfa",
      label: "5 dil (doğal Arapça RTL), 12 tıbbi branş, 8 rehber ve 33 anlaşmalı sağlık kurumu",
    },
    problem:
      "İstanbul merkezli uluslararası hasta koordinasyon şirketi Healix Medical'in resmi bir web sitesi yoktu ve yurt خارجından araştırma yapan hastalar aracı pazar yerlerine yöneliyordu. Şirketin 5 dilde (Arapça RTL, İngilizce, Fransızca, Rusça ve Türkçe) 12 koordinasyon branşını, 8 rehberi ve her birine özel sayfası olan 33 anlaşmalı sağlık tesisini sunan; tıbbi vaat içermeyen ve hasta dosyası depolamayan güvenilir bir platforma ihtiyacı vardı.",
    solution:
      "Platformu Next.js 16.4 App Router, React 19 Server Components ve Tailwind CSS v4 mantıksal özellikleri ile sıfırdan tasarlayıp geliştirdim. Derleme öncesinde 5 dilin her birindeki 1.556 içerik anahtarını doğrulayan sıfır bağımlılıklı bir i18n kontrol betiği (validate-i18n.mjs) kurdum. Karşılıklı hreflang etiketlerine sahip 330 URL'lik görsel site haritası, www kanonik hizalaması, yapay zeka botlarına 200 OK SSR yanıtı veren Edge Proxy, llms.txt dosyaları ve bot korumalı gizlilik-öncelikli iletişim API'si uyguladım.",
    technologies: [
      "Next.js 16.4 (App Router & Statik Sayfa Üretimi)",
      "React 19 Server Components",
      "TypeScript 5",
      "Tailwind CSS v4 Logical Properties (0.00 CLS Doğal Arapça RTL)",
      "Derleme Zamanı i18n Doğrulayıcı (validate-i18n.mjs · 4.395 metin)",
      "330 URL Görsel XML Site Haritası & Karşılıklı Hreflang",
      "AI Bot Edge Proxy + /llms.txt & /llms-full.txt (GEO)",
      "Gizlilik Öncelikli Webhook / Resend API + Anti-Bot Koruması",
    ],
    results: [
      {
        metric: "Google Marka Aramalarında #1 Sıralama",
        description:
          "Yayına alındıktan kısa süre sonra 'healix istanbul' aramasında Google'da #1 sıraya yerleşti ve 330 URL'lik site haritasının tamamı Google Search Console ve Bing Webmaster Tools'a kaydedildi.",
      },
      {
        metric: "5 Dilde 337 Statik Sayfa (SSG)",
        description:
          "Arapça (tam RTL), İngilizce, Fransızca, Rusça ve Türkçe dillerinde 12 branş, 8 rehber ve 33 anlaşmalı sağlık tesisinin her birine özel sayfa üretildi.",
      },
      {
        metric: "33 Anlaşmalı Sağlık Kurumu Rehberi",
        description:
          "13 Türkiye şehrindeki 33 anlaşmalı sağlık tesisini (Medical Park, Liv Hospital, İstinye ve Aydın Üniversitesi) filtreleyen etkileşimli rehber.",
      },
      {
        metric: "Gizlilik Öncelikli Mimari & Sıfır Veri Riski",
        description:
          "Yalnızca koordinasyon sınırlarını koruyan şeffaf yapı, sıfır tıbbi dosya kaydı, reklamsız takip politikası ve otomatik dil tutarlılığı kontrolü.",
      },
    ],
    clientProof:
      "Platform healixistanbul.com.tr adresinde 5 dilde canlı olarak hizmet vermektedir. Geliştirici referansı ve mimari vaka analizi doğrudan müşteri alan adında healixistanbul.com.tr/en/tasarim-gelistirme ve healixistanbul.com.tr/ar/tasarim-gelistirme adreslerinde yayındadır.",
    cta: "Google ve yapay zeka aramalarında öne çıkan çok dilli bir kurumsal veya sağlık platformuna mı ihtiyacınız var? Hamed ile iletişime geçin.",
    liveUrl: "https://www.healixistanbul.com.tr",
    statusBadge: "Canlı Üretimde (Live in Production)",
    images: [
      {
        src: "/case-studies/healix-medical/hero-en.png",
        alt: "Healix Medical Masaüstü İngilizce (LTR) Ana Sayfa",
        caption: "Masaüstü (1440×900) İngilizce LTR arayüzü; lacivert dünya haritası ve net hasta koordinasyon çerçevesi",
      },
      {
        src: "/case-studies/healix-medical/hero-ar.png",
        alt: "Healix Medical Masaüstü Arapça (Doğal RTL) Ana Sayfa",
        caption: "Masaüstü (1440×900) sıfır kayma (0.00 CLS) ile doğal Arapça RTL mimarisi",
      },
      {
        src: "/case-studies/healix-medical/service-ar.png",
        alt: "Healix Medical Arapça Karaciğer Nakli Koordinasyon Sayfası",
        caption: "Anatomik görsel netliği şeffaf tıbbi sorumluluk sınırlarıyla birleştiren masaüstü hizmet sayfası",
      },
      {
        src: "/case-studies/healix-medical/tablet-facilities.png",
        alt: "Healix Medical Tablet Görünümü: 33 Anlaşmalı Sağlık Kurumu Rehberi",
        caption: "Tablet (820×1080) görünümünde 13 şehirdeki 33 anlaşmalı sağlık tesisini filtreleyen etkileşimli rehber",
      },
      {
        src: "/case-studies/healix-medical/mobile-en.jpg",
        alt: "Healix Medical Mobil Görünüm: Etik Komisyon Rehberi (İngilizce)",
        caption: "Mobil (390×844) İngilizce Etik Komisyon hazırlık ve belge rehberi",
      },
      {
        src: "/case-studies/healix-medical/mobile-ar.jpg",
        alt: "Healix Medical Mobil Görünüm: Etik Komisyon Rehberi (Arapça RTL)",
        caption: "Mobil (390×844) aynı yasal rehberin tam tipografik uyumlu Arapça RTL versiyonu",
      },
    ],
  },
];
