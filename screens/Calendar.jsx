import React, { useEffect, useState } from "react";
import { View, Text, Pressable } from "react-native";
import moment from "moment";
import { Calendar, LocaleConfig } from "react-native-calendars";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CalendarSchedule = ({ route, navigation }) => {
  const { weekendDays, workingDays, value, graphic } = route.params;
  const [workDays, setWorkDays] = useState([]);
  const [formattedDays, setFormattedDays] = useState({});
  let days = {};
  if (!value) {
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
        if (graphic !== "") {
          let day = graphic === "Дневная" ? workingDays.length : 0;
          let night = graphic === "Ночная" ? workingDays.length : 0;
          workDays.forEach((date) => {
            if (day > 0) {
              days = {
                ...days,
                [date]: { selected: true, selectedColor: "green" },
              };
            }

            if (night > 0) {
              days = {
                ...days,
                [date]: { selected: true, selectedColor: "red" },
              };
            }
            day = day - 1;
            night = night - 1;
            if (day === 0) {
              night = workingDays.length;
              day = 0;
            }
            if (night === 0) {
              night = 0;
              day = workingDays.length;
            }
          });
        } else {
          workDays.forEach((date) => {
            days = {
              ...days,
              [date]: { selected: true, selectedColor: "red" },
            };
          });
        }
        const storeData = async () => {
          try {
            const jsonValue = JSON.stringify(days);
            await AsyncStorage.setItem("graphic", jsonValue);
          } catch (e) {
            console.log(e);
          }
        };
        storeData();
        setFormattedDays(days);
      };
      generateFormattedArray();
    }, [workDays]);
  } else {
    useEffect(() => {
      if (value) {
        setFormattedDays(value);
      }
    }, [value]);
  }

  LocaleConfig.locales["ru"] = {
    monthNames: [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октрябрь",
      "Ноябрь",
      "Декабрь",
    ],
    monthNamesShort: [
      "Янв.",
      "Февр.",
      "Март",
      "Апр",
      "Май",
      "Июнь",
      "Июль.",
      "Авг",
      "Сент.",
      "Окт.",
      "Нояб.",
      "Дек.",
    ],
    dayNames: [
      "Понедельник",
      "Вторник",
      "Среда",
      "Четвер",
      "Пятница",
      "Суббота",
      "Воскресенье",
    ],
    dayNamesShort: ["Пон", "Вт.", "Ср.", "Чет.", "Пят.", "Суб.", "Вос."],
    today: "Сегодня",
  };
  LocaleConfig.defaultLocale = "ru";
  const clearData = async () => {
    await AsyncStorage.removeItem("graphic");
    navigation.navigate("Выбор графика");
  };
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
      <Pressable
        style={{
          marginTop: "50%",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        onPress={() => clearData()}
      >
        <Text style={{ backgroundColor: "blue", padding: 10, borderRadius: 5 }}>
          Сбросить настройки
        </Text>
      </Pressable>
    </View>
  );
};

export default CalendarSchedule;
