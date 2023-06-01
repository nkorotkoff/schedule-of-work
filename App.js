import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Week from "./screens/SelectWeekDays";
import WorkSchedule from "./screens/WorkSchedul";
import CalendarSchedule from "./screens/Calendar";

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Выбор графика" component={WorkSchedule} />
        <Stack.Screen name="Выбор даты" component={Week} />
        <Stack.Screen
          options={() => ({
            headerBackVisible: false,
          })}
          name="График работы"
          component={CalendarSchedule}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
