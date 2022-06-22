import { createSlice } from "@reduxjs/toolkit";
import { _saveQuestion } from "../../_DATA";

export const pollsSlice = createSlice({
  name: "polls",
  initialState: {},
  reducers: {
    create: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    answer: (state, action) => {},
  },
});

export const createPoll = (question) => async (dispatch) => {
  const formatedQuestion = await _saveQuestion(question);
  dispatch(create(formatedQuestion));
};

export const { create, answer } = pollsSlice.actions;

export const selectPolls = (state) => state.polls;

export default pollsSlice.reducer;
