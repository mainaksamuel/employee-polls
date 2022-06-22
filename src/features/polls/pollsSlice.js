import { createSlice } from "@reduxjs/toolkit";
import { _saveQuestion, _saveQuestionAnswer } from "../../_DATA";

export const pollsSlice = createSlice({
  name: "polls",
  initialState: {},
  reducers: {
    create: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    addVote: (state, action) => {
      const previousVotes =
        state[action.payload.qid][action.payload.answer].votes;
      state[action.payload.qid][action.payload.answer].votes = [
        ...previousVotes,
        action.payload.authedUser,
      ];
      // previousVotes.concat([action.payload.authedUser]);
    },
    removeVote: (state, action) => {
      const previousVotes =
        state[action.payload.qid][action.payload.answer].votes;
      state[action.payload.qid][action.payload.answer].votes =
        previousVotes.filter(
          (authedId) => authedId === action.payload.authedUser
        );
    },
  },
});

export const createPoll = (question) => async (dispatch) => {
  const formatedQuestion = await _saveQuestion(question);
  dispatch(create(formatedQuestion));
};

export const answerPoll = (answeredPoll) => async (dispatch) => {
  dispatch(addVote({ ...answeredPoll }));
  const isAnswered = await _saveQuestionAnswer({ ...answeredPoll });
  if (!isAnswered) {
    dispatch(removeVote({ ...answeredPoll }));
  }
};

export const { create, addVote, removeVote } = pollsSlice.actions;

export const selectPolls = (state) => state.polls;

export default pollsSlice.reducer;
