import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import moment from "moment";
import { Calendar } from "react-native-calendars";

const CalendarSchedule = ({ route, navigation }) => {
  const { weekendDays, workingDays } = route.params;
  const [workDays, setWorkDays] = useState([]);
  const [formattedDays, setFormattedDays] = useState({});
  let days = {};
  useEffect(() => {
    const maxWeekendDay = () => {
      return weekendDays.map((date) => {
        return moment(date, "DD.MM.YYYY");
      });
    };
    const generateWorkTime = () => {
      let maxDay = moment.max(maxWeekendDay());
      let workingDaysArr = [];

      workingDays.map((date) => {
        workingDaysArr.push(moment(date, "DD.MM.YYYY").format("YYYY-MM-DD"));
      });

      while (true) {
        for (let i = 0; i < workingDays.length; i++) {
          maxDay.add(1, "d");
          workingDaysArr.push(maxDay.clone().format("YYYY-MM-DD"));
        }
        maxDay.add(weekendDays.length, "d");
        if (moment().year() !== maxDay.year()) {
          break;
        }
      }
      setWorkDays(workingDaysArr);
    };
    generateWorkTime();
  }, []);
  useEffect(() => {
    const generateFormattedArray = () => {
      workDays.forEach((date) => {
        days = {
          ...days,
          [date]: { selected: true, selectedColor: "red" },
        };
      });
      setFormattedDays(days);
    };
    generateFormattedArray();
  }, [workDays]);
  return (
    <View>
      {Object.keys(formattedDays).length < 0 && (
        <Text style={{ justifyContent: "center", alignItems: "center" }}>
          Загрузка
        </Text>
      )}
      {Object.keys(formattedDays).length > 0 && (
        <Calendar markedDates={formattedDays} />
      )}
    </View>
  );
};

export default CalendarSchedule;
