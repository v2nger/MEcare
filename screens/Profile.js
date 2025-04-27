import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

export default function Profile() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/fenerbahce_logo.png')}
        style={styles.logo}
      />
      <Text style={styles.name}>Dr. Mehmet Yalçınozan</Text>
      <Text style={styles.title}>Takım Doktoru - Fenerbahçe Beko</Text>
      <Text style={styles.subtitle}>Profesyonel Sağlık Takip Uygulaması</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffff00'
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0000ff'
  },
  title: {
    fontSize: 16,
    color: '#555',
    marginTop: 6
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginTop: 4
  }
});
