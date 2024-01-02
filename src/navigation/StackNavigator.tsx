import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Onboarding from '../screens/Onboarding';
import DishList from "../screens/DishList";
import Recipe from "../screens/Recipe";
import CameraCaptureNote from "../screens/CameraCaptureNote";
import NotIdentifiable from "../screens/NotIdentifiable";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    const [firstLaunch, setFirstLaunch] = React.useState<boolean>(true);
    React.useEffect(() => {
        const getData = async () => {
            const appData = await AsyncStorage.getItem("appLaunched");
            if (!!appData) {
                setFirstLaunch(false);
            } else {
                AsyncStorage.setItem("appLaunched", "launched");
            }
        }
        getData();
    }, []);
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {firstLaunch && <Stack.Screen
                name="Onboarding"
                component={Onboarding}
            />}
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CameraCaptureNote" component={CameraCaptureNote} />
            <Stack.Screen name="DishList" component={DishList} />
            <Stack.Screen name="NotIdentifiable" component={NotIdentifiable} />
            <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };
