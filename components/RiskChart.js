import React, { forwardRef } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { BarChart } from 'react-native-chart-kit';

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffff00',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 32, 91, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const RiskChart = forwardRef(({ data }, ref) => {
  const labels = data.map(d => d.title);
  const values = data.map(d => d.value);

  return (
    <View ref={ref}>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginVertical: 10 }}>
        Sağlık Risk Dağılımı
      </Text>
      <BarChart
        data={{
          labels,
          datasets: [{ data: values }],
        }}
        width={Dimensions.get('window').width - 40}
        height={220}
        chartConfig={chartConfig}
        fromZero
        showValuesOnTopOfBars
      />
    </View>
  );
});

export default RiskChart;
