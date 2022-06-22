import { createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";

const initialState = {
  isAuthed: false,
  authedUser: null,
};

export const authenticateUser =
  ({ username, password }) =>
  async (dispatch, getState) => {
    const { isAuthed, authedUser } = selectAuth(getState());

    if (isAuthed) {
      alert(`User: ${authedUser} is already logged in.`);
      return;
    }

    const isValidCredentials = await _getUsers()
      .then((users) => {
        return Object.values(users).find((user) => user.id === username);
      })
      .then((user) => {
        return user.password === password;
      })
      .catch(() => alert("Invalid username/password."));

    dispatch(login({ username, isValidCredentials }));
  };

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload.isValidCredentials) {
        state.isAuthed = true;
        state.authedUser = action.payload.username;
      }
    },
    logout: (state) => {
      if (state.isAuthed) {
        state.authedUser = null;
        state.isAuthed = false;
      }
      alert("You are currently not logged in. Please login first");
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export const selectAuth = (state) => state.auth;

export default authenticationSlice.reducer;
