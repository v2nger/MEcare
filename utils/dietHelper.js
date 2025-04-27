export function getDietSuggestions(player) {
  const suggestions = [];

  const isVegan = player.diet?.toLowerCase().includes('vegan');
  const isVegetarian = player.diet?.toLowerCase().includes('vegetarian');
  const doesFast = player.diet?.toLowerCase().includes('oruç');

  const injury = player.injuryHistory?.toLowerCase() || '';
  const medical = player.medicalConditions?.toLowerCase() || '';

  if (isVegan) {
    suggestions.push('Bitkisel protein kaynakları artırılmalı (mercimek, nohut, tofu)');
  } else if (isVegetarian) {
    suggestions.push('Süt ürünleri ve yumurta ile protein dengesi sağlanmalı');
  }

  if (doesFast) {
    suggestions.push('Oruç süresince sıvı alımına dikkat edilmeli');
  }

  if (injury.includes('kemik') || injury.includes('kırık')) {
    suggestions.push('Kalsiyum ve D vitamini yönünden zengin diyet uygulanmalı');
  }

  if (medical.includes('astım')) {
    suggestions.push('İnflamasyonu azaltan omega-3 kaynakları eklenmeli');
  }

  return suggestions;
}
