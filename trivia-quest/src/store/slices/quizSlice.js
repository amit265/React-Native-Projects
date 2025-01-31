import { createSlice } from "@reduxjs/toolkit";

const quizSlice = createSlice({
  name: "quiz",
  initialState: {
    questions: [], // Will be set when API fetches questions
    currentQuestionIndex: 0,
    userScore: 0,
  },
  reducers: {
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },
    setCurrentQuestionIndex: (state, action) => {
      state.currentQuestionIndex = action.payload;
    },
    setUserScore: (state, action) => {
      state.userScore = action.payload;
    },
  },
});

export const { setQuestions, setCurrentQuestionIndex, setUserScore } = quizSlice.actions;
export default quizSlice.reducer;
