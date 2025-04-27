import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function AttendanceTracker({ route }) {
  const players = route?.params?.players || [];
  const [attendance, setAttendance] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());

  const loadAttendance = async (loadData) => {
    const data = await AsyncStorage.getItem('attendance');
    if (data) setAttendance(JSON.parse(data));
  };

  const saveAttendance = async (newData) => {
    await AsyncStorage.setItem('attendance', JSON.stringify(newData));
  };

  const toggleAttendance = (playerId) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const updated = { ...attendance };

    if (!updated[dateKey]) updated[dateKey] = {};

    updated[dateKey][playerId] = !updated[dateKey][playerId];

    setAttendance(updated);
    saveAttendance(updated);
  };

  const renderPlayer = (player) => {
    const dateKey = selectedDate.toISOString().split('T')[0];
    const isPresent = attendance[dateKey]?.[player.id];

    return (
      <TouchableOpacity key={player.id} style={styles.playerBox} onPress={() => toggleAttendance(player.id)}>
        <Text style={styles.playerName}>{player.name}</Text>
        <Text style={{ color: isPresent ? 'green' : 'red' }}>
          {isPresent ? 'Katıldı' : 'Katılmadı'}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Antrenman Katılım Takibi</Text>

      <DateTimePicker
        value={selectedDate}
        mode="date"
        display="default"
        onChange={(e, date) => {
          if (date) setSelectedDate(date);
        }}
      />

      <ScrollView style={{ marginTop: 20 }}>
        {players.length > 0 ? players.map(player => renderPlayer(player)) : (
          <Text>Oyuncu bulunamadı.</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#ffff00' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#0000ff' },
  playerBox: {
    padding: 15,
    marginBottom: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  playerName: { fontSize: 16, fontWeight: '600' }
});
