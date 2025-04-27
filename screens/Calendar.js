import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Takvim & Tedavi</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📅 Yaklaşan Randevu:</Text>
        <Text style={styles.text}>26 Nisan 2025 - 14:00 | MRI Görüntüleme</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>💊 Aktif Tedavi:</Text>
        <Text style={styles.text}>Sağ diz fizik tedavisi | Haftada 3 seans</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>📝 Notlar:</Text>
        <Text style={styles.text}>Tedavi sonrası denge testleri planlanacak.</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff9f0',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00205b',
    marginBottom: 20
  },
  card: {
    backgroundColor: '#ffffff',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 2
  },
  label: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5
  },
  text: {
    fontSize: 15,
    color: '#333'
  }
});
