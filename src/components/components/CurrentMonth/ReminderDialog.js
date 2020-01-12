import React, { useState, useCallback } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  Button,
  DialogActions,
  Grid,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { commonInputHandleChange as handleChange } from "../../../utils/reactHelper";
import ColorPicker from "./ColorPicker";
import {
  maxLenghtReminder,
  defaultReminderColor,
  defaultTime
} from "../../../constants/common";
import { reminderCreator } from "../../../utils/reminderHelper";
import testIds from "../../../constants/testIds";
import { createReminder, updateReminder } from "../../../store/actions";
import { connect } from "react-redux";

const useStyle = makeStyles(theme => ({
  textField: {
    marginRight: theme.spacing(1),
    width: 200
  },
  colorPicker: {
    display: "block",
    marginTop: 3
  },
  errorLabel: {
    color: theme.palette.error.light
  }
}));

const ReminderDialog = ({
  open,
  handleClose,
  reminder,
  onSubmit,
  position,
  updateReminder,
  createReminder
}) => {
  const [scheduleTime, setScheduleTime] = useState(
    (reminder && reminder.time) || defaultTime
  );
  const [reminderText, setReminder] = useState(reminder && reminder.reminder);
  const [color, setColor] = useState(
    (reminder && reminder.color) || defaultReminderColor
  );
  const [error, setError] = useState();
  const handleScheduletime = useCallback(handleChange(setScheduleTime));
  const handleChangeReminder = useCallback(handleChange(setReminder));
  const classes = useStyle();
  const preSubmit = () => {
    if (!reminderText) {
      setError("This field can't be empty");
    } else if (reminderText.length > maxLenghtReminder) {
      setError("The reminder should be less than 30 characters");
    } else {
      const basicReminder = {
        date: open,
        reminder: reminderCreator(reminderText, scheduleTime, color)
      };
      if (position >= 0) {
        updateReminder({
          ...basicReminder,
          position
        });
      } else {
        createReminder(basicReminder);
      }
      handleClose();
    }
  };
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Reminder to {open}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Introduce your reminder with date and a representative color
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Reminder"
          fullWidth
          value={reminderText}
          onChange={handleChangeReminder}
          inputProps={{ "data-testid": testIds.dialogTextField }}
        />
        {!!error && (
          <Typography
            className={classes.errorLabel}
            data-testid={testIds.textError}
          >
            {error}
          </Typography>
        )}
        <Grid container>
          <Grid item xs={6}>
            <TextField
              id="time"
              label="Schedule Time"
              type="time"
              defaultValue="07:30"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              inputProps={{
                step: 600
              }}
              value={scheduleTime}
              onChange={handleScheduletime}
            />
          </Grid>
          <Grid item xs={6}>
            <ColorPicker color={color} setColor={setColor} />
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={preSubmit}
          color="primary"
          data-testid={testIds.confirmButton}
        >
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    createReminder: payload => dispatch(createReminder(payload)),
    updateReminder: payload => dispatch(updateReminder(payload))
  };
};

export default connect(null, mapDispatchToProps)(ReminderDialog);
