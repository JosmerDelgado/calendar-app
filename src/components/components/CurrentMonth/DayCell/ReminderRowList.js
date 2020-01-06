import React from "react";
import ReminderRow from "./ReminderRow";

const ReminderRowList = ({ reminders, onDeleteReminder, onEditReminder }) => {
  return reminders.map((reminder, keyPosition) => (
    <ReminderRow
      reminder={reminder}
      onDeleteReminder={onDeleteReminder(keyPosition)}
      onEditReminder={onEditReminder(keyPosition)}
    />
  ));
};

export default ReminderRowList;
