import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice";
import pollsReducer from "../features/polls/pollsSlice";

export const store = configureStore({
  reducer: {
    auth: authenticationReducer,
    polls: pollsReducer,
  },
});
