import * as actionTypes from "./actionTypes";

export const openModal = modal => {
  return {
    type: actionTypes.OPEN_MODAL,
    modal
  };
};
