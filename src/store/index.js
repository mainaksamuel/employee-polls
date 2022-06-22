import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import pollsReducer from "../features/polls/pollsSlice";
import usersReducer from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    polls: pollsReducer,
    users: usersReducer,
  },
});
