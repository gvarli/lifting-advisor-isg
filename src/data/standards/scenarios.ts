import { ScenarioFilter } from './types';

export const legalScenariosData: ScenarioFilter[] = [
  {
    id: 'scenario-man-riding',
    title: {
      tr: 'Personel Kaldırma Sepeti Kullanımı ve Vinçle İnsan Taşıma',
      en: 'Personnel Man-Basket & Hoisting of Workers'
    },
    queryKeywords: ['personel', 'sepet', 'insan', 'man-riding', 'man basket', 'ek-2'],
    relevantArticleIds: ['is-ekipmanlari-ek-2-madde-3', 'isg-kanunu-madde-4'],
    recommendedChecklist: {
      tr: [
        'Vinç kural olarak insan kaldırmak için üretilmemiştir; alternatif (iskele, platform) imkanı varsa sepet KULLANILAMAZ.',
        'Zorunlu hallerde sepet EN 14502-1 standardına uygun sertifikalı olmalıdır.',
        'Vincin anma kaldırma kapasitesi (WLL) %50 oranında düşürülmelidir.',
        'Sepetteki her çalışan paraşüt tipi emniyet kemeriyle bağımsız bir yaşam hattına (lifeline) bağlı olmalıdır.',
        'Operatör ile sepetteki personel arasında telsizle kesintisiz çift yönlü iletişim sağlanmalıdır.'
      ],
      en: [
        'Hoisting workers with cranes is an exceptional measure; prohibited if MEWP/scaffolding is viable.',
        'Suspended basket must be manufactured and certified to EN 14502-1.',
        'De-rate crane lifting capacity by 50% for personnel hoisting.',
        'Every occupant must wear a full-body harness tied off to an independent overhead lifeline.',
        'Continuous two-way radio communication must be maintained between operator and basket occupants.'
      ]
    }
  },
  {
    id: 'scenario-inspection-report-content',
    title: {
      tr: 'Periyodik Kontrol Raporunda Bulunması Zorunlu Bilgiler',
      en: 'Mandatory Information in Periodic Inspection Reports'
    },
    queryKeywords: ['rapor', 'periyodik kontrol', 'ekipnet', 'tablo 2', 'muayene'],
    relevantArticleIds: ['is-ekipmanlari-yonetmeligi-madde-7', 'is-ekipmanlari-ek-3-tablo-2'],
    recommendedChecklist: {
      tr: [
        'Raporu düzenleyen uzmanın Bakanlık EKİPNET kayıt numarası raporda yer almalıdır (aksi halde rapor geçersizdir).',
        'Uygulanan statik test (1.25x WLL) ve dinamik test (1.10x WLL) yük değerleri somut yazılmalıdır.',
        'Halat, zincir ve kanca için kumpas ve mikrometre ile ölçülen kalıcı deformasyon ve aşınma değerleri raporda bulunmalıdır.',
        'Rapor net bir "KULLANIMI UYGUNDUR" veya "KULLANIMI UYGUN DEĞİLDİR" kararı içermelidir.',
        'Bir sonraki periyodik kontrol tarihi (azami 1 yıl) açıkça belirtilmelidir.'
      ],
      en: [
        'The inspector’s Ministry EKİPNET registration number must be verified on the report.',
        'Exact static proof load (1.25x) and dynamic proof load (1.10x) values must be documented.',
        'Physical caliper measurements of wire rope diameter, chain link wear, and hook throat spread must be logged.',
        'Unambiguous final conclusion: PASS or FAIL.',
        'Next due examination date (max 1 year) must be displayed prominently.'
      ]
    }
  },
  {
    id: 'scenario-missing-tag',
    title: {
      tr: 'Sapan veya Aksesuar Etiketi Kaybolursa Yasal Prosedür',
      en: 'Legal Protocol for Missing or Illegible Sling Tags'
    },
    queryKeywords: ['etiket', 'künye', 'silinmiş', 'marka', 'ce', 'kayıp'],
    relevantArticleIds: ['makine-emniyeti-yonetmeligi-4-3', 'isg-kanunu-madde-4'],
    recommendedChecklist: {
      tr: [
        'Mavi etiketi kopmuş bez sapan veya künyesi düşmüş zincir sapan DERHAL KULLANIM DIŞI BIRAKILMALIDIR.',
        'Etiketsiz sapanla kaldırma yapmak İş Sağlığı ve Güvenliği Kanunu uyarınca doğrudan kusur sayılır.',
        'Sapan ancak akredite bir test kuruluşu veya orijinal imalatçı tarafından %200 proof load testine tabi tutulup yeni sertifikayla etiketlenirse sahaya dönebilir.',
        'Sahada el yazısıyla veya sprey boyayla etiket oluşturmak KESİNLİKLE YASAKTIR.'
      ],
      en: [
        'Any sling missing its mandatory identification tag must be QUARANTINED immediately.',
        'Lifting with untagged rigging constitutes a direct statutory violation.',
        'Slings may only re-enter service if recertified and retagged by an accredited proof test facility.',
        'Handwritten markers or field-painted labels are strictly prohibited.'
      ]
    }
  },
  {
    id: 'scenario-refusal-to-work',
    title: {
      tr: 'Ciddi ve Yakın Tehlikede Çalışmaktan Kaçınma Hakkı',
      en: 'Invoking the Right to Refrain from Dangerous Rigging'
    },
    queryKeywords: ['çalışmaktan kaçınma', 'madde 13', 'tehlike', 'reddetme', 'durma'],
    relevantArticleIds: ['isg-kanunu-madde-13', 'is-ekipmanlari-ek-2-madde-3'],
    recommendedChecklist: {
      tr: [
        'Halatta tel kırığı/kuş kafesi, kancada emniyet mandalı kırığı veya aşırı rüzgar (>20 m/s) varsa operatör/sapancı işi durdurma hakkına sahiptir.',
        'Durum derhal İSG kuruluna veya işveren vekiline tutanakla bildirilir.',
        'Gerekli teknik düzeltme yapılana kadar çalışan çalışmaktan kaçınabilir; bu süreçte maaşı ve özlük hakları kesilemez.',
        'Çalışana bu sebeple baskı yapılması veya iş akdinin feshedilmesi yasal olarak geçersizdir.'
      ],
      en: [
        'Riggers and operators are legally protected to halt hoisting if critical defects or severe winds (>20 m/s) arise.',
        'Immediately file written notification to the OHS committee or site superintendent.',
        'Work remains suspended until safe remedies are certified; pay and employment rights remain protected.',
        'Retaliatory actions or contract termination are legally null and void.'
      ]
    }
  },
  {
    id: 'scenario-high-wind-limits',
    title: {
      tr: 'Rüzgarlı Havada Kaldırma ve Vinç Operasyonunu Durdurma',
      en: 'High Wind Velocity Protocols & Crane Shutdown Limits'
    },
    queryKeywords: ['rüzgar', 'fırtına', 'durdurma', '20 m/s', 'hız'],
    relevantArticleIds: ['is-ekipmanlari-ek-2-madde-3', 'isg-kanunu-madde-4'],
    recommendedChecklist: {
      tr: [
        'Rüzgar hızı 14 m/s (50 km/h) üzerine çıktığında geniş yüzeyli yük kaldırmaları durdurulmalı, çift kılavuz halat (tagline) kullanılmalıdır.',
        'Rüzgar hızı 20 m/s (72 km/h) sınırına ulaştığında TÜM VİNÇ KALDIRMALARI DERHAL DURDURULMALIDIR.',
        'Yük askıda bırakılmamalı; acilen zemin seviyesine güvenle indirilmelidir.',
        'Kule vinçlerde bom rüzgara serbest salınım (weathervaning / rüzgar gülü) moduna alınmalıdır; dönüş freni kilitlenmemelidir.'
      ],
      en: [
        'When wind reaches 14 m/s (50 km/h), large panel lifts must be halted; dual taglines mandatory.',
        'At 20 m/s (72 km/h), ALL CRANE OPERATIONS MUST CEASE unconditionally.',
        'Lower all suspended loads immediately to ground level; never abandon a live suspended load.',
        'Tower cranes must be put into free-slewing (weathervaning) mode; slewing brake must remain unlocked.'
      ]
    }
  }
];
