import { router, Stack, useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import 'react-native-reanimated';
import { createTamagui,TamaguiProvider, Theme, View } from 'tamagui'; 
import config from '@/tamagui.config';
import { GestureHandlerRootView, TouchableOpacity } from 'react-native-gesture-handler';
import supabase from '@/utility/supabaseClient';
import ErrorBoundary from '@/ErrorBoundary';


export default function RootLayout() {
  const router = useRouter(); 
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

  useEffect(() => {
    console.log("starting authorization")
    const checkSession = async() =>{
      const {data} = await supabase.auth.getSession(); 
      //check if there is data, if data.session is not null, double exclaimatin mark turns the non-null object to a boolean value, which is what we want
      setIsLoggedIn(!!data.session)

      if (data.session){
        router.replace('/add') //if logging in is ok, redirect user to /add
      }
    }

    checkSession(); 

    // Listen for auth changes (login/logout)
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);//'!!' turns object into boolean value
      if (session) {
        router.replace('/add'); // Redirect if logged in
      } else {
        router.replace('/login'); // Go back to login screen if logged out
      }
    });
    
    return () => {authListener?.subscription?.unsubscribe()};
  }, []);

return (
  
    <RootLayoutNav />
  
);
  
}

function RootLayoutNav() {

  return (

    <TamaguiProvider config={config}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <Theme name={"dark_blue"}>
  
          <Stack>
            <Stack.Screen 
                name="login"
                options={{
                  presentation: 'modal',
                  title: 'Log in or sign up',}}  
              />
            
              {/*show main tabs screen*/}
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              {/*show modals screen*/}
              <Stack.Screen 
                name="(modals)/bench" 
                options={{ 
                  presentation: 'modal',
                  animation: 'fade',
                  headerShown: false }} 
                />
                <Stack.Screen 
                name="(modals)/deadlift" 
                options={{ 
                  presentation: 'modal',
                  animation: 'fade',
                  headerShown: false }} 
                />
                <Stack.Screen 
                name="(modals)/squat" 
                options={{ 
                  presentation: 'modal',
                  animation: 'fade',
                  headerShown:false }} 
                />
    
          </Stack>
        </Theme>
        </GestureHandlerRootView>
    </TamaguiProvider>     
    
  );
}
