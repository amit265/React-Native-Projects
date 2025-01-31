import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/slices/quizSlice";
// import { setCategories } from "app/store/categorySlice";
import { API_BASE_URL } from "../config";

const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((store) => store?.quiz?.questions);
  console.log("questions", questions);
  

  useEffect(() => {
    // Only fetch questions if the array is empty
    const fetchQuestions = async () => {
      if (questions.length === 0) {
        try {
          const response = await fetch(API_BASE_URL + "/quiz");
          const data = await response.json();

          console.log("data", data);
          
          dispatch(setQuestions(data));


          const question_category = data.map((question) => question?.category);
          // const uniqueCategory = [...new Set(question_category)];
          // dispatch(setCategories(uniqueCategory));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions(); // Call the function
  }, [dispatch, questions.length]);

  return questions;
};

export default useFetchQuestions;
