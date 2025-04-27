export function generateDevelopmentPlan(player) {
    const plan = [];
  
    if (!player) return ['Veri eksik.'];
  
    // Pozisyon bazlı öneriler
    if (player.position?.toLowerCase().includes('guard')) {
      plan.push('Hız ve çeviklik antrenmanlarına ağırlık verin.');
      plan.push('Core stabilizasyon egzersizleri uygulayın.');
    } else if (player.position?.toLowerCase().includes('forvet')) {
      plan.push('Patlayıcı güç çalışmalarına önem verin.');
      plan.push('Omuz kuvvetlendirme egzersizleri planlayın.');
    } else if (player.position?.toLowerCase().includes('pivot') || player.position?.toLowerCase().includes('center')) {
      plan.push('Diz ve kalça çevresi kuvvetlendirme programı uygulayın.');
      plan.push('Postür ve denge çalışmaları yapın.');
    }
  
    // Sakatlık geçmişine göre öneriler
    if (player.injuryHistory?.toLowerCase().includes('diz')) {
      plan.push('Diz çevresi kaslarını güçlendirmek için özel kuvvet ve mobilite programı uygulanmalı.');
    }
    if (player.injuryHistory?.toLowerCase().includes('omuz')) {
      plan.push('Omuz sakatlığı sonrası rotator cuff güçlendirme programı uygulanmalı.');
    }
    if (player.injuryHistory?.toLowerCase().includes('ayak bileği')) {
      plan.push('Ayak bileği propriosepsiyon ve denge egzersizlerine önem verilmeli.');
    }
  
    // SCAT6 semptomlarına göre ek uyarılar
    if (player.scat6History && player.scat6History.length > 0) {
      const latest = player.scat6History[player.scat6History.length - 1];
      if (latest.symptomScore > 22) {
        plan.push('Kafa travması sonrası reaksiyon zamanı ve koordinasyon çalışmaları artırılmalı.');
      }
    }
  
    // Genel sezon tavsiyeleri
    plan.push('Sezon boyunca düzenli stretching protokolleri uygulayın.');
    plan.push('Kas kütlesi korumak için direnç antrenmanları yapın.');
    plan.push('Her 8 haftada bir performans testi yaparak gelişimi izleyin.');
  
    return plan;
  }
  