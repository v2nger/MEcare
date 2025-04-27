import React, { forwardRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PlayerList from '../screens/PlayerList';
import AttendanceTracker from '../screens/AttendanceTracker';
import Diet from '../screens/Diet';
import Stats from '../screens/Stats';
import Profile from '../screens/Profile';
import Settings from '../screens/Settings';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Oyuncular') {
            iconName = 'people';
          } else if (route.name === 'Katılım') {
            iconName = 'calendar';
          } else if (route.name === 'Diyet') {
            iconName = 'restaurant';
          } else if (route.name === 'İstatistik') {
            iconName = 'stats-chart';
          } else if (route.name === 'Profilim') {
            iconName = 'person';
          } else if (route.name === 'Ayarlar') {
            iconName = 'settings';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tab.Screen name="Oyuncular" component={PlayerList} />
      <Tab.Screen name="Katılım" component={AttendanceTracker} />
      <Tab.Screen name="Diyet" component={Diet} />
      <Tab.Screen name="İstatistik" component={Stats} />
      <Tab.Screen name="Profilim" component={Profile} />
      <Tab.Screen name="Ayarlar" component={Settings} />
    </Tab.Navigator>
  );
}
