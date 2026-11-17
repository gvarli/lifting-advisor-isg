import { LegalArticle } from './types';

export const turkishRegulationsData: LegalArticle[] = [
  {
    id: 'isg-kanunu-madde-4',
    sourceLaw: '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
    articleNumber: 'Madde 4',
    title: {
      tr: 'İşverenin Genel Yükümlülüğü ve Ekipman Güvenliği',
      en: 'Employer General Obligations & Equipment Safety'
    },
    summary: {
      tr: 'İşveren, çalışanların işle ilgili sağlık ve güvenliğini sağlamakla yükümlü olup, işyerinde alınan İSG tedbirlerine uyulup uyulmadığını izler, denetler ve uygunsuzlukları giderir.',
      en: 'Employers are obligated to ensure occupational health and safety, monitoring and enforcing workplace compliance.'
    },
    fullText: {
      tr: 'İşveren; mesleki risklerin önlenmesi, eğitim ve bilgi verilmesi dahil her türlü tedbirin alınması, organizasyonun yapılması, gerekli araç ve gereçlerin sağlanması, sağlık ve güvenlik tedbirlerinin değişen şartlara uygun hale getirilmesi ve mevcut durumun iyileştirilmesi için çalışmalar yapar. İşyerinde alınan iş sağlığı ve güvenliği tedbirlerine uyulup uyulmadığını izler, denetler ve uygunsuzlukların giderilmesini sağlar. Risk değerlendirmesi yapar veya yaptırır.',
      en: 'The employer shall take necessary measures for the prevention of occupational risks, including provision of training and information, providing necessary equipment, and ensuring compliance with safety standards.'
    },
    scope: 'general_safety',
    keyEnforcementPoints: {
      tr: [
        'Kaldırma operasyonlarında uygunsuz, yıpranmış veya standart dışı ekipman kullanımına izin verilemez.',
        'İşveren sadece ekipmanı satın almakla yetinemez; periyodik kontrol ve saha denetimini kesintisiz yürütmek zorundadır.',
        'Tüm kaldırma aksesuarlarının izlenebilirlik sertifikaları sahada arşivlenmelidir.'
      ],
      en: [
        'Prohibits using substandard or uncertified lifting gear in operations.',
        'Employers must inspect field rigging practices continuously, not merely purchase gear.',
        'Traceable inspection certificates must be retained on site.'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: 'Kusurlu veya kontrolsüz ekipman kaynaklı ölümlü/yaralanmalı iş kazalarında işveren ve vekilleri TCK 85/89 maddeleri gereği doğrudan hapis ve adli para cezasıyla yargılanır.',
      en: 'Accidents involving defective gear result in penal prosecution of employers under Turkish Penal Code.'
    }
  },
  {
    id: 'isg-kanunu-madde-13',
    sourceLaw: '6331 Sayılı İş Sağlığı ve Güvenliği Kanunu',
    articleNumber: 'Madde 13',
    title: {
      tr: 'Çalışmaktan Kaçınma Hakkı (Ciddi ve Yakın Tehlike)',
      en: 'Right to Refrain from Dangerous Work'
    },
    summary: {
      tr: 'Ciddi ve yakın tehlike ile karşı karşıya kalan çalışan, gerekli tedbirler alınıncaya kadar çalışmaktan kaçınabilir.',
      en: 'Workers exposed to imminent and serious hazard have the legal right to suspend work until rectified.'
    },
    fullText: {
      tr: 'Ciddi ve yakın tehlike ile karşı karşıya kalan çalışanlar İSG kuruluna, kurulun bulunmadığı yerlerde ise işverene başvurarak durumun tespit edilmesini ve gerekli tedbirlerin alınmasına karar verilmesini talep edebilir. Kurul veya işverenin çalışanın talebi yönünde karar vermesi halinde çalışan, gerekli tedbirler alınıncaya kadar çalışmaktan kaçınabilir. Çalışanların çalışmaktan kaçındığı dönemdeki ücreti ile diğer hakları saklıdır.',
      en: 'Workers confronted with imminent and serious danger may demand immediate safety resolution and refrain from performing tasks without loss of wages or employment rights.'
    },
    scope: 'general_safety',
    keyEnforcementPoints: {
      tr: [
        'Sapancı veya vinç operatörü; deforme olmuş sapan, bozuk fren, aşırı rüzgar (> 20 m/s) veya güvensiz bağlama gördüğünde kaldırmayı derhal durdurma hakkına sahiptir.',
        'Çalışmaktan kaçınma hakkını kullanan çalışana disiplin cezası verilemez veya iş akdi feshedilemez.'
      ],
      en: [
        'Riggers and crane operators possess unconditional legal authority to refuse lifting with damaged slings or in hazardous wind conditions.',
        'Retaliatory disciplinary actions against workers invoking this right are strictly prohibited.'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: 'Çalışanı zorla tehlikeli kaldırma işlemine zorlayan amir veya işveren aleyhine fesih tazminatı ve ağır idari para cezası uygulanır.',
      en: 'Coercing workers into hazardous lifting triggers substantial administrative fines and statutory compensation claims.'
    }
  },
  {
    id: 'is-ekipmanlari-yonetmeligi-madde-7',
    sourceLaw: 'İş Ekipmanlarının Kullanımında Sağlık ve Güvenlik Şartları Yönetmeliği',
    articleNumber: 'Madde 7 ve 8',
    title: {
      tr: 'İş Ekipmanının Periyodik Kontrolü ve Yetkili Kişiler (EKİPNET Kaydı)',
      en: 'Periodic Examination Authorization & EKİPNET Registry'
    },
    summary: {
      tr: 'Kaldırma ekipmanlarının periyodik kontrolleri, Bakanlık sistemine (EKİPNET) kayıtlı ve yetkilendirilmiş uzman mühendisler/teknikerler tarafından yapılmak zorundadır.',
      en: 'Periodic examinations must be conducted exclusively by accredited surveyors registered in the Ministry EKİPNET database.'
    },
    fullText: {
      tr: 'İşverence, iş ekipmanının kullanım süresince, imalatçının belirlediği periyotlarda veya yönetmelikte belirtilen azami süreleri aşmamak üzere periyodik kontrolleri yaptırılır. Kontroller; Bakanlıkça yetkilendirilmiş, EKİPNET numarasına sahip makine mühendisleri, mekatronik mühendisleri veya makine teknikerleri/yüksek teknikerleri tarafından gerçekleştirilir. Raporlarda onaylı EKİPNET kayıt numarası bulunmayan kontroller geçersiz sayılır.',
      en: 'Employers shall ensure periodic inspection by mechanical/mechatronics engineers holding an active EKİPNET registration number. Reports lacking verified EKİPNET credentials are null and void.'
    },
    scope: 'inspection_reporting',
    keyEnforcementPoints: {
      tr: [
        'EKİPNET kayıt numarası bulunmayan kişilerin düzenlediği raporlar yasal olarak geçersizdir.',
        'Periyodik kontrol raporunda ekipmanın künyesi, test yükü miktarı (statik/dinamik), ölçülen değerler ve açık sonuç (UYGUNDUR / UYGUN DEĞİLDİR) yer almalıdır.'
      ],
      en: [
        'Reports drafted by non-EKİPNET certified surveyors are legally void.',
        'The report must explicitly record applied proof test loads, dimensional measurements, and unambiguous binary conclusion (PASS / FAIL).'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: 'Geçersiz periyodik kontrol raporu ile ekipman çalıştırmak, hiç kontrol yaptırmamış sayılır ve ekipmanın mühürlenerek durdurulmasına yol açar.',
      en: 'Operating lifting plant with invalid inspection reports incurs immediate operational shutdown orders.'
    }
  },
  {
    id: 'is-ekipmanlari-ek-2-madde-3',
    sourceLaw: 'İş Ekipmanları Yönetmeliği EK-II',
    articleNumber: 'Madde 3.1 & 3.2',
    title: {
      tr: 'Yük Kaldırmada Özel Kullanım Hükümleri ve İSG Yasakları',
      en: 'Lifting Operations Specific Mandatory Rules'
    },
    summary: {
      tr: 'İnsanların üzerinden yük geçirilmesi yasaktır. Askıda yük bırakılamaz. Yüklerin kılavuzsuz kontrolsüz dönmesi ve savrulması engellenmelidir.',
      en: 'Lifting over personnel is prohibited. Suspended loads must never be left unattended. Load rotation must be controlled.'
    },
    fullText: {
      tr: 'Yüklerin kaldırılması için kullanılan iş ekipmanları, çalışma sahasında bulunan çalışanların güvenliğini tehlikeye atmayacak şekilde kurulur ve kullanılır. Özellikle, çalışanların üzerinden yük geçirilmez ve yükün çalışanların bulunduğu alana düşme ihtimali olan yerlerde gerekli önlemler alınır. Yükün askıda bırakılması kesinlikle yasaktır; zorunlu hallerde tehlikeli bölgeye giriş engellenir. Açık havada kullanılan kaldırma ekipmanları, rüzgar hızı çalışma sınırını aştığında durdurulur.',
      en: 'Lifting equipment shall be installed and operated to eliminate risks of falling loads. Loads shall not be carried over workers. Suspended loads must never be left unattended. Operations cease when wind thresholds are breached.'
    },
    scope: 'lifting_machinery',
    keyEnforcementPoints: {
      tr: [
        'Askıda yük varken vinç operatörünün kabini/kumandayı terk etmesi kesinlikle yasaktır.',
        'Kaldırma sahasına yetkisiz kişilerin girişi fiziki bariyer ve ikaz şeritleriyle kapatılmalıdır.',
        'Yükün dönmesini veya salınmasını engellemek için sapan kancasına doğrudan elle müdahale edilmez; yönlendirme halatı (tagline) kullanılır.'
      ],
      en: [
        'Operators are strictly barred from abandoning crane controls while a load remains suspended.',
        'Lifting corridors must be cordoned off with physical barriers.',
        'Taglines must be deployed to steer and stabilize rotating loads without manual physical contact.'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: 'Askıda yük altında çalışan tespiti durumunda İş Teftiş Kurulu müfettişlerince işin durdurulması kararı verilir.',
      en: 'Breaching suspended load exclusion zones triggers immediate cessation of construction activities by labor inspectors.'
    }
  },
  {
    id: 'is-ekipmanlari-ek-3-tablo-2',
    sourceLaw: 'İş Ekipmanları Yönetmeliği EK-III',
    articleNumber: 'Madde 2.2 ve Tablo 2',
    title: {
      tr: 'Kaldırma ve İletme Ekipmanlarında Periyodik Kontrol Süreleri ve Test Kriterleri',
      en: 'Periodic Examination Intervals & Proof Load Ratios (Table 2)'
    },
    summary: {
      tr: 'Standartlarda süre belirtilmemişse kaldırma ve iletme ekipmanlarının periyodik kontrol süresi azami 1 YILDIR. Statik testte WLL\'in 1.25 katı, dinamik testte 1.1 katı uygulanır.',
      en: 'Maximum inspection interval is 1 YEAR unless specified otherwise by standards. Test loads: 1.25x static and 1.1x dynamic WLL.'
    },
    fullText: {
      tr: 'Kaldırma ve iletme ekipmanları, standartlarda süre belirtilmemişse azami 1 yılda bir periyodik kontrole tabi tutulur. Kaldırma ekipmanları, aksine bir hüküm yoksa beyan edilen yükün en az 1,25 katını, etkili ve güvenli bir şekilde kaldırıp askıda tutabilecek güçte olur ve bunların bu yüke dayanıklı ve yeterli yük frenleri bulunur. Dinamik yük testi beyan yükünün 1,1 katı ile yapılır.',
      en: 'Unless otherwise provided by harmonized standards, lifting appliances shall undergo periodic examination at least once annually. Appliances must safely sustain 1.25 times rated WLL statically and 1.1 times rated WLL dynamically.'
    },
    scope: 'inspection_reporting',
    keyEnforcementPoints: {
      tr: [
        'Statik Yük Testi: Beyan edilen WLL x 1.25 tonajında yükle zemin seviyesinde 10-15 dakika bekletilerek fren ve gövde deformasyonu incelenir.',
        'Dinamik Yük Testi: Beyan edilen WLL x 1.10 tonajında yükle vincin tüm kaldırma, indirme, köprü ve araba hareket limitleri fonksiyonel denenir.',
        'Standart gereği 1 yıldan daha kısa süre öngörülmüşse (örn. korozyonlu ortamda 3-6 ay) standarttaki kısa süre uygulanır.'
      ],
      en: [
        'Static Proof Test: 1.25 x WLL held 100-200mm above ground for 10-15 minutes to verify brake torque and girder camber.',
        'Dynamic Proof Test: 1.10 x WLL tested through all hoist, trolley, and crane travel functions.',
        'Shorter intervals stipulated by standards for harsh or corrosive service take legal precedence.'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: '1 yıllık kontrol süresi geçmiş ekipmanın şantiyede veya fabrikada çalıştırılması mühürleme ve ağır idari para cezası nedenidir.',
      en: 'Operating plant with expired inspection tags incurs immediate operational embargoes.'
    }
  },
  {
    id: 'makine-emniyeti-yonetmeligi-4-3',
    sourceLaw: 'Makine Emniyeti Yönetmeliği (2006/42/AT)',
    articleNumber: 'Ek-I Madde 4.3.1 ve 4.3.2',
    title: {
      tr: 'Kaldırma Aksesuarlarının İşaretlenmesi ve CE Zorunluluğu',
      en: 'Lifting Accessories Marking & CE Requirements'
    },
    summary: {
      tr: 'Her kaldırma aksesuarı (sapan, mapa, kanca, travers) üzerinde üretici bilgisi, malzeme sınıfı, WLL değeri ve CE işareti kalıcı olarak bulunmak zorundadır.',
      en: 'All lifting accessories must bear permanent markings: manufacturer identity, material grade, WLL, and CE mark.'
    },
    fullText: {
      tr: 'Her bir kaldırma aksesuarı üzerinde; imalatçının veya yetkili temsilcisinin ticari unvanı ve açık adresi, malzemenin tanıtımı (örneğin uluslararası sınıflandırmaya göre), anma çalışma yükü sınırı (WLL), CE işareti bulunmalıdır. Boyutları işaretlemeye imkan vermeyen aksesuarlarda bilgiler kalıcı bir plakaya veya etikete yazılır veya güvenli bir şekilde bağlanır.',
      en: 'Each lifting accessory must display manufacturer name, material grade, Working Load Limit (WLL), and CE marking. Where size prevents direct engraving, a securely attached metallic tag must be provided.'
    },
    scope: 'lifting_accessories',
    keyEnforcementPoints: {
      tr: [
        'Etiketsiz veya üzerindeki WLL değeri silinmiş hiçbir sapan yasal olarak iş sahasına sokulamaz.',
        'Üretici tarafından düzenlenmiş AT Uygunluk Beyanı (Declaration of Conformity) ve Test Sertifikası ekipmanla birlikte teslim alınmalıdır.',
        'İşaretleme kalıcı (dövme kabartma, lazer baskı veya perçinli metal plaka) olmalıdır.'
      ],
      en: [
        'Untagged slings or accessories with illegible WLL markings are strictly barred from service.',
        'The official EC Declaration of Conformity and manufacturer test certificate must be archived.',
        'Markings must be permanent (forged relief, laser etched, or riveted metallic plate).'
      ]
    },
    penaltiesOrLegalImplications: {
      tr: 'Piyasa Gözetimi ve Denetimi (PGD) kapsamında CE işaretsiz veya sahte sertifikalı ekipman satanlar hakkında toplatma ve ağır cezai yaptırım uygulanır.',
      en: 'Supplying uncertified or counterfeit lifting accessories triggers market recall and heavy civil/penal sanctions.'
    }
  }
];
