import 'react-native-gesture-handler';
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MainStackNavigator } from './src/navigation/StackNavigator';

const Stack = createNativeStackNavigator();

const App = () => {
  //! chua on dinh
  // const [firstLaunch, setFirstLaunch] = React.useState(null);
  // React.useEffect(() => {
  //   async function setData() {
  //     const appData = await AsyncStorage.getItem("appLaunched");
  //     if (appData == null) {
  //       setFirstLaunch(true);
  //       AsyncStorage.setItem("appLaunched", "false");
  //     } else {
  //       setFirstLaunch(false);
  //     }
  //   }
  //   setData();
  // }, []);

  // return (
  //   firstLaunch != null && (
  //     <NavigationContainer>
  //       <Stack.Navigator>
  //         {firstLaunch && (
  //           <Stack.Screen
  //             options={{ headerShown: false }}
  //             name="Onboarding"
  //             component={Onboarding}
  //           />
  //         )}
  //         <Stack.Screen name="Home" component={Home} />
  //       </Stack.Navigator>
  //     </NavigationContainer>
  //   )
  // );
  return (
    <NavigationContainer>
      <MainStackNavigator></MainStackNavigator>
    </NavigationContainer>
  );
}
export default App
