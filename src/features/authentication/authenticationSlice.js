import { createSlice } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";

const initialState = {
  isAuthed: false,
  authedUser: null,
};

export const authenticateUser =
  ({ username, password }) =>
  async (dispatch) => {
    const isAuthed = await _getUsers()
      .then((users) => {
        return Object.values(users).find((user) => user.id === username);
      })
      .then((user) => {
        return user.password === password;
      })
      .catch(() => alert("Invalid username/password."));

    dispatch(login({ username, isAuthed }));
  };

export const authenticationSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload.isAuthed) {
        state.isAuthed = true;
        state.authedUser = action.payload.username;
      }
    },
    logout: (state) => {
      state.authedUser = null;
      state.isAuthed = false;
    },
  },
});

export const { login, logout } = authenticationSlice.actions;

export const selectAuth = (state) => state.auth;

export default authenticationSlice.reducer;
