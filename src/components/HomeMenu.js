
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
        </Tab.Navigator>
    );
}

export default HomeMenu;
