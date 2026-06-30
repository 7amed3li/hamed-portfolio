import type { CaseStudy } from './types';

export const caseStudies: CaseStudy[] = [
  {
    slug: "qr-attendance-system",
    title: "QR Kodlu Yoklama Sistemi",
    metaTitle: "QR Yoklama Sistemi Örnek Olay İncelemesi — Hamed Mohamed",
    metaDescription:
      "Hamed Mohamed'in 7 fakültede 2.000'den fazla öğrenci için nasıl %98 gecikme azalması ve %99.9 çalışma süresi sağlayan QR tabanlı bir yoklama sistemi kurduğunu okuyun.",
    category: "Full-Stack Sistem · Performans Mühendisliği",
    year: "2025–Günümüz",
    tags: ["Node.js", "React.js", "PostgreSQL", "Redis", "Docker", "QR", "Yönetici Paneli"],
    heroStat: { value: "2.000+", label: "Günlük Canlı Kullanıcı" },
    problem:
      "Bir üniversitenin 7 farklı fakültedeki binlerce öğrencinin yoklamasını takip etmesi gerekiyordu. Mevcut süreç manueldi — kağıt yoklama listeleri, Excel tabloları ve eğitmenler için büyük bir zaman kaybı. Kurulacak sistem, bir dersin başlangıcında yüzlerce öğrencinin aynı anda kod taradığı yoğun yük (peak load) anlarını kaldırabilmeli, uygulama indirmeden herhangi bir telefonda çalışabilmeli, yöneticilere kayıtları görüntülemeleri ve dışa aktarmaları için bir kontrol paneli sunmalı ve mesai saatlerinde %100 oranında kesintisiz çalışmalıydı.",
    solution:
      "Hamed, eksiksiz bir QR tabanlı yoklama sistemi tasarladı ve geliştirdi. Öğrenciler, sınıfta görüntülenen bir QR kodunu tarar — kod tarayıcılarında açılır, yoklamayı anında kaydeder ve kapanır. Hile yapılmasını önlemek için her QR kodun kısa bir geçerlilik süresi vardır. Eğitmenler ve fakülte yöneticileri; kayıtları görmek, raporlar oluşturmak ve sistemi yönetmek için bir kontrol paneline giriş yaparlar. Arka planda (backend) Hamed hibrit bir doğrulama hattı kurdu: hız için bellek içi (in-memory) kontroller, doğruluk için veritabanı onayı ve herhangi bir parçanın arızalanması durumunda otomatik yedekleme (fallback). Yoğun tarama zamanlarında veritabanı yükünü büyük ölçüde azaltmak için Redis önbellekleme (caching) eklendi.",
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
        description: "Sistem artık saniyede 653 isteğe kadar işlem yapabiliyor — aynı anda yüzlerce öğrencinin taramasını kaldırabiliyor.",
      },
      {
        metric: "2.000+ günlük kullanıcı",
        description: "Sistem, 7 üniversite fakültesindeki öğrenciler ve öğretim üyeleri tarafından her gün canlı (production) olarak kullanılıyor.",
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
    cta: "Okulunuz, şirketiniz veya etkinliğiniz için bir yoklama sistemine ihtiyacınız varsa — Hamed sizin için bir tane geliştirebilir.",
  },
  {
    slug: "nodesecure-open-source",
    title: "NodeSecure Açık Kaynak Güvenlik Katkıları",
    metaTitle: "NodeSecure Açık Kaynak Katkıları — Hamed Mohamed",
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
        metric: "PR #452 — Güvensiz Rastgele Sayı Probu",
        description: "Geliştiricilerin yaygın bir kriptografi hatasından kaçınmasına yardımcı olmak için güvenlik açısından hassas bağlamlarda Math.random() kullanımını işaretleyen bir prob geliştirdi.",
      },
      {
        metric: "PR #462 — SSRF Tespiti",
        description: "Node.js kodundaki localhost referanslarını ve SSRF riski taşıyan URL desenlerini daha iyi tespit etmek için shady-url denetleyicisini iyileştirdi.",
      },
      {
        metric: "PR #456 — Hassasiyet (Sensitivity) Seçeneği",
        description: "Mevcut herhangi bir davranışı bozmadan AstAnalyser, ProbeRunner ve SourceFile genelinde muhafazakar/agresif (conservative/aggressive) hassasiyet modları ekledi.",
      },
      {
        metric: "PR #467 — Adlandırılmış Ana İşleyiciler (Named Main Handlers)",
        description: "Probların birden fazla doğrulama senaryosunu temiz bir şekilde ele alabilmesi için isSerializeEnv'ye Adlandırılmış Ana İşleyiciler (Named Main Handlers) modelini ekledi.",
      },
      {
        metric: "PR #468 — E-posta Dizisi (Literal) Tespiti",
        description: "CollectableSet API'sini kullanarak 5 kapsamlı test durumuyla e-posta dizisi (email literal) toplama özelliğini uyguladı.",
      },
      {
        metric: "PR #496 — Kıyaslama (Benchmarking) Altyapısı",
        description: "NodeSecure sürümleri arasında AST analiz performansını izlemek için mitata kütüphanesini kullanarak eksiksiz bir kıyaslama (benchmarking) kurulumu geliştirdi.",
      },
    ],
    clientProof:
      "Bu katkılar NodeSecure organizasyonu altında GitHub'da herkese açık ve doğrulanabilirdir. Hamed'in gerçek güvenlik araçları üzerinde çalışma, karmaşık AST analiz kodunu anlama ve küresel olarak geliştiriciler tarafından kullanılan bir açık kaynak (open-source) projesine temiz, test edilmiş iyileştirmeler ekleme yeteneğini göstermektedir.",
    cta: "Uygulamanız için güvenlik uzmanlığına — kod incelemesi, güvenlik açığı taraması veya güvenlik mimarisi — ihtiyacınız varsa, Hamed yardımcı olabilir.",
  },
  {
    slug: "dragonsploit",
    title: "DragonSploit — Yapay Zeka Destekli Güvenlik Tarayıcısı",
    metaTitle: "DragonSploit Yapay Zeka Zafiyet Tarayıcısı — Hamed Mohamed",
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
        description: "Motor, tarama niyetini yorumlar ve stratejileri dinamik olarak seçer — manuel yapılandırma gerekmez.",
      },
      {
        metric: "AI halüsinasyon koruması",
        description: "Deterministik (belirleyici) bir doğrulama katmanı, yapay zeka tarafından oluşturulan bulguları raporlanmadan önce onaylayarak doğruluğu garanti eder.",
      },
    ],
    clientProof:
      "DragonSploit, Hamed'in yapay zeka yeteneklerini pratik güvenlik mühendisliği ile birleştirme — sadece teknik olarak etkileyici değil, aynı zamanda geleneksel yaklaşımlardan daha doğru ve kullanışlı sistemler kurma — yeteneğini göstermektedir.",
    cta: "Uygulamanızın güvenlik incelemesine ihtiyacınız varsa veya özel bir güvenlik aracı hakkında görüşmek isterseniz — Hamed'le iletişime geçin.",
  },
];
