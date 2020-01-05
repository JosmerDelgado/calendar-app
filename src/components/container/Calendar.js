import React, { useEffect, useCallback, useState } from "react";
import CurrentMonth from "../components/CurrentMonth";
import { makeStyles } from "@material-ui/styles";
import {
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button
} from "@material-ui/core";

const useStyles = makeStyles({
  root: {
    width: "100%",
    overflowX: "auto"
  }
});

const Calendar = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.root}>
      <CurrentMonth />
    </Paper>
  );
};

export default Calendar;
