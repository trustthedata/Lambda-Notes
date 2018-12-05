import { combineReducers } from "redux";
import { notesReducer, searchNotes } from "./NoteReducer";
// import { authReducer } from "./AuthReducer";

export default combineReducers({
  search: searchNotes,
  notes: notesReducer
  // auth: authReducer
});
