import React, { useCallback, useState, useEffect } from "react";
import { makeStyles } from "@material-ui/styles";
import { Table } from "@material-ui/core";
import CurrentMonthHeader from "./CurrentMonth/CurrentMonthHeader";
import CurrentMonthBody from "./CurrentMonth/CurrentMonthBody";
import ReminderDialog from "./CurrentMonth/ReminderDialog";
import { fetchHolidays, getHolidaysFrom } from "../../utils/requestHelper";
import { deleteReminder, openModal } from "../../store/actions";
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
  reminderList: reminder,
  deleteReminder,
  openModal,
  modalState
}) => {
  const classes = useStyles();
  const [holidays, setHolidays] = useState([]);
  const handleClose = useCallback(() => {
    openModal(false);
  }, [openModal]);
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
    deleteReminder: payload => dispatch(deleteReminder(payload)),
    openModal: action => dispatch(openModal(action))
  };
};

export default connect(mapStoreToProps, mapDispatchToProps)(CurrentMonth);
