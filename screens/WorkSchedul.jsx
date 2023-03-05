import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";

const WorkSchedule = ({ navigation }) => {
  const [workDays, setWorkDays] = useState("");
  const [weekendDays, setWeekendDays] = useState("");

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
    navigation.navigate("Выбор даты", {
      workDays,
      weekendDays,
    });
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
