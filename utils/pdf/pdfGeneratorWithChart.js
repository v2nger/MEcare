import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { captureRef } from 'react-native-view-shot';
import { Alert } from 'react-native';
import QRCode from 'qrcode';

export async function generatePDFWithChart(player, chartRef) {
  Alert.alert(
    'İmza Ekleme',
    'PDF raporuna imzanız eklensin mi?',
    [
      {
        text: 'Hayır',
        onPress: () => createPDF(player, chartRef, false),
        style: 'cancel'
      },
      {
        text: 'Evet',
        onPress: () => createPDF(player, chartRef, true)
      }
    ]
  );
}

async function createPDF(player, chartRef, includeSignature) {
  const { risks, suggestions } = player.analysis || {};
  const base64ChartImage = await captureRef(chartRef, {
    format: 'png',
    quality: 0.8,
    result: 'base64'
  });

  const qrText = `TeamHealthPro-${player.name}-${Date.now()}`;
  const qrBase64 = await QRCode.toDataURL(qrText);

  const html = `
  <html>
    <head>
      <meta charset="UTF-8">
      <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #00205b; }
        h2 { color: #33691e; }
        ul { padding-left: 20px; }
        .footer { margin-top: 30px; font-size: 12px; color: #777; }
        .qrcode { margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>TeamHealth Pro - Oyuncu Sağlık Raporu</h1>
      <h2>Oyuncu Bilgileri</h2>
      <ul>
        <li><strong>İsim:</strong> ${player.name}</li>
        <li><strong>Pozisyon:</strong> ${player.position}</li>
        <li><strong>Geçmiş Sakatlık:</strong> ${player.injuryHistory}</li>
      </ul>

      <h2>⚠️ Risk Analizi</h2>
      <ul>
        ${(risks || []).map(r => `<li>⚠️ ${r}</li>`).join('')}
      </ul>

      <h2>✅ Önerilen Önlemler</h2>
      <ul>
        ${(suggestions || []).map(s => `<li>✅ ${s}</li>`).join('')}
      </ul>

      <h2>📊 Risk Grafiği</h2>
      <img src="data:image/png;base64,${base64ChartImage}" width="300" />

      ${includeSignature ? `
      <div class="signature" style="margin-top: 50px;">
        <p>Saygılarımla,</p>
        <p><strong>Doç. Dr. Mehmet Yalçınozan</strong><br />Fenerbahçe Beko Basketball Medical Team</p>
      </div>` : ''}

      <div class="qrcode">
        <p>QR ile dijital erişim:</p>
        <img src="${qrBase64}" width="100" />
      </div>

      <p class="footer">Bu rapor TeamHealth Pro tarafından ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.</p>
    </body>
  </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}
