import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../Api/api";

// Define the async thunk
export const functionName = createAsyncThunk(
  "user/functionName",
  async (userId, {thunkAPI , rejectWithValue }) => {
    try {
      // Perform an asynchronous operation, such as making an API request
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      // Return the data to be stored in the Redux store
      return data;
    } catch (error) {
      // Handle any errors that occurred during the async operation
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const initialState = {
  posts: [],
  loading: false,
  message: "",
  error: null,
};

export const BehanceSlice = createSlice({
  name: "Behance",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state when the async thunk is triggered
    builder.addCase(functionName.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // Handle the fulfilled state when the async thunk is successful
    builder.addCase(functionName.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });
    // Handle the rejected state when the async thunk encounters an error
    builder.addCase(functionName.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

export const {} = BehanceSlice.actions;

export default BehanceSlice.reducer;
