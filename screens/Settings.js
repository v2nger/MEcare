import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

export default function Settings() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Ayarlar & Hakkında</Text>

      <View style={styles.card}>
        <Text style={styles.label}>📱 Uygulama Adı:</Text>
        <Text style={styles.text}>MEcare Team Medic Pro</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🧠 Geliştirici:</Text>
        <Text style={styles.text}>Dr. Mehmet Yalçınozan</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.label}>🔄 Versiyon:</Text>
        <Text style={styles.text}>v1.0.0 (Beta)</Text>
      </View>
    </View>
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
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5
  },
  text: {
    fontSize: 15,
    color: '#333'
  },
  link: {
    fontSize: 15,
    color: '#007bff',
    textDecorationLine: 'underline'
  }
});
