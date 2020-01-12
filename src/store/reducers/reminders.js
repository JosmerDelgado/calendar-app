import * as actionTypes from "../actions/actionTypes";
import { sortByDate } from "../../utils/monthHelper";

const initialState = {};

const createReminder = (prevState, { reminder: { reminder, date } }) => {
  return {
    ...prevState,
    [date]: prevState[date]
      ? sortByDate([...prevState[date], reminder])
      : [reminder]
  };
};

const updateReminder = (
  prevState,
  { reminder: { reminder, date, position } }
) => {
  const currentReminderList = prevState[date];
  currentReminderList[position] = reminder;
  return {
    ...prevState,
    [date]: sortByDate(currentReminderList)
  };
};

const deleteReminder = (prevState, { reminder: { date, position } }) => {
  prevState[date].splice(position, 1);
  return {
    ...prevState
  };
};

const reducer = (prevState = initialState, action) => {
  switch (action.type) {
    case actionTypes.CREATE_REMINDER:
      return createReminder(prevState, action);
    case actionTypes.UPDATE_REMINDER:
      return updateReminder(prevState, action);
    case actionTypes.DELETE_REMINDER:
      return deleteReminder(prevState, action);
    default:
      return prevState;
  }
};

export default reducer;
