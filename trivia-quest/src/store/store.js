import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import lifeLineReducer from "./slices/lifeLine";
import quizReducer from "./slices/quizSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    lifeLine: lifeLineReducer,
    quiz: quizReducer,
  },
});

export default store;
