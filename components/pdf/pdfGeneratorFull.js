import { captureRef } from 'react-native-view-shot';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { analyzePlayer } from '../aiHelper';
import { evaluateReturnToSport } from '../returnToSportHelper';
import { generateDevelopmentPlan } from '../developmentHelper';

export async function generateFullPDF(player, riskChartRef, scat6ChartRef) {
  const { risks, suggestions } = analyzePlayer(player);
  const returnStatus = evaluateReturnToSport(player);
  const developmentPlan = generateDevelopmentPlan(player);

  let riskChartBase64 = '';
  let scat6ChartBase64 = '';

  if (riskChartRef?.current) {
    const base64 = await captureRef(riskChartRef.current, {
      format: 'png',
      quality: 0.8,
      result: 'base64'
    });
    riskChartBase64 = base64;
  }

  if (scat6ChartRef?.current) {
    const base64 = await captureRef(scat6ChartRef.current, {
      format: 'png',
      quality: 0.8,
      result: 'base64'
    });
    scat6ChartBase64 = base64;
  }

  const scat6Html = player.scat6History?.length
    ? player.scat6History.map(entry => `<li>${entry.date}: Skor ${entry.symptomScore}</li>`).join('')
    : '<li>Henüz kayıtlı SCAT6 verisi yok.</li>';

  const developmentHtml = developmentPlan.length
    ? developmentPlan.map(item => `<li>${item}</li>`).join('')
    : '<li>Öneri bulunamadı.</li>';

  const html = `
  <html>
    <head><meta charset="UTF-8" /><style>body{font-family:Arial;padding:20px;}h1{color:#00205b;}</style></head>
    <body>
      <h1>TeamHealth Pro - Oyuncu Sağlık Raporu</h1>

      <h2>📋 Oyuncu Bilgileri</h2>
      <ul>
        <li><strong>İsim:</strong> ${player.name}</li>
        <li><strong>Pozisyon:</strong> ${player.position}</li>
        <li><strong>Forma No:</strong> ${player.number || 'Belirtilmemiş'}</li>
      </ul>

      <h2>⚠️ Risk Analizi</h2>
      <ul>
        ${risks.map(risk => `<li>${risk}</li>`).join('')}
      </ul>

      <h2>✅ Tedavi / Egzersiz Önerileri</h2>
      <ul>
        ${suggestions.map(sug => `<li>${sug}</li>`).join('')}
      </ul>

      <h2>🧠 SCAT6 Skor Geçmişi</h2>
      <ul>
        ${scat6Html}
      </ul>

      <h2>📊 Risk Grafiği</h2>
      ${riskChartBase64 ? `<img src="data:image/png;base64,${riskChartBase64}" style="width:100%; max-width:400px;" />` : '<p>Grafik bulunamadı.</p>'}

      <h2>📈 SCAT6 Skor Gelişimi</h2>
      ${scat6ChartBase64 ? `<img src="data:image/png;base64,${scat6ChartBase64}" style="width:100%; max-width:400px;" />` : '<p>Grafik bulunamadı.</p>'}

      <h2>🏀 Spora Dönüş Durumu</h2>
      <p><strong>${returnStatus}</strong></p>

      <h2>📈 Kişisel Gelişim Planı</h2>
      <ul>
        ${developmentHtml}
      </ul>

      <footer style="margin-top:40px; font-size:12px; color:gray;">
        Bu rapor TeamHealth Pro Medical tarafından oluşturulmuştur.
      </footer>
    </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}
