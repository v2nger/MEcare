export function generateSuggestions(player) {
    const suggestions = [];
  
    if (!player) {
      return ["Veri bulunamadı."];
    }
  
    // Risk skoruna göre öneriler
    if (player.riskScore >= 80) {
      suggestions.push("Sağlık kontrolü için mutlaka bir doktora görünün.");
    } else if (player.riskScore >= 50) {
      suggestions.push("Hafif egzersiz programı uygulayın ve durumu izleyin.");
    } else {
      suggestions.push("Mevcut antrenman programına devam edebilirsiniz.");
    }
  
    // SCAT6 skorlarına göre öneriler
    if (player.scat6 && player.scat6.symptomScore > 15) {
      suggestions.push("Belirtiler ciddi, dinlenme süresi artırılmalı.");
    } else if (player.scat6 && player.scat6.symptomScore > 5) {
      suggestions.push("Belirtiler mevcut, aktivite seviyesi azaltılmalı.");
    } else {
      suggestions.push("Belirti skoru düşük, normal aktivite sürdürülebilir.");
    }
  
    // Katılım sayısına göre öneriler
    if (player.attendance && player.attendance.length < 3) {
      suggestions.push("Daha fazla antrenman seansına katılmanız önerilir.");
    }
  
    return suggestions;
  }
  