import { createSlice } from "@reduxjs/toolkit";

const lifeLineSlice = createSlice({
  name: "lifeLine",
  initialState: {
    aiHint: "",
    isAiHintUsed: false,
    isLoading: false,
  },
  reducers: {
    setAiHint: (state, action) => {
      state.aiHint = action.payload;
    },
    setIsAiHintUsed: (state, action) => {
      state.isAiHintUsed = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAiHint, setIsAiHintUsed, setLoading } = lifeLineSlice.actions;
export default lifeLineSlice.reducer;
