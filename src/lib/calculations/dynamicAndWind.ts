import { DynamicWindInput, DynamicWindOutput } from './types';

export function calculateDynamicAndWind(input: DynamicWindInput): DynamicWindOutput {
  const { staticLoadTon, operationType, windSpeedMs, windAreaM2, dragCoefficientCd } = input;

  // 1. Dynamic Amplification Factor (DAF / EN 13001-2 & DNV)
  let daf = 1.25;
  if (operationType === 'precision') {
    daf = 1.10; // Slow, controlled VFD hoist
  } else if (operationType === 'normal') {
    daf = 1.25; // Standard industrial indoor/yard crane
  } else if (operationType === 'harsh') {
    daf = 1.45; // Snatch lifting, abrupt braking, rough ground
  } else if (operationType === 'offshore') {
    daf = 1.70; // Offshore marine vessel heave
  }

  const totalDynamicLoadTon = staticLoadTon * daf;
  const dynamicAdditionalForceKn = (totalDynamicLoadTon - staticLoadTon) * 9.80665;

  // 2. Aerodynamic Wind Force (EN 1991-1-4)
  // q = 0.5 * rho * v^2 where rho = 1.225 kg/m^3
  const v = Math.max(0, windSpeedMs);
  const rho = 1.225;
  const windPressurePa = 0.5 * rho * Math.pow(v, 2);

  // Fw = q * A * Cd (in Newtons)
  const area = Math.max(0, windAreaM2);
  const cd = Math.max(0.1, dragCoefficientCd);
  const windForceN = windPressurePa * area * cd;
  const windForceKn = windForceN / 1000;
  const windForceTon = windForceN / 9806.65;

  const windSpeedKmh = v * 3.6;

  // Beaufort Scale approximation
  let beaufort = 0;
  let bTr = 'Sakin (Rüzgarsız)';
  let bEn = 'Calm';

  if (v <= 0.2) { beaufort = 0; bTr = '0 Bft: Sakin'; bEn = '0 Bft: Calm'; }
  else if (v <= 1.5) { beaufort = 1; bTr = '1 Bft: Esinti başlangıcı'; bEn = '1 Bft: Light air'; }
  else if (v <= 3.3) { beaufort = 2; bTr = '2 Bft: Hafif esinti'; bEn = '2 Bft: Light breeze'; }
  else if (v <= 5.4) { beaufort = 3; bTr = '3 Bft: Tatlı meltem'; bEn = '3 Bft: Gentle breeze'; }
  else if (v <= 7.9) { beaufort = 4; bTr = '4 Bft: Orta rüzgar'; bEn = '4 Bft: Moderate breeze'; }
  else if (v <= 10.7) { beaufort = 5; bTr = '5 Bft: Sert meltem'; bEn = '5 Bft: Fresh breeze'; }
  else if (v <= 13.8) { beaufort = 6; bTr = '6 Bft: Kuvvetli rüzgar'; bEn = '6 Bft: Strong breeze'; }
  else if (v <= 17.1) { beaufort = 7; bTr = '7 Bft: Fırtınamsı rüzgar'; bEn = '7 Bft: Near gale'; }
  else if (v <= 20.7) { beaufort = 8; bTr = '8 Bft: Fırtına'; bEn = '8 Bft: Gale'; }
  else { beaufort = 9; bTr = '9+ Bft: Şiddetli fırtına'; bEn = '9+ Bft: Severe gale'; }

  // Wind Safety Classification
  let windAlertLevel: 'green' | 'amber' | 'red' = 'green';
  let adviceTr = 'Rüzgar hızı güvenli limitlerdedir. Kaldırma planına uygun devam edilebilir.';
  let adviceEn = 'Wind velocity within safe limits. Hoisting operations may proceed as planned.';

  if (v >= 20) {
    windAlertLevel = 'red';
    adviceTr = 'KIRMIZI ALARM: Rüzgar hızı 20 m/s (72 km/h) üzerinde! Yasal İSG ve üretici normları gereği TÜM KALDIRMA OPERASYONLARI DERHAL DURDURULMALIDIR. Bom park pozisyonuna alınmalıdır.';
    adviceEn = 'RED STOP ALERT: Wind speed exceeds 20 m/s (72 km/h)! All lifting operations must CEASE immediately. Lower loads and safe crane boom.';
  } else if (v >= 14) {
    windAlertLevel = 'amber';
    adviceTr = 'SARI İKAZ: Rüzgar hızı 14 - 20 m/s aralığında! Geniş yüzeyli yüklerin (sac, konteyner, kalıp) salınım riski aşırı yüksektir. Çift kılavuz halatı (tagline) zorunludur.';
    adviceEn = 'AMBER CAUTION: Wind speed between 14 - 20 m/s! High load sail area swing hazard. Dual taglines mandatory; postpone large panel lifts.';
  } else if (v >= 10) {
    adviceTr = 'Rüzgar hissedilir seviyede (10 - 14 m/s). Kılavuz halat (tagline) ile yönlendirme yapılmalıdır.';
    adviceEn = 'Noticeable wind (10 - 14 m/s). Use taglines to maintain load rotational control.';
  }

  return {
    daf: parseFloat(daf.toFixed(2)),
    totalDynamicLoadTon: parseFloat(totalDynamicLoadTon.toFixed(3)),
    dynamicAdditionalForceKn: parseFloat(dynamicAdditionalForceKn.toFixed(2)),
    windPressurePa: parseFloat(windPressurePa.toFixed(1)),
    windForceKn: parseFloat(windForceKn.toFixed(2)),
    windForceTon: parseFloat(windForceTon.toFixed(3)),
    windSpeedKmh: parseFloat(windSpeedKmh.toFixed(1)),
    beaufortScale: beaufort,
    beaufortDescription: { tr: bTr, en: bEn },
    windAlertLevel,
    windActionAdvice: { tr: adviceTr, en: adviceEn },
  };
}
