import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as Print from 'expo-print';
import { Alert } from 'react-native';
import QRCode from 'qrcode';

export async function generateAndSharePDF(player) {
  Alert.alert(
    'İmza Ekleme',
    'PDF raporuna imzanız eklensin mi?',
    [
      {
        text: 'Hayır',
        onPress: () => createPDF(player, false),
        style: 'cancel'
      },
      {
        text: 'Evet',
        onPress: () => createPDF(player, true)
      }
    ]
  );
}

async function createPDF(player, includeSignature) {
  const reportId = `THP-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*900+100)}`;
  const qrText = `TeamHealthPro-RaporID:${reportId}`;
  const qrBase64 = await QRCode.toDataURL(qrText);

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
        </style>
      </head>
      <body>
        <h1>TeamHealth Pro - Diyet ve Sağlık Raporu</h1>
        <h2>Oyuncu Bilgileri</h2>
        <ul>
          <li><strong>İsim:</strong> \${player.name || 'N/A'}</li>
          <li><strong>Sakatlık:</strong> \${player.injuryHistory}</li>
          <li><strong>Hastalık:</strong> \${player.medicalConditions}</li>
          <li><strong>Beslenme:</strong> \${player.diet}</li>
        </ul>

        <h2>Yapay Zeka Destekli Öneriler</h2>
        <ul>
          \${player.suggestions.map(s =>
            `<li>\${s.replaceAll('ş','s').replaceAll('ğ','g').replaceAll('ı','i').replaceAll('ö','o').replaceAll('ç','c').replaceAll('ü','u')}</li>`
          ).join('')}
        </ul>

        <p><strong>Rapor ID:</strong> \${reportId}</p>

        \${includeSignature ? `
        <div class="signature">
          Saygılarımla,<br />
          <strong>Doç. Dr. Mehmet Yalçınozan</strong><br />
          Fenerbahçe Beko Basketball Medical Team
        </div>` : ''}

        <div class="qrcode">
          <p style="font-size: 12px;">Bu rapor QR kod ile dijital doğrulama amaçlı oluşturulmuştur.</p>
          <img src="\${qrBase64}" width="120" />
        </div>

        <p class="footer">
          Bu rapor TeamHealth Pro uygulaması tarafından \${new Date().toLocaleDateString('tr-TR')} tarihinde oluşturulmuştur.
        </p>
      </body>
    </html>
  `;

  const { uri } = await Print.printToFileAsync({ html });
  await Sharing.shareAsync(uri);
}