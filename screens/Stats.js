import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { analyzePlayer } from '../utils/aiHelper';

export default function Stats() {
  const dummyPlayer = {
    injuryHistory: 'Diz sakatlığı, omuz çıkığı',
    medicalConditions: 'Astım'
  };

  const ai = analyzePlayer(dummyPlayer);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>İstatistik ve Analiz</Text>

      <View style={styles.card}>
        <Text style={styles.title}>🏃‍♂️ Sporcu Hazır Olma Skoru:</Text>
        <Text style={styles.value}>87 / 100</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>⚕️ Risk Skoru (sakatlık tekrarı):</Text>
        <Text style={styles.value}>{ai.riskScore} / 100</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>📈 Egzersiz Uyumu:</Text>
        <Text style={styles.value}>%90</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>🤖 Yapay Zeka Analizi:</Text>
        {ai.risks.map((r, i) => (
          <Text key={`risk-${i}`} style={styles.ai}>⚠️ {r}</Text>
        ))}
        {ai.suggestions.map((s, i) => (
          <Text key={`sugg-${i}`} style={styles.ai}>✅ {s}</Text>
        ))}
      </View>
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
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  value: {
    fontSize: 18,
    color: '#004080'
  },
  ai: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#333',
    marginTop: 4
  }
});
