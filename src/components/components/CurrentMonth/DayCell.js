import React from "react";
import { TableCell, Fab } from "@material-ui/core";
import { getDateAsString } from "../../../utils/monthHelper";
import { makeStyles } from "@material-ui/styles";
import AddIcon from "@material-ui/icons/Add";
import ReminderRowList from "./DayCell/ReminderRowList";
import { openModal } from "../../../store/actions";
import { connect } from "react-redux";
import testIds from "../../../constants/testIds";

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
    left: 0,
    color: ({ holiday }) => (holiday ? "red" : "black")
  }
});

const DayCell = ({
  day,
  reminder,
  position,
  currentMont,
  openModal,
  onDeleteReminder,
  holiday
}) => {
  const classes = useStyles({ holiday });
  const onEditReminder = date => key => () => {
    openModal({ date, key });
  };
  const addNewReminder = () => {
    openModal({
      date: getDateAsString(currentMont.date, day),
      key: -1
    });
  };
  return (
    <TableCell
      key={currentMont.date + "-" + day + position}
      className={classes.tableCell}
    >
      {!!day && (
        <>
          <div className={classes.dateDiv}>{day}</div>
          {reminder[getDateAsString(currentMont.date, day)] && (
            <ReminderRowList
              reminders={reminder[getDateAsString(currentMont.date, day)]}
              onDeleteReminder={onDeleteReminder(
                getDateAsString(currentMont.date, day)
              )}
              onEditReminder={onEditReminder(
                getDateAsString(currentMont.date, day)
              )}
            />
          )}
          <Fab
            color="primary"
            aria-label="add"
            data-testid={testIds.fabButton(day)}
            className={classes.addButton}
            onClick={addNewReminder}
          >
            <AddIcon />
          </Fab>
        </>
      )}
    </TableCell>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    openModal: action => dispatch(openModal(action))
  };
};

export default connect(null, mapDispatchToProps)(DayCell);
