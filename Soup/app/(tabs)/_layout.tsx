import { Tabs } from "expo-router";
import React from 'react';
import { StatusBar } from 'react-native';

export default function RootLayout() {
  return (
  <Tabs screenOptions={{
    headerShown:false,
    tabBarStyle: {backgroundColor: "#121725", height: 50, borderTopWidth:2, borderColor: 'white'},
    tabBarActiveTintColor: 'white',
    tabBarActiveBackgroundColor: '#192841',
    tabBarLabelStyle: {
      fontSize: 14,
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: [{ translateX: -30 }, { translateY: -6 }],
    },
    tabBarIcon: () => null,
  }}>
      <Tabs.Screen
        name="index"
        options={{title: 'Overview'}}
      />
      <Tabs.Screen
        name="courses"
        options={{title: 'Courses' }}
      />
      <Tabs.Screen
        name="calendar"
        options={{title: 'Calendar'}}
      />
  </Tabs>
  );
}
