import * as actionTypes from "./actionTypes";

// Action creators
export const createReminder = reminder => {
  return {
    type: actionTypes.CREATE_REMINDER,
    reminder: reminder
  };
};

export const updateReminder = reminder => {
  return {
    type: actionTypes.UPDATE_REMINDER,
    reminder: reminder
  };
};

export const deleteReminder = reminder => {
  return {
    type: actionTypes.DELETE_REMINDER,
    reminder: reminder
  };
};
