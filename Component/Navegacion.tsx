import { View, Text } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Acelerometro from "../page/Acelerometro";
import Logs from "../page/Logs";
import FontAwesome from "@expo/vector-icons/FontAwesome";

export default function Navegacion() {
  const tabNavigation = createBottomTabNavigator();

  return (
    <NavigationContainer>
      <tabNavigation.Navigator>
        <tabNavigation.Screen
          component={Acelerometro}
          name="Acelerometro"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="soccer-ball-o" size={24} color="black" />
            ),
          }}
        ></tabNavigation.Screen>
        <tabNavigation.Screen
          component={Logs}
          name="Logs"
          options={{
            tabBarIcon: ({ color, size }) => (
              <FontAwesome name="list-ol" size={24} color="black" />
            ),
          }}
        ></tabNavigation.Screen>
      </tabNavigation.Navigator>
    </NavigationContainer>
  );
}
