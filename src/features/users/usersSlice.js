import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { _getUsers } from "../../_DATA";

export const getUsers = createAsyncThunk("users/get", async () => {
  const users = await _getUsers();
  const leaderboard = Object.values(users).reduce((acc, curr) => {
    acc[curr.id] = {};
    acc[curr.id]["answered"] = Object.keys(curr.answers).length;
    acc[curr.id]["created"] = curr.questions.length;
    return acc;
  }, {});

  return { users, leaderboard };
});

const usersSlice = createSlice({
  name: "users",
  initialState: {},
  extraReducers: (builder) => {
    builder.addCase(getUsers.fulfilled, (state, action) => {
      state.users = action.payload.users;
      state.leaderboard = action.payload.leaderboard;
    });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
