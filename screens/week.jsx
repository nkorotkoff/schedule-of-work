import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";

const Week = () => {
  const [workingDays, setWorkingDays] = useState([]);
  const [freeDays, setFreeDays] = useState([]);
  const setUpDays = (index) => {
    setUpFreeDays(index);
    if (workingDays.includes(index)) {
      const filteredDays = workingDays.filter((item) => {
        return item !== index;
      });
      setWorkingDays(filteredDays);
    } else if (workingDays.length < 2) {
      setWorkingDays([...workingDays, index]);
      if (freeDays.includes(index)) {
        const filteredDays = freeDays.filter((item) => {
          return item !== index;
        });
        setFreeDays(filteredDays);
      }
    }
  };
  setUpFreeDays = (index) => {
    if (workingDays.length === 2) {
      if (freeDays.includes(index)) {
        const filteredDays = freeDays.filter((item) => {
          return item !== index;
        });
        setFreeDays(filteredDays);
      } else if (
        !freeDays.includes(index) &&
        freeDays.length < 2 &&
        !workingDays.includes(index)
      ) {
        setFreeDays([...freeDays, index]);
      }
    }
  };
  const setUpColor = (index) => {
    if (workingDays.includes(index)) {
      return "red";
    }
    if (freeDays.includes(index)) {
      return "green";
    }
    return "darkturquoise";
  };
  const weekdays = [
    "Понедельник",
    "Вторник",
    "Среда",
    "Четверг",
    "Пятница",
    "Суббота",
    "Воскресенье",
  ];

  Date.prototype.GetDayOfWeek = function (i) {
    return new Date(
      this.setDate(this.getDate() - this.getDay() + i)
    ).toLocaleString();
  };
  let daysOfWeek = [];
  for (let i = 0; weekdays.length > i; i++) {
    daysOfWeek[i] = `${new Date().GetDayOfWeek(i + 1)}`;
  }
  return (
    <View style={{ alignContent: "flex-start", marginTop: 50 }}>
      {weekdays.map((item, index) => {
        return (
          <Pressable
            key={item}
            style={{
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: setUpColor(index),
              height: "14.33%",
              borderBottomWidth: 2,
              borderStyle: "solid",
              borderBottomColor: "lightgrey ",
              activeOpacity: 0.05,
            }}
            onPress={() => {
              setUpDays(index);
            }}
          >
            <Text style={{ fontSize: 18, marginBottom: 2 }}>{item}</Text>
            <Text>{daysOfWeek[index].substr(0, 5)}</Text>
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Week;
