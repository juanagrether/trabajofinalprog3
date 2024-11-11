
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Login from "../screens/Login";
import Register from "../screens/Register";

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (
        
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Login" component={Login} />
            <Tab.Screen name="Register" component={Register} />
        </Tab.Navigator>
    );
}

export default HomeMenu;
