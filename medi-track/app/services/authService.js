import axios from "axios";

const API_URL = "https://trivia-app-api-xi.vercel.app/api/auth";

export const loginUser = async (email, password) => {
  console.log("login user form auth called");

  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        withCredentials: true,
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const signupUser = async (username, email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/register`,
      {
        username,
        email,
        password,
      },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};
