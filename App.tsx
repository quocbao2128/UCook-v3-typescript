import 'react-native-gesture-handler';
import "react-native-reanimated";
import "react-native-safe-area-context";
import "react-native-screens";
import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackNavigator } from './src/navigation/StackNavigator';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// De chay bang may ao android, chay lenh: 
// npm run android

const Stack = createNativeStackNavigator();

const App = () => {
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
  })

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }
  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <MainStackNavigator></MainStackNavigator>
    </NavigationContainer>
  );
}

export default App