
import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from "../screens/Home";
import Profile from "../screens/Profile";
import NewPost from "../screens/NewPost";
import Users from "../screens/Users";
import Feather from '@expo/vector-icons/Feather';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const Tab = createBottomTabNavigator();

function HomeMenu() {
    return (

        <Tab.Navigator screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={Home} options={
                { tabBarIcon: () => <Feather name="home" size={24} color="black" /> }
            }
            />
            <Tab.Screen name="NewPost" component={NewPost} options={
                { tabBarIcon: () => <FontAwesome name="plane" size={24} color="black" /> }
            }
            />
            <Tab.Screen name="Users" component={Users} options={
                { tabBarIcon: () => <AntDesign name="user" size={24} color="black" /> }
            }
            />
            <Tab.Screen name="Profile" component={Profile} options={
                { tabBarIcon: () => <AntDesign name="profile" size={24} color="black" /> }
            }
            />
        </Tab.Navigator>
    );
}

export default HomeMenu;
