import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";


import Consulta from "../screens/Query";
import Feed from "../screens/Feed";
import FAQScreen from "../screens/FAQ/Index";
import Perfil from "../screens/Profile";
import { propsNavigationStack } from "./Models";

const { Navigator, Screen } = createBottomTabNavigator<propsNavigationStack>();

export function AppRoutes() {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFF', 
        },
      }}
    >
      <Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="home"
              size={focused ? size + 5 : size} 
              color={focused ? 'red' : color} 
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="FAQ"
        component={FAQScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="info"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
       <Screen
        name="Consulta"
        component={Consulta}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="edit-2"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Feather
              name="user"
              size={focused ? size + 5 : size}
              color={focused ? 'red' : color}
            />
          ),
          tabBarLabel: () => null,
        }}
      />
    </Navigator>
  );
}