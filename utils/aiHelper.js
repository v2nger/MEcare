export function analyzePlayer(player) {
  const risks = [];
  const suggestions = [];
  let riskScore = 0;

  // Risk faktörleri ve ağırlıkları
  const riskFactors = {
    injuryHistory: { weight: 0.4, keywords: ['ön çapraz bağ', 'ayak bileği', 'omuz'] },
    medicalConditions: { weight: 0.3, keywords: ['astım'] },
    position: { weight: 0.2, keywords: ['pivot'] },
    trainingLoad: { weight: 0.1, value: player.trainingLoad || 0, threshold: 20 },
    sleepQuality: { weight: 0.1, value: player.sleepQuality || 7, threshold: 6 },
    stressLevel: { weight: 0.1, value: player.stressLevel || 5, threshold: 7 },
  };

  const injuryText = player.injuryHistory?.toLowerCase() || '';
  const medicalText = player.medicalConditions?.toLowerCase() || '';
  const positionText = player.position?.toLowerCase() || '';

  // Sakatlık Geçmişi Analizi
  riskFactors.injuryHistory.keywords.forEach(keyword => {
    if (injuryText.includes(keyword)) {
      riskScore += riskFactors.injuryHistory.weight * 5;
      risks.push(`Geçmişte ${keyword} sakatlığı nedeniyle risk artışı.`);
      if (keyword === 'ön çapraz bağ') {
        suggestions.push('Periyodik Cybex testleri önerilir.');
        suggestions.push('Kas kuvvet dengesizlikleri takip edilmelidir.');
      } else if (keyword === 'ayak bileği') {
        suggestions.push('Denge egzersizleri ve proprioseptif eğitim planlanmalı.');
      } else if (keyword === 'omuz') {
        suggestions.push('İtme/çekme kuvvet dengesi kontrol edilmeli.');
      }
    }
  });

  // Tıbbi Durum Analizi
  riskFactors.medicalConditions.keywords.forEach(keyword => {
    if (medicalText.includes(keyword)) {
      riskScore += riskFactors.medicalConditions.weight * 3;
      risks.push(`${keyword} nedeniyle risk artışı.`);
      if (keyword === 'astım') {
        suggestions.push('Solunum fonksiyon testleri planlanmalı.');
      }
    }
  });

  // Pozisyon Analizi
  riskFactors.position.keywords.forEach(keyword => {
    if (positionText.includes(keyword)) {
      riskScore += riskFactors.position.weight * 2;
      suggestions.push('Yüksek temaslı pozisyon nedeniyle ekstra mobilite kontrolü önerilir.');
    }
  });

  // Antrenman Yükü Analizi
  if (player.trainingLoad > riskFactors.trainingLoad.threshold) {
    riskScore += riskFactors.trainingLoad.weight * 4;
    risks.push("Yüksek antrenman yükü nedeniyle aşırı kullanım sakatlığı riski.");
    suggestions.push("Antrenman yükünü azaltın veya dinlenme günlerini artırın.");
  }

  // Uyku Kalitesi Analizi
  if (player.sleepQuality < riskFactors.sleepQuality.threshold) {
    riskScore += riskFactors.sleepQuality.weight * 2;
    risks.push("Düşük uyku kalitesi nedeniyle performans düşüşü ve sakatlık riski.");
    suggestions.push("Uyku hijyenine dikkat edin ve uyku düzeninizi iyileştirin.");
  }

  // Stres Seviyesi Analizi
  if (player.stressLevel > riskFactors.stressLevel.threshold) {
    riskScore += riskFactors.stressLevel.weight * 1;
    risks.push("Yüksek stres seviyesi nedeniyle sakatlık ve performans düşüşü riski.");
    suggestions.push("Stres yönetimi teknikleri uygulayın ve gerekirse profesyonel yardım alın.");
  }

  // Genel Risk Değerlendirmesi
  if (riskScore > 10) {
    risks.push("Genel sakatlık riski yüksek.");
    suggestions.push("Eklem destekleyici egzersizler yapın ve düzenli olarak dinlenin.");
  } else if (riskScore > 5) {
    risks.push("Orta düzeyde sakatlık riski.");
    suggestions.push("Isınma ve soğuma egzersizlerine özen gösterin.");
  } else {
    risks.push("Düşük sakatlık riski.");
    suggestions.push("Sağlıklı yaşam tarzınızı sürdürün.");
  }

  return { risks, suggestions };
}