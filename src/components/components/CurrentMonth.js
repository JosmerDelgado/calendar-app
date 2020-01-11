import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Table } from "@material-ui/core";
import CurrentMonthHeader from "./CurrentMonth/CurrentMonthHeader";
import moment from "moment";
import CurrentMonthBody from "./CurrentMonth/CurrentMonthBody";
import ReminderDialog from "./CurrentMonth/ReminderDialog";
import { sortByDate } from "../../utils/monthHelper";
import { fetchHolidays, getHolidaysFrom } from "../../utils/requestHelper";
import * as actionTypes from "../../store/actions/actionTypes";
import {
  createReminder,
  updateReminder,
  deleteReminder,
  openModal
} from "../../store/actions";
import { connect } from "react-redux";

const useStyles = makeStyles({
  table: {
    minWidth: 400,
    overflow: "hidden"
  }
});

const CurrentMonth = ({
  currentMont,
  country,
  createReminder,
  reminderList: reminder,
  updateReminder,
  deleteReminder,
  openModal,
  modalState
}) => {
  const classes = useStyles();
  const [holidays, setHolidays] = useState([]);
  const handleClose = useCallback(() => {
    openModal(false);
  }, [openModal]);
  const onSubmit = useCallback(
    (newReminder, position) => {
      if (position !== null) {
        updateReminder({
          reminder: newReminder,
          date: modalState.date,
          position
        });
      } else {
        createReminder({ reminder: newReminder, date: modalState.date });
      }
    },
    [updateReminder, modalState.date, createReminder]
  );

  useEffect(() => {
    const apiCall = async () => {
      const [year, month] = currentMont.date.split("-");
      const response = await fetchHolidays(country, year, month);
      if (!response.error && !response.data.errors) {
        setHolidays(getHolidaysFrom(response.data));
      }
    };
    apiCall();
  }, [country, currentMont.date]);
  const onDeleteReminder = date => key => () => {
    deleteReminder({ date, position: key });
  };

  return (
    <>
      <Table size="small" className={classes.table} aria-label="simple table">
        <CurrentMonthHeader />
        <CurrentMonthBody
          holidays={holidays}
          reminder={reminder}
          currentMont={currentMont}
          onDeleteReminder={onDeleteReminder}
        />
      </Table>
      {modalState && modalState.date && (
        <ReminderDialog
          reminder={
            reminder[modalState.date] &&
            reminder[modalState.date][modalState.key]
          }
          onSubmit={onSubmit}
          open={modalState.date}
          position={modalState.key}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

const mapStoreToProps = state => ({
  reminderList: state.reminders,
  modalState: state.modal
});

const mapDispatchToProps = dispatch => {
  return {
    createReminder: payload => dispatch(createReminder(payload)),
    updateReminder: payload => dispatch(updateReminder(payload)),
    deleteReminder: payload => dispatch(deleteReminder(payload)),
    openModal: action => dispatch(openModal(action))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CurrentMonth);
