import moment from "moment";

export function getFirstMonthWeekday(curMonth) {
  return moment(curMonth.date + "-1").weekday();
}

export function getMonthArray(daysInMonth, firstMonthWeekday) {
  let currentMonthDay = 1;
  const monthArray = [];
  for (
    let currentWeek = 0;
    currentWeek < Math.ceil((daysInMonth + firstMonthWeekday) / 7);
    currentWeek++
  ) {
    monthArray.push([]);
    for (let currentWeekday = 0; currentWeekday < 7; currentWeekday++) {
      monthArray[currentWeek][currentWeekday] =
        currentWeek === 0 && currentWeekday <= firstMonthWeekday
          ? 0
          : currentMonthDay++;
    }
  }
  return monthArray;
}

export const getDateAsString = (currentMont, day) => currentMont + "-" + day;
