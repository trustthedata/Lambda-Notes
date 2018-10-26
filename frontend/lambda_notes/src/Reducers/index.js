import { combineReducers } from "redux";
import { notesReducer } from "./NoteReducer";
// import { authReducer } from "./AuthReducer";

export default combineReducers({
  notes: notesReducer
  // auth: authReducer
});
