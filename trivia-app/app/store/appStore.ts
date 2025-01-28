import { configureStore } from "@reduxjs/toolkit";
import quizReducer from "./quizSlice";
import categoryReducer from "./categorySlice";
import lifeLineReducer from "./lifeLine";
import uiReducer from "./uiSlice"


const appStore = configureStore({
    reducer: {
        quiz: quizReducer,
        category: categoryReducer,
        lifeLine: lifeLineReducer,
        ui: uiReducer,



    }
})

export default appStore;