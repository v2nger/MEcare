import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Alert } from 'react-native';
import QRCode from 'qrcode';
import { captureRef } from 'react-native-view-shot';

export async function generateAndSharePDF(player, riskChartRef, scat6ChartRef) {
  Alert.alert(
    'İmza Ekleme',
    'PDF raporuna imzanız eklensin mi?',
    [
      {
        text: 'Hayır',
        onPress: () => createPDF(player, riskChartRef, scat6ChartRef, false),
        style: 'cancel'
      },
      {
        text: 'Evet',
        onPress: () => createPDF(player, riskChartRef, scat6ChartRef, true)
      }
    ]
  );
}

async function createPDF(player, riskChartRef, scat6ChartRef, includeSignature) {
  const reportId = `THP-${new Date().toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 900 + 100)}`;
  const qrText = `TeamHealthPro-RaporID:${reportId}`;
  const qrBase64 = await QRCode.toDataURL(qrText);

  let riskChartUri = '';
  let scat6ChartUri = '';

  if (riskChartRef?.current && scat6ChartRef?.current) {
    riskChartUri = await captureRef(riskChartRef, { format: 'png', quality: 0.8 });
    scat6ChartUri = await captureRef(scat6ChartRef, { format: 'png', quality: 0.8 });
  }

  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #00205b; }
          h2 { color: #33691e; }
          ul { padding-left: 20px; }
          .footer { margin-top: 40px; font-size: 13px; color: #555; }
          .signature { margin-top: 60px; border-top: 1px solid #ccc; padding-top: 10px; }
          .qrcode { margin-top: 30px; }
          img.chart { margin-top: 15px; width: 100%; max-width: 400px; }
        </style>
      </head>
      <body>
        <h1>TeamHealth Pro - Gelişim Raporu</h1>
        <h2>Oyuncu Bilgileri</h2>
        <ul>
          <li><strong>İsim:</strong> ${player.name || 'N/A'}</li>
          <li><strong>Pozisyon:</strong> ${player.position || 'N/A'}</li>
          <li><strong>Sakatlık:</strong> ${player.injuryHistory || 'N/A'}</li>
          <li><strong>Hastalık:</strong> ${player.medicalConditions || 'N/A'}</li>
          <li><strong>Beslenme:</strong> ${player.diet || 'N/A'}</li>
        </ul>

        <h2>⚡ Yapay Zeka Önerileri</h2>
        <ul>
          ${(player.suggestions || []).map(s => `<li>${s.replace(/ş/g,'s').replace(/ğ/g,'g').replace(/ı/g,'i').replace(/ö/g,'o').replace(/ç/g,'c').replace(/ü/g,'u')}</li>`).join('')}
        </ul>

        ${riskChartUri ? `<h2>📊 Risk Dağılımı</h2><img src="${riskChartUri}" class="chart" />` : ''}
        ${scat6ChartUri ? `<h2>📈 SCAT6 Skor Geçmişi</h2><img src="${scat6ChartUri}" class="chart" />` : ''}

        ${includeSignature ? `
        <div class="signature">
          Saygılarımla,<br/>
          <strong>Doç. Dr. Mehmet Yalçınozan</strong><br/>
          Fenerbahçe Beko Basketball Medical Team
        </div>` : ''}

        <div class="qrcode">
          <p style="font-size: 12px;">Bu rapor QR kod ile dijital doğrulama amaçlı oluşturulmuştur.</p>
          <img src="${qrBase64}" width="120" />
        </div>

        <p class="footer">
          Bu rapor TeamHealth Pro uygulaması tarafından ${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.
        </p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}
