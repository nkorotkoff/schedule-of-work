import React, { useState, useEffect } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const WorkSchedule = ({ navigation }) => {
  const [workDays, setWorkDays] = useState("");
  const [weekendDays, setWeekendDays] = useState("");
  const [graphic, setGraphic] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("graphic");
        if (value !== null) {
          navigation.navigate("График работы", {
            value: JSON.parse(value),
          });
        }
      } catch (e) {
        console.log(e);
      }
    };
    getData();
  });

  const handleWorkDaysChange = (value) => {
    if (value < 6 && value !== "") {
      if (weekendDays !== "" && value > 7 - weekendDays) {
        Alert.alert(
          "Неправильно выбраны дни",
          "Суммарное количество дней не может быть больше 7"
        );
        setWorkDays(7 - weekendDays);
      } else {
        setWorkDays(parseInt(value));
      }
    } else {
      if (value !== "") {
        Alert.alert(
          "Неправильно выбраны дни",
          "Максимальное количество рабочих дней не может быть больше 6"
        );
      }

      setWorkDays("");
    }
  };

  const handleWeekendDaysChange = (value) => {
    if (value < 6 && value !== "") {
      if (workDays !== "" && value > 7 - workDays) {
        Alert.alert(
          "Неправильно выбраны дни",
          "Суммарное количество дней не может быть больше 7"
        );
        setWeekendDays(7 - parseInt(workDays));
      } else {
        setWeekendDays(parseInt(value));
      }
    } else {
      setWeekendDays("");

      if (value !== "") {
        Alert.alert(
          "Неправильно выбраны дни",
          "Максимальное количество выходных дней не может быть больше 6"
        );
      }
    }
  };
  const saveParams = () => {
    if (workDays !== "" && weekendDays !== "") {
      navigation.navigate("Выбор даты", {
        workDays,
        weekendDays,
        graphic,
      });
    } else {
      Alert.alert(
        "Неправильно выбраны дни",
        "Рабочие и выходные должны быть заполнены"
      );
    }
  };
  const setUpDayOrNight = (value) => {
    if (value === graphic) {
      setGraphic("");
    } else {
      setGraphic(value);
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>Введите количество рабочих дней:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleWorkDaysChange}
        value={workDays.toString()}
      />
      <Text style={styles.label}>Введите количество выходных дней:</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        onChangeText={handleWeekendDaysChange}
        value={weekendDays.toString()}
      />
      <View
        style={{
          justifyContent: "space-evenly",
          flexDirection: "row",
          gap: 150,
          marginBottom: 50,
        }}
      >
        <Button
          color={graphic === "Ночная" ? "green" : ""}
          onPress={() => setUpDayOrNight("Ночная")}
          title="Ночная"
        />
        <Button
          color={graphic === "Дневная" ? "green" : ""}
          onPress={() => setUpDayOrNight("Дневная")}
          title="Дневная"
        />
      </View>
      <Button onPress={() => saveParams()} title="Сохранить" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  label: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    width: "80%",
    marginBottom: 20,
    fontSize: 16,
  },
});

export default WorkSchedule;
