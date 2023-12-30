import 'react-native-gesture-handler';
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { MainStackNavigator } from './src/navigation/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Onboarding from './src/screens/Onboarding';
import Home from './src/screens/Home';

//* De chay bang may ao android, chay lenh: 
//* npm run android

const Stack = createNativeStackNavigator();

const App = () => {
  // return (
  //   <NavigationContainer>
  //     <MainStackNavigator></MainStackNavigator>
  //   </NavigationContainer>
  // );

  //! chua on dinh
  //! chi hien thi cac trang onboarding khi chay app lan dau
  const [firstLaunch, setFirstLaunch] = React.useState<boolean>();
  React.useEffect(() => {
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

  return (
    firstLaunch != null && (
      <NavigationContainer>
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