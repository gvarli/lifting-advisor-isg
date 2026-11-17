import { AsymmetricCoGInput, AsymmetricCoGOutput } from './types';

export function calculateAsymmetricCoG(input: AsymmetricCoGInput): AsymmetricCoGOutput {
  const { totalLoadTon, totalDistanceD, d1, slingLengthL1, slingLengthL2 } = input;

  const validD = Math.max(0.1, totalDistanceD);
  const clampedD1 = Math.max(0, Math.min(validD, d1));
  const d2 = validD - clampedD1;

  // Moment Equations:
  // F1 * D = W * d2 => F1 = W * (d2 / D)
  // F2 * D = W * d1 => F2 = W * (d1 / D)
  const loadShare1Ton = totalLoadTon * (d2 / validD);
  const loadShare2Ton = totalLoadTon * (clampedD1 / validD);

  const percentageLeg1 = totalLoadTon > 0 ? (loadShare1Ton / totalLoadTon) * 100 : 50;
  const percentageLeg2 = totalLoadTon > 0 ? (loadShare2Ton / totalLoadTon) * 100 : 50;

  const heaviestLegTon = Math.max(loadShare1Ton, loadShare2Ton);

  // Recommended sling WLL: Must be selected according to the HEAVIEST leg with min safety factor
  const recommendedSlingWllTon = heaviestLegTon * 1.15; // +15% dynamic headroom

  // Calculate tilt angle if sling lengths differ or CoG is offset
  let tiltAngleDeg = 0;
  if (slingLengthL1 > 0 && slingLengthL2 > 0) {
    const deltaL = slingLengthL2 - slingLengthL1;
    const sinTilt = deltaL / validD;
    if (Math.abs(sinTilt) <= 1) {
      tiltAngleDeg = (Math.asin(sinTilt) * 180) / Math.PI;
    } else {
      tiltAngleDeg = deltaL > 0 ? 90 : -90;
    }
  }

  const isTilted = Math.abs(tiltAngleDeg) > 5 || Math.abs(percentageLeg1 - 50) > 20;

  let warningTr = 'Yük dengeli dağılmıştır; kollar neredeyse eşit yük taşımaktadır.';
  let warningEn = 'Load is symmetrically balanced; sling legs share nearly equal tension.';

  if (Math.abs(percentageLeg1 - 50) > 30) {
    warningTr = `KRİTİK ASİMETRİ: Yükün %${Math.round(Math.max(percentageLeg1, percentageLeg2))}'i tek bir kola biniyor! Sapanlar eşit seçilirse aşırı yüklenmeden kopma riski doğar. Kısaltma kancasıyla CoG kancanın tam altına getirilmelidir.`;
    warningEn = `CRITICAL ASYMMETRY: ${Math.round(Math.max(percentageLeg1, percentageLeg2))}% of load is concentrated on a single leg! Use shortening clutch to plumb crane hook directly over CoG.`;
  } else if (isTilted) {
    warningTr = 'YÜKTE EĞİM/DENGESİZLİK: Yük askıda yatay kalmayacaktır. Bacak boyları ayarlanarak kanca ağırlık merkezinin (CoG) üzerine hizalanmalıdır.';
    warningEn = 'TILT HAZARD: Load will not hang level in air. Adjust sling lengths so hook is directly above CoG.';
  }

  return {
    d2: parseFloat(d2.toFixed(2)),
    loadShare1Ton: parseFloat(loadShare1Ton.toFixed(3)),
    loadShare2Ton: parseFloat(loadShare2Ton.toFixed(3)),
    percentageLeg1: parseFloat(percentageLeg1.toFixed(1)),
    percentageLeg2: parseFloat(percentageLeg2.toFixed(1)),
    heaviestLegTon: parseFloat(heaviestLegTon.toFixed(3)),
    recommendedSlingWllTon: parseFloat(recommendedSlingWllTon.toFixed(3)),
    isTilted,
    tiltAngleDeg: parseFloat(tiltAngleDeg.toFixed(1)),
    equilibriumWarning: { tr: warningTr, en: warningEn },
  };
}
