import { DdRatioInput, DdRatioOutput } from './types';

export function calculateDdRatio(input: DdRatioInput): DdRatioOutput {
  const { equipmentType, dMm, dCapMm, nominalWllTon } = input;

  const validD = Math.max(0.1, dMm);
  const validDCap = Math.max(0.1, dCapMm);
  const ratioDd = validDCap / validD;

  let efficiencyPercentage = 100;
  let isSharpEdge = false;
  let severity: 'safe' | 'warning' | 'critical' = 'safe';
  let recTr = '';
  let recEn = '';

  if (equipmentType === 'wire_rope') {
    // Standard Wire Rope Bending Efficiency Curve (ISO 4309 / ASME B30.9)
    if (ratioDd >= 25) {
      efficiencyPercentage = 100;
    } else if (ratioDd >= 10) {
      // Linear interpolation between 85% and 100%
      efficiencyPercentage = 85 + ((ratioDd - 10) / 15) * 15;
    } else if (ratioDd >= 5) {
      // Linear interpolation between 75% and 85%
      efficiencyPercentage = 75 + ((ratioDd - 5) / 5) * 10;
    } else if (ratioDd >= 2) {
      // Linear interpolation between 65% and 75%
      efficiencyPercentage = 65 + ((ratioDd - 2) / 3) * 10;
    } else if (ratioDd >= 1) {
      // Linear interpolation between 50% and 65%
      efficiencyPercentage = 50 + (ratioDd - 1) * 15;
    } else {
      // D/d < 1 : Severe bending distortion
      efficiencyPercentage = Math.max(25, ratioDd * 50);
      isSharpEdge = true;
    }

    if (ratioDd < 2) {
      severity = 'critical';
      isSharpEdge = true;
      recTr = 'KRİTİK UYARI: D/d < 2! Halat tel ve demetleri aşırı bükülmeden dolayı kalıcı ezilir ve iç tel kırıkları oluşur. Çapı büyütün veya radansa takın.';
      recEn = 'CRITICAL WARNING: D/d < 2! Extreme bending crushes rope strands causing severe internal fatigue. Increase pin diameter or install a thimble.';
    } else if (ratioDd < 6) {
      severity = 'warning';
      recTr = 'DİKKAT: D/d oranı düşük. Kapasitede belirgin düşüş mevcuttur. Efektif WLL sınırını aşmayınız.';
      recEn = 'CAUTION: Low D/d ratio causes noticeable capacity loss. Do not exceed calculated effective WLL.';
    } else {
      recTr = 'D/d bükülme oranı standartlara uygundur; bükülme kaynaklı hasar riski düşüktür.';
      recEn = 'D/d bending ratio complies with engineering standards; low risk of bending-induced fatigue.';
    }
  } else if (equipmentType === 'chain') {
    // Chain over edges / pins (EN 818-4)
    if (ratioDd >= 2.0) {
      efficiencyPercentage = 100;
      recTr = 'Pim veya kenar çapı bakla çapının 2 katından büyük (D/d ≥ 2); tam anma kapasitesi geçerlidir.';
      recEn = 'Edge radius is greater than double link diameter (D/d ≥ 2); full rated capacity applies.';
    } else if (ratioDd >= 1.0) {
      efficiencyPercentage = 70;
      severity = 'warning';
      recTr = 'DİKKAT: 1 ≤ D/d < 2 aralığında zincir kenarda büküldüğü için WLL değeri %70 seviyesine düşürülmelidir.';
      recEn = 'CAUTION: For 1 ≤ D/d < 2, de-rate chain WLL to 70% due to link bending stress.';
    } else {
      efficiencyPercentage = 50;
      severity = 'critical';
      isSharpEdge = true;
      recTr = 'KESKİN KENAR TEHLİKESİ: D/d < 1! Zincir keskin kenarda bükülüyor (%50 kapasite kaybı). Koruyucu köşe bendi kullanılmazsa bakla kırılabilir!';
      recEn = 'SHARP EDGE DANGER: D/d < 1! Severe link bending (50% capacity loss). Edge protectors mandatory to prevent link fracture!';
    }
  } else {
    // Polyester Slings (EN 1492)
    if (ratioDd >= 3.0) {
      efficiencyPercentage = 100;
      recTr = 'Bükülme yüzeyi geniş ve yumuşak; bez sapan tam kapasite (%100 WLL) ile çalışır.';
      recEn = 'Contact radius is ample; webbing sling operates at 100% nominal WLL.';
    } else if (ratioDd >= 1.0) {
      efficiencyPercentage = 75;
      severity = 'warning';
      recTr = 'DİKKAT: Küçük kanca/pim çapı liflerin kenarlarda sıkışmasına yol açar (%25 kapasite düşümü).';
      recEn = 'CAUTION: Tight radius bunches textile fibers, de-rating capacity by 25%.';
    } else {
      efficiencyPercentage = 40;
      severity = 'critical';
      isSharpEdge = true;
      recTr = 'ÖLÜMCÜL KESİLME RİSKİ: D/d < 1 (Keskin Kenar)! Koruyucu kılıf (sleeve) veya poliüretan köşe koruyucu olmadan KULLANIM KESİNLİKLE YASAKTIR.';
      recEn = 'LETHAL CUT HAZARD: D/d < 1 (Sharp Edge)! Strictly prohibited without cut-resistant polyurethane protection.';
    }
  }

  const capacityLossPercentage = 100 - efficiencyPercentage;
  const effectiveWllTon = nominalWllTon * (efficiencyPercentage / 100);

  return {
    ratioDd: parseFloat(ratioDd.toFixed(2)),
    efficiencyPercentage: parseFloat(efficiencyPercentage.toFixed(1)),
    capacityLossPercentage: parseFloat(capacityLossPercentage.toFixed(1)),
    effectiveWllTon: parseFloat(effectiveWllTon.toFixed(3)),
    isSharpEdge,
    severity,
    recommendation: { tr: recTr, en: recEn },
  };
}
