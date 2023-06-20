import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `http://localhost:8000/api`;

export const all_tasks = createAsyncThunk(
  "tasks/all_tasks",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get(`${API_URL}/tasks/all`, {
        withCredentials: true,
      });

      console.log(responce.data);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const delete_tasks = createAsyncThunk(
  "tasks/all_tasks",
  async (id, { rejectWithValue }) => {
    try {
      const responce = await axios.delete(`${API_URL}/tasks/${id}`, {
        withCredentials: true,
      });

      console.log(responce.data);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const initialState = {
  tasks: null,
  status: "loading",
  errors: null,
  message: null,
  loading: false,
};

export const TasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: {
    [all_tasks.pending]: (state, actions) => {
      console.log(actions);
      state.loading = true;
    },
    [all_tasks.fulfilled]: (state, actions) => {
      console.log(actions);
      state.tasks = actions.payload.data;
      state.status = "success";
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [all_tasks.rejected]: (state, actions) => {
      console.log(actions);
      state.error = actions.payload.message;
      state.status = "error";
    },
  },
});

export const {} = TasksSlice.actions;
export default TasksSlice.reducer;
