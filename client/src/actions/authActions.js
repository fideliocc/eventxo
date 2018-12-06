import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";


// Login - Get user Token
export const loginUser = userData => dispatch => {
  axios
    .post("/api/admin/users/login", userData)
    .then(res => {
      // Save to LocalStorage
      const { token } = res.data;
      // Set to LocalStorage (.setItem())
      localStorage.setItem("jwtToken", token);
      // Set Token to Auth header (Utils method)
      setAuthToken(token);
      // Decode Token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set curent user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out
export const logoutUser = () => dispatch => {
  // Remove Token from localStorage (.removeItem())
  localStorage.removeItem("jwtToken");
  // Remove Auth header for future requests
  setAuthToken(false);
  // Set current user as {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
};
