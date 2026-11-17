import { SlingTensionInput, SlingTensionOutput } from './types';

export function calculateSlingTension(input: SlingTensionInput): SlingTensionOutput {
  const { totalLoadKg, legCount, hitchType, inputMode, verticalAngleDeg, slingLengthM, distanceBetweenPointsM } = input;

  let beta = verticalAngleDeg;

  // If dimension mode is selected: calculate beta from geometry
  if (inputMode === 'dimensions' && slingLengthM && distanceBetweenPointsM && slingLengthM > 0) {
    const halfSpan = distanceBetweenPointsM / 2;
    if (halfSpan < slingLengthM) {
      const sinBeta = halfSpan / slingLengthM;
      beta = (Math.asin(sinBeta) * 180) / Math.PI;
    } else {
      beta = 90; // Overly flat / impossible triangle
    }
  }

  // Sanitize angle
  beta = Math.max(0, Math.min(89, beta));
  const betaRad = (beta * Math.PI) / 180;
  const includedAngle = beta * 2;

  // Load Factor: KL = 1 / cos(beta)
  const loadFactor = 1 / Math.cos(betaRad);

  const totalWeightTon = totalLoadKg / 1000;
  const totalWeightKn = totalWeightTon * 9.80665;

  // Effective load-bearing legs based on EN 818-4 / EN 13414 rigid load rule
  let effectiveLegs = 1;
  if (legCount === 1) effectiveLegs = 1;
  else if (legCount === 2) effectiveLegs = 2;
  else if (legCount === 3) effectiveLegs = 2; // Rigid load rule
  else if (legCount === 4) effectiveLegs = 2; // Rigid load: 2 legs carry the weight, 2 balance

  // Hitch factor
  let hitchMultiplier = 1.0;
  if (hitchType === 'choker') {
    hitchMultiplier = 0.8;
  } else if (hitchType === 'basket') {
    hitchMultiplier = 2.0;
  }

  // Tension per leg / part
  // If basket hitch, load is shared over 2x support loops per effective leg
  const effectiveDivider = hitchType === 'basket' ? effectiveLegs * 2 : effectiveLegs;
  const tensionPerLegTon = (totalWeightTon / effectiveDivider) * loadFactor;
  const tensionPerLegKn = tensionPerLegTon * 9.80665;

  // Recommended WLL accounting for hitch derating
  const recommendedWllPerLegTon = tensionPerLegTon / (hitchType === 'choker' ? 0.8 : 1.0);

  const isDangerousAngle = beta > 60; // Included angle > 120°
  const isCriticalWarning = beta > 45 && beta <= 60;

  let statusTr = 'Sapan açısı güvenli çalışma aralığındadır (0° - 45°).';
  let statusEn = 'Sling angle is within normal safe operating envelope (0° - 45°).';

  let warningNoticeTr = undefined;
  let warningNoticeEn = undefined;

  if (isDangerousAngle) {
    statusTr = 'TEHLİKE: Düşey açı 60° (Tepe açısı 120°) üzerinde! KULLANIM KESİNLİKLE YASAKTIR.';
    statusEn = 'DANGER: Vertical angle exceeds 60° (included angle > 120°)! Rigging strictly prohibited.';
    warningNoticeTr = 'Açı 60° üzerine çıktığında gerilim kuvveti katlanarak artar. Daha uzun sapan (L) veya kaldırma traversi (spreader beam) kullanınız.';
    warningNoticeEn = 'Leg tensions escalate exponentially beyond 60°. Use longer sling legs or a spreader beam.';
  } else if (isCriticalWarning) {
    statusTr = 'DİKKAT: Düşey açı 45° - 60° aralığında. Kollar üzerinde yüksek ilave gerilim mevcuttur.';
    statusEn = 'CAUTION: Vertical angle between 45° and 60°. Substantial tension amplification present.';
  }

  if (legCount >= 3) {
    const rigidNoteTr = ' (EN 818-4 / EN 13414 uyarınca rijit yüklerde 3 ve 4 kollu sapanlarda yükün sadece 2 kol tarafından taşındığı kabul edilmiştir).';
    const rigidNoteEn = ' (Per EN 818-4 / EN 13414, on rigid loads only 2 legs are assumed to bear the load).';
    statusTr += rigidNoteTr;
    statusEn += rigidNoteEn;
  }

  return {
    loadFactor: parseFloat(loadFactor.toFixed(3)),
    totalWeightTon: parseFloat(totalWeightTon.toFixed(3)),
    totalWeightKn: parseFloat(totalWeightKn.toFixed(2)),
    effectiveLegs,
    tensionPerLegKn: parseFloat(tensionPerLegKn.toFixed(2)),
    tensionPerLegTon: parseFloat(tensionPerLegTon.toFixed(3)),
    recommendedWllPerLegTon: parseFloat(recommendedWllPerLegTon.toFixed(3)),
    calculatedAngleDeg: parseFloat(beta.toFixed(1)),
    includedAngleDeg: parseFloat(includedAngle.toFixed(1)),
    isDangerousAngle,
    isCriticalWarning,
    statusMessage: { tr: statusTr, en: statusEn },
    warningNotice: warningNoticeTr ? { tr: warningNoticeTr, en: warningNoticeEn! } : undefined,
  };
}
