import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { Slider } from '@rneui/themed';

const symptomsList = [
  'Baş ağrısı', 'Basınç hissi', 'Boyun ağrısı', 'Bulantı / kusma', 'Baş dönmesi',
  'Sersemlik', 'Gözlerde bulanıklık', 'Işığa hassasiyet', 'Sese hassasiyet', 'Halsizlik',
  'Uyuşma / karıncalanma', 'Tuhaf hissetme', 'Unutkanlık', 'Duygusal değişkenlik',
  'Sinirlilik', 'Üzgün hissetme', 'Endişeli olma', 'Uykulu hissetme', 'Uyuma güçlüğü',
  'Yorgunluk', 'Yoğun düşünememe', 'Denge problemleri'
];

export default function SCAT6Symptoms({ navigation }) {
  const [symptoms, setSymptoms] = useState(Array(symptomsList.length).fill(0));

  const updateSymptom = (index, value) => {
    const newSymptoms = [...symptoms];
    newSymptoms[index] = value;
    setSymptoms(newSymptoms);
  };

  const handleNext = () => {
    navigation.navigate('SCAT6Cognitive', { symptoms });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🧠 Semptom Değerlendirme</Text>
      {symptomsList.map((symptom, index) => (
        <View key={index} style={styles.symptomContainer}>
          <Text style={styles.symptomText}>{symptom}</Text>
          <Slider
            value={symptoms[index]}
            onValueChange={(val) => updateSymptom(index, Math.round(val))}
            minimumValue={0}
            maximumValue={6}
            step={1}
            thumbStyle={{ height: 20, width: 20 }}
          />
          <Text style={{ textAlign: 'center' }}>Skor: {symptoms[index]}</Text>
        </View>
      ))}
      <Button title="Bilişsel Teste Geç" onPress={handleNext} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00205b'
  },
  symptomContainer: {
    marginBottom: 20,
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 8
  },
  symptomText: {
    fontSize: 16,
    marginBottom: 10
  }
});
