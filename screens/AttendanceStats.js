import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AttendanceStats({ route }) {
  const { players } = route.params;
  const [stats, setStats] = useState([]);

  useEffect(() => {
    calculateStats();
  }, []);

  const calculateStats = async () => {
    const data = await AsyncStorage.getItem('attendance');
    const attendance = data ? JSON.parse(data) : {};

    const playerStats = players.map(player => {
      let attended = 0;
      let totalSessions = 0;

      for (let date in attendance) {
        if (attendance[date][player.id] !== undefined) {
          totalSessions++;
          if (attendance[date][player.id]) attended++;
        }
      }

      const percentage = totalSessions > 0 ? Math.round((attended / totalSessions) * 100) : 0;

      return {
        ...player,
        attended,
        totalSessions,
        percentage
      };
    });

    setStats(playerStats);
  };

  const getColor = (percentage) => {
    if (percentage >= 90) return 'green';
    if (percentage >= 75) return 'orange';
    return 'red';
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Katılım İstatistikleri</Text>

      {stats.map(player => (
        <View key={player.id} style={styles.playerBox}>
          <Text style={styles.playerName}>{player.name}</Text>
          <Text style={{ color: getColor(player.percentage) }}>
            {player.attended} / {player.totalSessions} antrenman (%{player.percentage})
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20, color: '#00205b' },
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
