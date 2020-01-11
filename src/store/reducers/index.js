import { combineReducers } from "redux";
import reminders from "./reminders";
import modal from "./modal";

export default combineReducers({ reminders, modal });
