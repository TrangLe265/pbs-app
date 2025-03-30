import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import  Colors from '../../constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  
  return (
    //layout of the main bottom tab navigation 
    <Tabs
      screenOptions={{
      headerShown: true,
      tabBarButton: HapticTab,
      tabBarBackground: TabBarBackground,
      tabBarStyle: Platform.select({
      ios: {
      // Use a transparent background on iOS to show the blur effect
      position: 'absolute',
      },
      default: {},
      }),
      }}>
      <Tabs.Screen
      name="index"
      options={{
      title: 'Records',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="doc.text.fill" color={color} />,
      }}
      />
      <Tabs.Screen
      name="add"
      options={{
      title: 'Add New',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="plus.circle.fill" color={color} />,
      }}
      />
      <Tabs.Screen
      name="profile"
      options={{
      title: 'Profile',
      tabBarIcon: ({ color }) => <IconSymbol size={28} name="person.crop.circle.fill" color={color} />,
      }}
      />
    </Tabs>
  );
}
