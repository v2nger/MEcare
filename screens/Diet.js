import React from 'react';
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { getDietSuggestions } from '../utils/dietHelper';
import { generateFullPDF } from '../utils/pdf/pdfGeneratorFull';

export default function Diet() {
  const player = {
    injuryHistory: 'Kemik kırığı, diz sakatlığı',
    medicalConditions: 'Astım',
    diet: 'Vegan ve aralıklı oruç'
  };

  const suggestions = getDietSuggestions(player);
  player.suggestions = suggestions; // PDF için ekleniyor

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Diyet Öneri Motoru</Text>

      <View style={styles.card}>
        <Text style={styles.subtitle}>Kişisel Beslenme Profili:</Text>
        <Text style={styles.detail}>• {player.diet}</Text>
        <Text style={styles.detail}>• Sakatlık: {player.injuryHistory}</Text>
        <Text style={styles.detail}>• Hastalık: {player.medicalConditions}</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.subtitle}>🍽️ Yapay Zeka Diyet Önerileri:</Text>
        {suggestions.map((item, i) => (
          <Text key={i} style={styles.suggestion}>✅ {item}</Text>
        ))}
      </View>

      <Button title="PDF Olarak Paylaş" onPress={() => generateFullPDF(player)} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffff00',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#0000ff',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#ffffcc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10
  },
  detail: {
    fontSize: 14,
    color: '#444',
    marginBottom: 4
  },
  suggestion: {
    fontSize: 15,
    color: '#2e7d32',
    marginBottom: 5
  }
});
