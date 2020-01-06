import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Table } from "@material-ui/core";
import CurrentMonthHeader from "./CurrentMonth/CurrentMonthHeader";
import moment from "moment";
import CurrentMonthBody from "./CurrentMonth/CurrentMonthBody";
import ReminderDialog from "./CurrentMonth/ReminderDialog";
import { sortByDate } from "../../utils/monthHelper";
import { fetchHolidays, getHolidaysFrom } from "../../utils/requestHelper";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    overflow: "hidden"
  }
});

const CurrentMonth = ({ currentMont, country }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reminder, setReminder] = useState({});
  const [holidays, setHolidays] = useState([]);
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);
  const onSubmit = useCallback(
    (newReminder, position) => {
      const currentReminderList = reminder[open.date] || [];
      currentReminderList[
        position !== null ? position : currentReminderList.length
      ] = newReminder;
      setReminder({
        ...reminder,
        [open.date]: sortByDate(currentReminderList)
      });
    },
    [reminder, open]
  );

  useEffect(() => {
    const apiCall = async () => {
      const [year, month] = currentMont.date.split("-");
      const response = await fetchHolidays(country, year, month);
      debugger;
      if (!response.error && !response.data.errors) {
        setHolidays(getHolidaysFrom(response.data));
      }
    };
    apiCall();
  }, [country, currentMont.date]);
  const onDeleteReminder = date => key => () => {
    const currentReminderList = reminder[date];
    delete currentReminderList[key];
    setReminder({ ...reminder, [date]: sortByDate(currentReminderList) });
  };

  return (
    <>
      <Table size="small" className={classes.table} aria-label="simple table">
        <CurrentMonthHeader />
        <CurrentMonthBody
          holidays={holidays}
          reminder={reminder}
          openModal={setOpen}
          currentMont={currentMont}
          onDeleteReminder={onDeleteReminder}
        />
      </Table>
      {open && open.date && (
        <ReminderDialog
          reminder={reminder[open.date] && reminder[open.date][open.key]}
          onSubmit={onSubmit}
          open={open.date}
          position={open.key}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default CurrentMonth;
