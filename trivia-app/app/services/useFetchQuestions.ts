import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setQuestions } from "../store/quizSlice";
import { BASE_URL } from "app/utils/constants";

const useFetchQuestions = () => {
  const dispatch = useDispatch();
  const questions = useSelector((store: { quiz: { questions: any[] } }) => store.quiz.questions);

  useEffect(() => {
    // Only fetch questions if the array is empty
    const fetchQuestions = async () => {
      if (questions.length === 0) {
        try {
          const response = await fetch(
            BASE_URL
          );
          const data = await response.json();
          dispatch(setQuestions(data));
        } catch (error) {
          console.error("Error fetching questions:", error);
        }
      }
    };

    fetchQuestions();  // Call the function
  }, [dispatch, questions.length]);

  return questions;
};

export default useFetchQuestions;
