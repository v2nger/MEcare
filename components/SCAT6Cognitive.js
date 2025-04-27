import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';

export default function SCAT6Cognitive({ route, navigation }) {
  const { symptoms } = route.params;
  const [orientation, setOrientation] = useState('');
  const [memory, setMemory] = useState('');
  const [concentration, setConcentration] = useState('');

  const handleFinish = () => {
    const results = {
      symptoms,
      orientation,
      memory,
      concentration
    };
    navigation.navigate('SCAT6Summary', { results });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 Bilişsel Fonksiyonlar</Text>

      <Text style={styles.label}>1. Yönelim (Tarih, Gün, Ay, Yıl, Saat):</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 25 Nisan 2025, Perşembe"
        value={orientation}
        onChangeText={setOrientation}
      />

      <Text style={styles.label}>2. Anlık Hafıza (Kelime hatırlama):</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: Elma, Masa, Kedi, Bardak, Kalem"
        value={memory}
        onChangeText={setMemory}
      />

      <Text style={styles.label}>3. Konsantrasyon (Sayıları geriye doğru yazın):</Text>
      <TextInput
        style={styles.input}
        placeholder="Örn: 7-4-2-9-3"
        value={concentration}
        onChangeText={setConcentration}
      />

      <Button title="Sonuçları Gör" onPress={handleFinish} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#00205b' },
  label: { fontSize: 16, marginTop: 15, marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    padding: 10,
    marginBottom: 10
  }
});
