import React from "react";
import { Grid, Typography, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { makeStyles } from "@material-ui/styles";
import testIds from "../../../../constants/testIds";

const useStyle = makeStyles({
  container: {
    backgroundColor: ({ reminder }) => reminder.color,
    "&:hover .buttonItem": {
      visibility: "visible"
    },
    "&:hover .textItem": {
      visibility: "hidden"
    },
    position: "relative",
    marginBottom: 4,
    borderRadius: 4
  },
  buttonItem: {
    visibility: "hidden",
    position: "absolute",
    left: 0,
    top: 0
  },
  buttonIcon: { height: 20, padding: 0 },
  reminderText: {
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden",
    maxWidth: 150,
    paddingLeft: 2
  }
});

const ReminderRow = ({ reminder, onDeleteReminder, onEditReminder }) => {
  const classes = useStyle({ reminder });
  return (
    <Grid
      container
      className={classes.container}
      data-testid={testIds.reminderRow}
    >
      <Grid className={"textItem"} item>
        <Typography className={classes.reminderText}>
          {reminder.reminder}
        </Typography>
      </Grid>
      <Grid item className={classes.buttonItem + " buttonItem"}>
        <IconButton className={classes.buttonIcon} onClick={onDeleteReminder}>
          <DeleteIcon />
        </IconButton>
        <IconButton className={classes.buttonIcon} onClick={onEditReminder}>
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default ReminderRow;
