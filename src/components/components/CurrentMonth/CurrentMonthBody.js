import React from "react";
import AddIcon from "@material-ui/icons/Add";
import {
  getFirstMonthWeekday,
  getMonthArray,
  getDateAsString
} from "../../../utils/monthHelper";
import { TableBody, TableRow, TableCell, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles({
  addButton: {
    position: "absolute",
    bottom: 5,
    right: 10,
    height: 36,
    width: 36
  },
  tableCell: {
    position: "relative",
    minHeight: 40,
    height: 40,
    border: "black solid 1px",
    width: 100
  },
  dateDiv: {
    position: "absolute",
    top: 0,
    left: 0
  }
});

const CurrentMonthBody = ({ currentMont, openModal, reminder }) => {
  const classes = useStyles();
  const firstMonthWeekday = getFirstMonthWeekday(currentMont);

  const monthArray = getMonthArray(currentMont.days, firstMonthWeekday);
  return (
    <TableBody>
      {monthArray.map((weekdays, week) => {
        return (
          <TableRow key={currentMont + week + "week"}>
            {weekdays.map((days, position) => {
              return (
                <TableCell
                  key={currentMont.date + "-" + days + position}
                  className={classes.tableCell}
                >
                  {!!days && (
                    <>
                      <div className={classes.dateDiv}>{days}</div>
                      {reminder[getDateAsString(currentMont.date, days)] &&
                        reminder[
                          getDateAsString(currentMont.date, days)
                        ].map(myReminder => <div>{myReminder.reminder}</div>)}
                      <Fab
                        color="primary"
                        aria-label="add"
                        className={classes.addButton}
                        onClick={() => {
                          openModal(getDateAsString(currentMont.date, days));
                          console.log(currentMont.date + "-" + days);
                        }}
                      >
                        <AddIcon />
                      </Fab>
                    </>
                  )}
                </TableCell>
              );
            })}
          </TableRow>
        );
      })}
    </TableBody>
  );
};

export default CurrentMonthBody;
