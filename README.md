# Kaldırma Ekipmanları & İSG Mühendislik Danışmanı (Lifting Advisor)
### Endüstriyel Hibrit PWA & Capacitor Mobil Uygulama

Bu yazılım; ağır sanayi, dökümhane, inşaat, tersane, enerji ve lojistik sektörlerinde faaliyet gösteren **satıcılar, son kullanıcılar, vinç operatörleri, sapancılar, periyodik kontrol uzmanları ve A/B/C sınıfı İSG uzmanları** için geliştirilmiş **"Offline-First Danışman Uygulama"** platformudur.

---

## 🏗️ Temel Mimari Prensipleri

1. **Sıfır Kullanıcı Girişi (Zero Auth) & Sıfır Veritabanı:**
   - Kullanıcı girişi, üyelik veya sunucu tarafında veri tabanı kaydı tutulmaz.
   - Tüm oturum verileri istemci tarafında (Tarayıcı belleği, IndexedDB ve sessionStorage) tutulur ve kullanıcı dilediğinde tek tıkla temizlenir.
2. **%100 Çevrimdışı Çalışma (Offline-First):**
   - 6 büyük ekipman grubuna ait 7 aşamalı yaşam döngüsü ansiklopedisi, 7 mühendislik formül motoru ve mevzuat/standartlar kütüphanesi uygulamanın içine statik olarak gömülüdür.
   - Dağ başında, tersane havuzunda veya yer altı tesislerinde internet olmadan %100 çalışır.
3. **Akıllı Çapraz Modül Entegrasyonu (Cross-Module):**
   - Ansiklopediden tek tıkla o ekipmanın gerilim/açı hesabına geçiş.
   - Hesaplama motorunda kritik tehlike veya açı limiti (>60°) aşıldığında tek tıkla senaryoyu AI denetçisine gönderme ve travers/alternatif yöntem talep etme.
4. **Çok Dilli Altyapı (i18n):**
   - Türkçe (TR) ve İngilizce (EN) teknik literatür çevirileriyle tam destekli.
5. **Endüstriyel Yüksek Kontrast Arayüz:**
   - Güneş ışığı altında sahada okunabilen Emniyet Sarısı (#F59E0B) ve Derin Arduvaz (#0B0F19) paleti.

---

## 📦 5 Ana Uygulama Modülü

### 1. Ekipman Bilgi Bankası & Yaşam Döngüsü Ansiklopedisi (`/encyclopedia`)
- **6 Ürün Grubu:** Çelik Tel Halatlar & Sapanlar, Grade 80/100/120 Zincir Sapanlar, Polyester/Tekstil Sapanlar, Kaldırma Aksesuarları (Mapa, Kanca, Klemens, Radansa), Kaldırma Makineleri (Caraskal, Vinç, Forklift), Özel Ataşmanlar (Travers, Sac Kapma, Manyetik/Vakumlu).
- **7 Yaşam Döngüsü Sekmesi:** Tanım ve Teknik Özellikler, Seçim Kriterleri & Ortam Uyumu, Güvenli Kullanım Kuralları, Bakım & Yağlama, Muhafaza & Depolama, Sahada En Sık Yapılan Hatalar, Muayene & Iskarta Kriterleri (ISO 4309, EN 818-4, EN 1492).
- **3 Rol Perspektifi:** Satıcı, Sapancı/Operatör, İSG/Periyodik Kontrol Uzmanı.
- **Karşılaştırma Matrisi:** İki ekipmanı yan yana koyup Emniyet Katsayısı (SF), WLL aralığı ve sıcaklık sınırlarını kıyaslama.

### 2. İleri Mühendislik ve İSG Hesaplama Motoru (`/calculator`)
Dinamik SVG teknik çizimler ve gerçek trigonometrik formüllerle donatılmış 7 alt hesaplayıcı:
1. **Çok Kollu Sapan Açı, Gerilim ve WLL:** Yük Çarpanı ($K_L = 1 / \cos\beta$), EN 818-4 rijit yük 2-kol kuralı, boğma/sepet çarpanları, 60° üzeri kırmızı alarm.
2. **Asimetrik Yükleme & Ağırlık Merkezi (CoG):** Moment denklemleri ($F_1, F_2$), eğim açısı tespiti, kısaltma kancası tavsiyeleri.
3. **D/d Bükülme Oranı & Kapasite Kaybı:** ISO 4309 tel halat bükülme eğrisi, zincir kenar katsayıları, keskin kenar koruyucu uyarısı.
4. **Dinamik Yük Arttırımı (DAF) & Rüzgar:** EN 13001 DAF katsayıları, Beaufort ölçeği, rüzgar yüzey alanı direnç kuvveti ($F_w$).
5. **Klemens Bağlantısı & Filo Açısı:** EN 13411-5 klemens tork/adet/mesafe matrisi, tambur filo açısı limitleri ($1.5^\circ - 2^\circ$).
6. **Periyodik Kontrol Takvimi:** İş Ekipmanları Yönetmeliği Tablo 2 bazlı muayene periyotları, statik (%125) ve dinamik (%110) yük testi kılavuzu.
7. **Emniyet Katsayısı (SF) & Kapasite Dönüştürücü:** WLL, MBL, SWL ve standart zorunlu SF (4:1, 5:1, 7:1) uygunluk kontrolü.

### 3. Mevzuat ve Uluslararası Standartlar Rehberi (`/standards`)
- **Türk Mevzuatı:** 6331 Sayılı Kanun, İş Ekipmanları Yönetmeliği (EK-I, EK-II, EK-III Tablo 2), Makine Emniyeti Yönetmeliği (2006/42/AT).
- **Uluslararası Standartlar:** TS EN 818, TS EN 13414, TS EN 1492, TS EN 1677, ISO 4309, ASME B30 Serisi, LEEA COPSULE, Birleşik Krallık LOLER 1998.
- **4'lü Hukuki Karşılaştırma:** İşveren sorumlulukları, kontrol periyotları, işaretleme/CE, iskarta kriterleri matrisi.
- **Görsel Renk Kodlama ve Etiket Rehberi:** Tekstil sapan tonaj renkleri, periyodik kontrol saha çeyrek dönem renk bantları.

### 4. Multimodal AI Danışman & Hata Denetimi (`/ai-consultant`)
- **4 Özel Görev Modu:**
  1. Akıllı Ekipman Seçimi & Bağlama Planlayıcı (RAG Mantığı)
  2. Görsel Kusur Denetimi & Hurda Karar Destek Sistemi (Kamera/Görsel Yükleme - ISO 4309 tel kırığı / deformasyon analizi)
  3. Sapanlama Yöntemi Denetimi & İSG Bilirkişi Modu
  4. Öngörücü Risk ve Aşınma Tahmini
- **Hibrit Çevrimdışı Yedek:** İnternet bağlantısı veya API anahtarı olmadığında gömülü mühendislik kurallarıyla çalışan offline uzman analizi üretir.

### 5. Anlık Çıktı & Rapor Merkezi (`/export-center`)
- **1. Teknik Bilgi Föyü (PDF):** %100 Türkçe UTF-8 uyumlu, resmi yasal feragatnameli ve A4 yazdırma formatı.
- **2. Markdown (.md) / Word Uyumlu İndirme:** UTF-8 BOM (`\uFEFF`) gömülü doküman.
- **3. WhatsApp / E-Posta Panoya Kopyalama:** Sahaya tek tıkla mesaj atılabilecek emojili özet.
- **4. İnternetsiz QR Kod Paylaşımı:** Sahada kamerayla doğrudan okunabilen istemci taraflı SVG QR matrisi.

---

## 🚀 Kurulum ve Yerel Çalıştırma

### Gereksinimler
- **Node.js:** v18.18.0 veya üzeri (v20+ önerilir)
- **Paket Yöneticisi:** npm veya pnpm

### 1. Bağımlılıkları Yükleme
```bash
npm install
```

### 2. Geliştirme Sunucusunu Başlatma
```bash
npm run dev
```
Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine gidin.

### 3. Production Derlemesi
```bash
npm run build
npm run start
```

---

## 📱 PWA Olarak Yayınlama ve Sahada Yükleme

Uygulama tam uyumlu bir PWA (Progressive Web App) olarak yapılandırılmıştır:
1. `public/manifest.json` ve `public/sw.js` (Service Worker v2) mevcuttur.
2. Web sitesi HTTPS üzerinden servis edildiğinde Chrome, Edge veya Safari'de adres çubuğundaki **"Uygulamayı Yükle"** butonuna basarak doğrudan ana ekrana ikon olarak ekleyebilirsiniz.
3. Uygulama yüklendikten sonra cihaz uçak moduna alınsa bile tüm hesaplamalar ve ekipman bankası tam hızda çalışmaya devam eder.

---

## 📲 Capacitor ile Android & iOS Native Uygulama (APK / IPA)

Proje Capacitor 6 mimarisiyle yerel mobil paketlemeye hazır hale getirilmiştir (`capacitor.config.ts`).

### 1. Android Projesi Oluşturma ve Derleme
```bash
# Bağımlılıkları derle ve Capacitor'a eşitle
npm run cap:build

# Android platformunu ekle (ilk defa çalıştırırken)
npx cap add android

# Android Studio'yu aç
npm run cap:android
```
Android Studio açıldığında:
- Menüden **Build > Build Bundle(s) / APK(s) > Build APK(s)** seçeneğiyle doğrudan sahada test edilebilir `.apk` dosyanızı oluşturabilirsiniz.

### 2. iOS Projesi Oluşturma (macOS gerektirir)
```bash
npx cap add ios
npm run cap:ios
```
Xcode açılarak doğrudan fiziksel iPhone/iPad'e veya App Store TestFlight'a dağıtılabilir.

---

## ⚖️ Yasal Uyarı
Bu yazılım, sahada kaldırma operasyonlarında karar destek, geometri ve gerilim analizi, hasar tespiti ve İSG farkındalığı amacıyla üretilmiş teknik bir danışmanlık uygulamasıdır. Sahadaki tüm fiziki kaldırmalarda yürürlükteki mevzuat (6331 Sayılı İSG Kanunu) ve üretici talimatları esastır; kaldırma operasyonları yetkili Kaldırma Sorumlusu (Appointed Person) ve A/B/C sınıfı İSG Uzmanı gözetiminde yürütülmelidir.
