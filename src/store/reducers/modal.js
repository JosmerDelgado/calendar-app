import * as actionTypes from "../actions/actionTypes";

const openModal = action => {
  return action.modal;
};

const reducer = (prevState = false, action) => {
  switch (action.type) {
    case actionTypes.OPEN_MODAL:
      return openModal(action);
    default:
      return prevState;
  }
};

export default reducer;
