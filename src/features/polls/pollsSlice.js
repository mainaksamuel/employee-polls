import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { _saveQuestion, _saveQuestionAnswer, _getQuestions } from "../../_DATA";

const initialState = {
  questions: {},
  status: "idle",
};
export const pollsSlice = createSlice({
  name: "polls",
  initialState,
  reducers: {
    create: (state, action) => {
      state.questions[action.payload.id] = action.payload;
    },
    addVote: (state, action) => {
      const previousVotes = state.questions[action.payload.qid][
        action.payload.answer
      ].votes.filter((id) => id !== action.payload.authedUser);

      state.questions[action.payload.qid][action.payload.answer].votes = [
        ...previousVotes,
        action.payload.authedUser,
      ];
    },
    removeVote: (state, action) => {
      const previousVotes =
        state.questions[action.payload.qid][action.payload.answer].votes;

      state.questions[action.payload.qid][action.payload.answer].votes =
        previousVotes.filter(
          (authedId) => authedId !== action.payload.authedUser
        );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getQuestions.fulfilled, (state, action) => {
      state.questions = action.payload.questions;
    });
  },
});

export const getQuestions = createAsyncThunk("polls/get", async () => {
  const questions = await _getQuestions();
  return { questions };
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

export const selectPolls = (state) => state.polls.questions;

export default pollsSlice.reducer;
