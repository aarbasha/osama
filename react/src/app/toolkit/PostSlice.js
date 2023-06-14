import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const API_URL = `http://localhost:8000/api`;
export const all_Posts = createAsyncThunk(
  "post/all_Posts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
    } catch (error) {}
  }
);

export const add_Posts = createAsyncThunk(
  "post/add_Posts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
    } catch (error) {}
  }
);

export const edit_Posts = createAsyncThunk(
  "post/edit_Posts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
    } catch (error) {}
  }
);

export const update_Posts = createAsyncThunk(
  "post/update_Posts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
    } catch (error) {}
  }
);

export const delete_Posts = createAsyncThunk(
  "post/delete_Posts",
  async (_, { rejectWithValue, dispatch }) => {
    try {
    } catch (error) {}
  }
);

export const initialState = {
  posts: [],
  loading: true,
  status: null,
  error: null,
};
const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: {},
});

export default PostSlice.reducer;
