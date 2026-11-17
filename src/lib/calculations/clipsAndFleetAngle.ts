import { ClipsFleetInput, ClipsFleetOutput } from './types';

export function calculateClipsAndFleetAngle(input: ClipsFleetInput): ClipsFleetOutput {
  const { ropeDiameterMm, drumType, drumWidthMm, distanceToSheaveMm } = input;

  const d = Math.max(3, ropeDiameterMm);

  // 1. Module A: EN 13411-5 / US Fed Spec FF-C-450 Clip Matrix
  let minClipCount = 3;
  let tighteningTorqueNm = 10;
  let turnbackLengthMm = 120;

  if (d <= 5) {
    minClipCount = 3;
    tighteningTorqueNm = 9.5;
    turnbackLengthMm = 120;
  } else if (d <= 8) {
    minClipCount = 4;
    tighteningTorqueNm = 20;
    turnbackLengthMm = 160;
  } else if (d <= 10) {
    minClipCount = 4;
    tighteningTorqueNm = 33;
    turnbackLengthMm = 200;
  } else if (d <= 12) {
    minClipCount = 4;
    tighteningTorqueNm = 49;
    turnbackLengthMm = 250;
  } else if (d <= 16) {
    minClipCount = 4;
    tighteningTorqueNm = 88;
    turnbackLengthMm = 300;
  } else if (d <= 20) {
    minClipCount = 4;
    tighteningTorqueNm = 130;
    turnbackLengthMm = 380;
  } else if (d <= 22) {
    minClipCount = 5;
    tighteningTorqueNm = 175;
    turnbackLengthMm = 450;
  } else if (d <= 26) {
    minClipCount = 5;
    tighteningTorqueNm = 230;
    turnbackLengthMm = 550;
  } else if (d <= 32) {
    minClipCount = 6;
    tighteningTorqueNm = 360;
    turnbackLengthMm = 700;
  } else {
    minClipCount = 7;
    tighteningTorqueNm = 490;
    turnbackLengthMm = 900;
  }

  const clipSpacingMm = 6 * d; // 6d distance between clips

  // 2. Module B: Drum Fleet Angle
  // alpha = arctan( (W/2) / L ) * (180 / pi)
  const halfWidth = Math.max(10, drumWidthMm / 2);
  const distanceL = Math.max(50, distanceToSheaveMm);
  const fleetAngleRad = Math.atan(halfWidth / distanceL);
  const fleetAngleDeg = (fleetAngleRad * 180) / Math.PI;

  const maxPermissibleAngleDeg = drumType === 'grooved' ? 2.0 : 1.5;
  const isFleetAngleCompliant = fleetAngleDeg <= maxPermissibleAngleDeg;

  let adviceTr = '';
  let adviceEn = '';

  if (isFleetAngleCompliant) {
    adviceTr = `Sapma açısı (${fleetAngleDeg.toFixed(2)}°) sınır değer olan ${maxPermissibleAngleDeg}° altında ve standartlara uygundur.`;
    adviceEn = `Fleet angle (${fleetAngleDeg.toFixed(2)}°) is within the standard limit of ${maxPermissibleAngleDeg}°.`;
  } else {
    adviceTr = `KRİTİK AÇI AŞIMI: Sapma açısı (${fleetAngleDeg.toFixed(2)}°), ${drumType === 'grooved' ? 'yivli/kanallı' : 'düz'} tamburlar için izin verilen azami ${maxPermissibleAngleDeg}° sınırını aşıyor! Halat tambur kanallarından atlayabilir ve makara flanşlarını keser. İlk yönlendirme makarasını tamburdan uzaklaştırınız.`;
    adviceEn = `CRITICAL ANGLE EXCEEDED: Fleet angle (${fleetAngleDeg.toFixed(2)}°) exceeds the ${maxPermissibleAngleDeg}° limit for ${drumType} drums! Wire rope will climb sheave flanges or cross-spool on drum. Increase distance between sheave and drum.`;
  }

  return {
    minClipCount,
    clipSpacingMm: Math.round(clipSpacingMm),
    tighteningTorqueNm,
    turnbackLengthMm,
    fleetAngleDeg: parseFloat(fleetAngleDeg.toFixed(2)),
    maxPermissibleAngleDeg,
    isFleetAngleCompliant,
    fleetAngleAdvice: { tr: adviceTr, en: adviceEn },
  };
}
