import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Button, Modal, TextInput } from 'react-native';
import { analyzePlayer } from '../utils/aiHelper';
import { useNavigation } from '@react-navigation/native';

const initialPlayers = [
  {
    name: 'Ali Koç',
    injuryHistory: 'Ön çapraz bağ, ayak bileği burkulması',
    medicalConditions: 'Astım',
    jerseyNumber: '1',
    position: 'Pivot',
    diet: 'Vejetaryen',
    trainingLoad: 15,
    sleepQuality: 7,
    stressLevel: 5,
  },
  {
    name: 'Mikael Jantunen',
    injuryHistory: 'Omuz sakatlığı',
    medicalConditions: '',
    jerseyNumber: '666',
    position: 'Forvet',
    diet: 'Aralıklı oruç',
    trainingLoad: 25,
    sleepQuality: 5,
    stressLevel: 8,
  }
];

export default function PlayerList() {
  const navigation = useNavigation();
  const [players, setPlayers] = useState(initialPlayers);
  const [modalVisible, setModalVisible] = useState(false);
  const [newPlayer, setNewPlayer] = useState({
    name: '',
    injuryHistory: '',
    medicalConditions: '',
    jerseyNumber: '',
    position: '',
    diet: '',
    trainingLoad: 0,
    sleepQuality: 7,
    stressLevel: 5,
  });

  const addPlayer = () => {
    setPlayers([...players, newPlayer]);
    setNewPlayer({
      name: '',
      injuryHistory: '',
      medicalConditions: '',
      jerseyNumber: '',
      position: '',
      diet: '',
      trainingLoad: 0,
      sleepQuality: 7,
      stressLevel: 5,
    });
    setModalVisible(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={players}
        keyExtractor={(item) => item.name}
        contentContainerStyle={{ padding: 20 }}
        renderItem={({ item, index }) => {
          const { risks } = analyzePlayer(item);
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('PlayerDetail', { player: item, index, setPlayers })}
              style={styles.card}
            >
              <Text style={styles.name}>{item.name}</Text>
              <Text>Pozisyon: {item.position}</Text>
              <Text>Risk Sayısı: {risks.length}</Text>
            </TouchableOpacity>
          );
        }}
      />
      <Button title="Yeni Oyuncu Ekle" onPress={() => setModalVisible(true)} />

      <Modal
        visible={modalVisible}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Yeni Oyuncu Ekle</Text>
          <TextInput
            style={styles.input}
            placeholder="Adı"
            value={newPlayer.name}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Forma Numarası"
            value={newPlayer.jerseyNumber}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, jerseyNumber: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Pozisyon"
            value={newPlayer.position}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, position: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Sakatlık Geçmişi"
            value={newPlayer.injuryHistory}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, injuryHistory: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Tıbbi Durumlar"
            value={newPlayer.medicalConditions}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, medicalConditions: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Beslenme"
            value={newPlayer.diet}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, diet: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Antrenman Yükü (saat/hafta)"
            value={String(newPlayer.trainingLoad)}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, trainingLoad: parseInt(text) || 0 })}
          />
          <TextInput
            style={styles.input}
            placeholder="Uyku Kalitesi (1-10)"
            value={String(newPlayer.sleepQuality)}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, sleepQuality: parseInt(text) || 7 })}
          />
          <TextInput
            style={styles.input}
            placeholder="Stres Seviyesi (1-10)"
            value={String(newPlayer.stressLevel)}
            onChangeText={(text) => setNewPlayer({ ...newPlayer, stressLevel: parseInt(text) || 5 })}
          />
          <Button title="Ekle" onPress={addPlayer} />
          <Button title="İptal" onPress={() => setModalVisible(false)} />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffcc',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    elevation: 2
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});