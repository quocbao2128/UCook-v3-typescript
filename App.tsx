import 'react-native-gesture-handler';
import React, { useCallback } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackNavigator } from './src/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './src/screens/Onboarding';
import { useFonts, Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

// De chay bang may ao android, chay lenh: 
// npm run android

const Stack = createNativeStackNavigator();

const App = () => {
  // chi hien thi cac trang onboarding khi chay app lan dau
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>();
  const [fontsLoaded] = useFonts({
    Nunito_400Regular,
    Nunito_600SemiBold,
  })

  React.useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();

    async function setData() {
      const appData = await AsyncStorage.getItem("appLaunched");
      if (appData == null) {
        setFirstLaunch(true);
        AsyncStorage.setItem("appLaunched", "false");
      } else {
        setFirstLaunch(false);
      }
    }
    setData();
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
    firstLaunch != null && (
      <NavigationContainer onReady={onLayoutRootView}>
        {firstLaunch && (
          <Stack.Screen
            name="Onboarding"
            component={Onboarding}
          />
        )}
        <MainStackNavigator></MainStackNavigator>
      </NavigationContainer>
    )
  );
}

export default App