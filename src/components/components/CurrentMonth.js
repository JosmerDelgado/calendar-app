import React, { useCallback, useState } from "react";
import { makeStyles } from "@material-ui/styles";
import {
  Table,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";
import CurrentMonthHeader from "./CurrentMonth/CurrentMonthHeader";
import moment from "moment";
import CurrentMonthBody from "./CurrentMonth/CurrentMonthBody";
import ReminderDialog from "./CurrentMonth/ReminderDialog";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    overflow: "hidden"
  }
});

const CurrentMonth = () => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [reminder, setReminder] = useState({});
  const handleClose = useCallback(() => {
    setOpen(false);
  });
  const onSubmit = useCallback(
    newReminder => {
      setReminder({
        ...reminder,
        [open]: [...(reminder[open] || []), newReminder]
      });
    },
    [reminder, open]
  );
  const curMonth = moment().format("YYYY-MM");
  const currentMont = {
    date: curMonth,
    name: moment(curMonth).format("MMMM YYYY"),
    days: moment(curMonth).daysInMonth(),
    editDay: null
  };

  return (
    <>
      <Table size="small" className={classes.table} aria-label="simple table">
        <CurrentMonthHeader />
        <CurrentMonthBody
          reminder={reminder}
          openModal={setOpen}
          currentMont={currentMont}
        />
      </Table>
      {open && (
        <ReminderDialog
          reminder={reminder[open]}
          onSubmit={onSubmit}
          open={open}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

export default CurrentMonth;
