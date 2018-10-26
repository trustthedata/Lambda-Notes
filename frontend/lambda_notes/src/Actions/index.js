import axios from "axios";
import { SERVER_URL } from "../Config/config";
export const FETCHING_NOTES = "FETCHING_NOTES";
export const ADDED_NOTE = "ADDED_NOTE";
export const UPDATED_NOTE = "UPDATED_NOTE";
export const DELETED_NOTE = "DELETED_NOTE";
export const SEARCHED_NOTES = "SEARCHED_NOTES";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

const config = {
  headers: {
    Authorization: `JWT ${localStorage.getItem("jwt")}`
  }
};

export const fetchNote = () => {
  return function(dispatch) {
    dispatch({
      type: FETCHING_NOTES
    });
    axios
      .get(`${SERVER_URL}`, config)
      .then(response => {
        dispatch({
          type: SUCCESS,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "Request failed"
        });
      });
  };
};

export const addNote = note => {
  return function(dispatch) {
    axios
      .post(`${SERVER_URL}`, note, config)
      .then(response => {
        dispatch({
          type: ADDED_NOTE,
          payload: response.data
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "Failed to add note"
        });
      });
  };
};

export const editNote = (id, note) => {
  return function(dispatch) {
    axios
      .put(`${SERVER_URL}${id}/`, note, config)
      .then(response => {
        dispatch({
          type: UPDATED_NOTE,
          payload: response.data,
          id: id
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "Failed to update note"
        });
      });
  };
};

export const deleteNote = id => {
  return function(dispatch) {
    axios
      .delete(`${SERVER_URL}${id}/`, config)
      .then(response => {
        console.log("deleteNote:", response);
        dispatch({
          type: DELETED_NOTE,
          id: id
        });
      })
      .catch(err => {
        dispatch({
          type: ERROR,
          payload: "Failed to delete note"
        });
      });
  };
};

export const searchNotes = filteredNotes => {
  return {
    type: SUCCESS,
    payload: filteredNotes
  };
};
