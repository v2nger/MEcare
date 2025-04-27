import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Medical() {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Medikal Bilgiler</Text>

      <View style={styles.card}>
        <Text style={styles.title}>Hastalık Geçmişi</Text>
        <Text>Hipertansiyon, Astım</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Sakatlık Geçmişi</Text>
        <Text>Ön çapraz bağ (2019), Omuz çıkığı (2022)</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Alerjiler</Text>
        <Text>Penisilin, Deniz ürünleri</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.title}>Mevcut Tedavi Planı</Text>
        <Text>Omuz kuvvetlendirme egzersizleri, NSAİİ kullanımı</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
    padding: 20
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#00205b'
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#444'
  }
});
