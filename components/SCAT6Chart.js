import React, { forwardRef } from 'react';
import { View, Dimensions, Text, StyleSheet } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

const SCAT6Chart = forwardRef(({ history }, ref) => {
  if (!history || history.length === 0) {
    return (
      <View style={styles.container} ref={ref}>
        <Text style={styles.noDataText}>SCAT6 geçmiş verisi bulunamadı.</Text>
      </View>
    );
  }

  const labels = history.map(item => item.date);
  const scores = history.map(item => item.symptomScore);

  return (
    <View style={styles.container} ref={ref}>
      <Text style={styles.title}>📈 SCAT6 Skor Gelişimi</Text>
      <LineChart
        data={{
          labels,
          datasets: [{ data: scores }]
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        yAxisSuffix=""
        yAxisInterval={10}
        chartConfig={{
          backgroundColor: '#fefefe',
          backgroundGradientFrom: '#fefefe',
          backgroundGradientTo: '#fefefe',
          decimalPlaces: 0,
          color: (opacity = 1) => `rgba(0, 32, 91, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
          propsForDots: { r: '5', strokeWidth: '2', stroke: '#00205b' }
        }}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16
        }}
      />
    </View>
  );
});

export default SCAT6Chart;

const styles = StyleSheet.create({
  container: { alignItems: 'center', marginTop: 20 },
  title: { fontSize: 18, fontWeight: 'bold', color: '#00205b', marginBottom: 10 },
  noDataText: { fontSize: 16, color: 'gray', marginTop: 20 }
});
