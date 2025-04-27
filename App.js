import React, { createContext, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './components/TabNavigator';
import PlayerDetail from './screens/PlayerDetail';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { registerRootComponent } from 'expo';
import SCAT6Intro from './components/SCAT6Intro';
import SCAT6Symptoms from './components/SCAT6Symptoms';
import SCAT6Cognitive from './components/SCAT6Cognitive';
import SCAT6Summary from './components/SCAT6Summary';
import ErrorBoundary from './components/ErrorBoundary';

const Stack = createNativeStackNavigator();


const ThemeContext = createContext({
  primaryColor: '#007AFF',
  backgroundColor: '#FFFFFF',
  });

function App() {
  return (
    <Provider store={store}> 
      <ThemeContext.Provider value={{ primaryColor: '#007AFF', backgroundColor: '#FFFFFF' }}>
        <ErrorBoundary> 
          <NavigationContainer>
            <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: true }}>
              <Stack.Screen name="Home" component={TabNavigator} options={{ title: 'MEcare Team Medic Pro' }} />
              <Stack.Screen name="PlayerDetail" component={PlayerDetail} options={{ title: 'Sporcu Detay' }} />
              <Stack.Screen name="SCAT6Intro" component={SCAT6Intro} options={{ title: 'SCAT6 Giriş' }} />
              <Stack.Screen name="SCAT6Symptoms" component={SCAT6Symptoms} options={{ title: 'SCAT6 Semptomlar' }} />
              <Stack.Screen name="SCAT6Cognitive" component={SCAT6Cognitive} options={{ title: 'SCAT6 Bilişsel Test' }} />
              <Stack.Screen name="SCAT6Summary" component={SCAT6Summary} options={{ title: 'SCAT6 Özet' }} />
            </Stack.Navigator>
          </NavigationContainer>
        </ErrorBoundary> 
      </ThemeContext.Provider>
    </Provider>
  );
}

export default App;