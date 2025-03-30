import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { createTamagui,TamaguiProvider, View } from 'tamagui'; 
import { defaultConfig } from '@tamagui/config/v4'; 


// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();
const config = createTamagui(defaultConfig); 
type Conf = typeof config; 

declare module '@tamagui/core' {
  interface TamaguiCustomConfig extends Conf {}
}

export default function RootLayout() {

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
      return null;
  }

  return (
    <TamaguiProvider config={config}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

        <Stack.Screen 
          name="(modals)/bench" 
          options={{ 
            presentation: 'modal',
            animation: 'fade',
            headerShown: true, 
            headerTitle: 'Bench' }} 
          />
          <Stack.Screen 
          name="(modals)/deadlift" 
          options={{ 
            presentation: 'modal',
            animation: 'fade',
            headerShown: true, 
            headerTitle: 'Deadlift' }} 
          />
          <Stack.Screen 
          name="(modals)/squat" 
          options={{ 
            presentation: 'modal',
            animation: 'fade',
            headerShown: true, 
            headerTitle: 'Squat' }} 
          />

      </Stack>
    </TamaguiProvider>     
    
  );
}
