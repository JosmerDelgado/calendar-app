import React from "react";
import {
  getFirstMonthWeekday,
  getMonthArray
} from "../../../utils/monthHelper";
import { TableBody, TableRow } from "@material-ui/core";
import DayCell from "./DayCell";

const CurrentMonthBody = ({
  currentMont,
  openModal,
  reminder,
  onDeleteReminder,
  holidays
}) => {
  const firstMonthWeekday = getFirstMonthWeekday(currentMont);
  const monthArray = getMonthArray(currentMont.days, firstMonthWeekday);

  return (
    <TableBody>
      {monthArray.map((weekdays, week) => {
        return (
          <TableRow key={currentMont + week + "week"}>
            {weekdays.map((days, position) => {
              return (
                <DayCell
                  key={currentMont.date + days + position}
                  day={days}
                  reminder={reminder}
                  position={position}
                  currentMont={currentMont}
                  openModal={openModal}
                  onDeleteReminder={onDeleteReminder}
                  holiday={holidays.some(holiday => holiday === days)}
                />
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CurrentMonthBody;
