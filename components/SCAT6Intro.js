import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

export default function SCAT6Intro({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🧠 SCAT6 - Sarsıntı Değerlendirme</Text>
      <Text style={styles.text}>
        Bu değerlendirme aracı, bir sporcunun olası beyin sarsıntısı sonrası belirtilerini analiz etmek için kullanılır.
      </Text>
      <Text style={styles.text}>
        Lütfen testi dikkatle tamamlayın. Bu ekran yalnızca bilgilendirme amaçlıdır ve klinik tanı yerine geçmez.
      </Text>
      <Button title="Devam Et" onPress={() => navigation.navigate('SCAT6Symptoms')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00205b',
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    marginBottom: 15
  }
});
