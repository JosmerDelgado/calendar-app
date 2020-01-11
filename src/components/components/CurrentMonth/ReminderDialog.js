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
  position
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
      onSubmit(
        reminderCreator(reminderText, scheduleTime, color),
        position >= 0 ? position : null
      );
      setScheduleTime("");
      setReminder("");
      setColor("");
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
        />
        {!!error && (
          <Typography className={classes.errorLabel}>{error}</Typography>
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
        <Button onClick={preSubmit} color="primary">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReminderDialog;
