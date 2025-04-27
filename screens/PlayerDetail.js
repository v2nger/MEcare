import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Button, TextInput } from 'react-native';
import Slider from '@react-native-community/slider';
import { analyzePlayer } from '../utils/aiHelper';
import RiskChart from '../components/RiskChart';
import SCAT6Chart from '../components/SCAT6Chart';
import { generateFullPDF } from '../utils/pdf/pdfGeneratorFull';
import { evaluateReturnToSport } from '../utils/returnToSportHelper';
import { generateDevelopmentPlan } from '../utils/developmentHelper';

export default function PlayerDetail({ route, navigation }) {
  const riskChartRef = useRef();
  const scat6ChartRef = useRef();
  const { player: initialPlayer, setPlayers } = route.params;
  const [player, setPlayer] = useState({ ...initialPlayer });

  const { risks, suggestions } = analyzePlayer(player);

  const [trainingLoad, setTrainingLoad] = useState(player.trainingLoad || 0);
  const [sleepQuality, setSleepQuality] = useState(player.sleepQuality || 7);
  const [stressLevel, setStressLevel] = useState(player.stressLevel || 5);

  if (!player.scat6History) player.scat6History = [];

  const getLatestSCAT6Status = () => {
    if (!player.scat6History.length) return null;
    const latest = player.scat6History[player.scat6History.length - 1];
    return latest.symptomScore <= 22 ? 'Hazır' : 'Elverişsiz';
  };

  const updatePlayer = () => {
    setPlayers((prevPlayers) =>
      prevPlayers.map((p) => (p.name === player.name ? { ...player, trainingLoad, sleepQuality, stressLevel } : p))
    );
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{player.name}</Text>

      <TextInput
        style={styles.input}
        placeholder="Adı"
        value={player.name}
        onChangeText={(text) => setPlayer({ ...player, name: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Forma Numarası"
        value={player.jerseyNumber}
        onChangeText={(text) => setPlayer({ ...player, jerseyNumber: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Pozisyon"
        value={player.position}
        onChangeText={(text) => setPlayer({ ...player, position: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Sakatlık Geçmişi"
        value={player.injuryHistory}
        onChangeText={(text) => setPlayer({ ...player, injuryHistory: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Tıbbi Durumlar"
        value={player.medicalConditions}
        onChangeText={(text) => setPlayer({ ...player, medicalConditions: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Beslenme"
        value={player.diet}
        onChangeText={(text) => setPlayer({ ...player, diet: text })}
      />

      <Text style={styles.subtitle}>Antrenman Yükü (saat/hafta)</Text>
      <TextInput
        style={styles.input}
        value={String(trainingLoad)}
        onChangeText={(text) => setTrainingLoad(parseInt(text) || 0)}
      />

      <Text style={styles.subtitle}>Uyku Kalitesi (1-10)</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={sleepQuality}
        onValueChange={(value) => setSleepQuality(value)}
      />
      <Text>{sleepQuality}</Text>

      <Text style={styles.subtitle}>Stres Seviyesi (1-10)</Text>
      <Slider
        style={{ width: 200, height: 40 }}
        minimumValue={1}
        maximumValue={10}
        step={1}
        value={stressLevel}
        onValueChange={(value) => setStressLevel(value)}
      />
      <Text>{stressLevel}</Text>

      <Button title="Kaydet" onPress={updatePlayer} />

      <Text style={styles.subtitle}>⚠️ Risk Analizi</Text>
      {risks.map((risk, i) => <Text key={i}>• {risk}</Text>)}

      <Text style={styles.subtitle}>✅ Tedavi / Egzersiz Önerileri</Text>
      {suggestions.map((s, i) => <Text key={i}>- {s}</Text>)}

      <Text style={styles.subtitle}>📊 Risk Dağılımı</Text>
      <RiskChart ref={riskChartRef} data={[
        { title: 'Diz', value: player.injuryHistory.toLowerCase().includes('diz') ? 80 : 20 },
        { title: 'Omuz', value: player.injuryHistory.toLowerCase().includes('omuz') ? 70 : 15 },
        { title: 'Ayak Bileği', value: player.injuryHistory.toLowerCase().includes('ayak bileği') ? 65 : 10 }
      ]} />

      <Text style={styles.subtitle}>📈 SCAT6 Skor Gelişimi</Text>
      <SCAT6Chart ref={scat6ChartRef} history={player.scat6History} />

      <View style={{ marginTop: 20 }}>
        <Button title="PDF Olarak Paylaş" onPress={() => generateFullPDF(player)} />
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.subtitle}>🧠 SCAT6 Geçmişi</Text>
        {getLatestSCAT6Status() && (
          <View style={[
            styles.statusBox,
            { backgroundColor: getLatestSCAT6Status() === 'Hazır' ? '#4caf50' : '#f44336' }
          ]}>
            <Text style={styles.statusText}>
              {getLatestSCAT6Status() === 'Hazır' ? '🟢 Oynamaya Hazır' : '🔴 Oynamaya Elverişsiz'}
            </Text>
          </View>
        )}
        {player.scat6History.length === 0 ? (
          <Text>Henüz SCAT6 testi yapılmamış.</Text>
        ) : (
          player.scat6History.map((entry, index) => (
            <Text key={index}>
              {entry.date}: Skor {entry.symptomScore}
            </Text>
          ))
        )}
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.subtitle}>🏀 Spora Dönüş Durumu:</Text>
        <Text>{evaluateReturnToSport(player)}</Text>
      </View>

      <View style={{ marginTop: 30 }}>
        <Text style={styles.subtitle}>🤖 AI Destekli Egzersiz Planı</Text>
        {generateDevelopmentPlan(player).length > 0 ? (
          generateDevelopmentPlan(player).map((item, index) => (
            <Text key={index}>• {item}</Text>
          ))
        ) : (
          <Text>Şu anda önerilen özel bir gelişim planı bulunmamaktadır.</Text>
        )}
      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#ffff00' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  subtitle: { marginTop: 15, fontSize: 18, fontWeight: '600' },
  statusBox: { padding: 10, marginVertical: 10, borderRadius: 10 },
  statusText: { color: '#fff', fontSize: 16, fontWeight: 'bold', textAlign: 'center' },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
});