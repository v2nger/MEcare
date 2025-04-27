export function evaluateReturnToSport(player) {
    if (!player || !player.injuryHistory) return '⚪ Bilinmiyor';
    
    const latestSCAT6 = player.scat6History?.[player.scat6History.length - 1];
  
    if (!latestSCAT6) return '⚪ Eksik veri';
  
    if (latestSCAT6.symptomScore <= 10 && player.treatment && player.treatment.toLowerCase().includes('tamamlandı')) {
      return '🟢 Spora Dönüş İçin Hazır';
    } else if (latestSCAT6.symptomScore <= 22) {
      return '🟠 İzlenmeli ve Yeniden Değerlendirilmeli';
    } else {
      return '🔴 Spora Dönüşe Uygun Değil';
    }
  }
  