import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../screens/Home";
import Onboarding from '../screens/Onboarding';
import DishList from "../screens/DishList";
import Recipe from "../screens/Recipe";
import CameraCaptureNote from "../screens/CameraCaptureNote";
import NotIdentifiable from "../screens/NotIdentifiable";

const Stack = createStackNavigator();

const MainStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="CameraCaptureNote" component={CameraCaptureNote} />
            <Stack.Screen name="DishList" component={DishList} />
            <Stack.Screen name="NotIdentifiable" component={NotIdentifiable} />
            <Stack.Screen name="Recipe" component={Recipe} />
        </Stack.Navigator>
    );
}

export { MainStackNavigator };
