import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function SCAT6Summary({ route, navigation }) {
  const { results, player } = route.params;

  const totalSymptomsScore = results.symptoms.reduce((acc, curr) => acc + curr, 0);

  const generatePDF = async () => {
    const html = `
    <html>
      <head><meta charset="UTF-8" /><style>body{font-family:Arial;padding:20px;}h1{color:#00205b;}</style></head>
      <body>
        <h1>🧠 SCAT6 Raporu</h1>
        <h2>Toplam Semptom Skoru</h2>
        <p><strong>${totalSymptomsScore}</strong> / 132</p>
        <h2>Bilişsel Test Yanıtları</h2>
        <ul>
          <li><strong>Yönelim:</strong> ${results.orientation}</li>
          <li><strong>Anlık Hafıza:</strong> ${results.memory}</li>
          <li><strong>Konsantrasyon:</strong> ${results.concentration}</li>
        </ul>
        <p style="margin-top: 40px; font-size: 12px; color: gray;">Bu değerlendirme TeamHealth Pro tarafından oluşturulmuştur.</p>
      </body>
    </html>
    `;

    const { uri } = await Print.printToFileAsync({ html });
    await Sharing.shareAsync(uri);
  };

  const saveScat6Result = async () => {
    try {
      if (!player.scat6History) {
        player.scat6History = [];
      }

      player.scat6History.push({
        date: new Date().toLocaleDateString('tr-TR'),
        symptomScore: totalSymptomsScore,
        orientation: results.orientation,
        memory: results.memory,
        concentration: results.concentration
      });

      const playersData = await AsyncStorage.getItem('players');
      const players = playersData ? JSON.parse(playersData) : [];

      const updatedPlayers = players.map(p => p.id === player.id ? player : p);
      await AsyncStorage.setItem('players', JSON.stringify(updatedPlayers));

      Alert.alert('Başarılı', 'SCAT6 sonucu sporcu profiline kaydedildi.');
      navigation.navigate('PlayerDetail', { player });
    } catch (error) {
      console.error('Hata:', error);
      Alert.alert('Hata', 'Veri kaydedilirken bir sorun oluştu.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>📝 SCAT6 Özet</Text>
      <Text style={styles.section}>Toplam Semptom Skoru: <Text style={styles.bold}>{totalSymptomsScore} / 132</Text></Text>
      <Text style={styles.section}>Yönelim: {results.orientation}</Text>
      <Text style={styles.section}>Hafıza: {results.memory}</Text>
      <Text style={styles.section}>Konsantrasyon: {results.concentration}</Text>

      <View style={{ marginTop: 20 }}>
        <Button title="PDF Olarak Paylaş" onPress={generatePDF} />
      </View>
      <View style={{ marginTop: 20 }}>
        <Button title="Sonucu Oyuncu Profiline Kaydet" onPress={saveScat6Result} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#00205b', marginBottom: 20 },
  section: { fontSize: 16, marginBottom: 10 },
  bold: { fontWeight: 'bold' }
});
