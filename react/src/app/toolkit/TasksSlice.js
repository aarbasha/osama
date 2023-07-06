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
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const TaskAdd = createAsyncThunk(
  "tasks/TaskAdd",
  async (inputs, { rejectWithValue }) => {
    try {
      const responce = await axios.post(`${API_URL}/tasks/add`, inputs, {
        withCredentials: true,
      });
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
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const edit_task = createAsyncThunk(
  "tasks/edit_task",
  async (id, { rejectWithValue }) => {
    try {
      const responce = await axios.get(`${API_URL}/tasks/${id}`, {
        withCredentials: true,
      });
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const Update_tasks = createAsyncThunk(
  "tasks/Update_tasks",
  async ({ inputs, id }, { rejectWithValue }) => {
    try {
      const responce = await axios.post(`${API_URL}/tasks/up/${id}`, inputs, {
        withCredentials: true,
      });
      if (responce.data.status === 200) {
        console.log("success" + responce.data.status);
        return responce.data;
      } else {
        console.log("erroes" + responce.data.status);
        return rejectWithValue(responce.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const initialState = {
  tasks: null,
  task: null,
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
      state.loading = true;
    },
    [all_tasks.fulfilled]: (state, actions) => {
      state.tasks = actions.payload.data;
      state.status = "success";
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [all_tasks.rejected]: (state, actions) => {
      state.error = actions.payload.message;
      state.status = "error";
    },

    // TaskAdd
    [TaskAdd.pending]: (state, actions) => {
      state.loading = true;
    },
    [TaskAdd.fulfilled]: (state, actions) => {
      state.tasks.push(actions.payload.data);
      state.status = actions.payload.status;
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [TaskAdd.rejected]: (state, actions) => {
      state.error = actions.payload.message;
      state.status = "error";
    },

    // edit_task
    [edit_task.pending]: (state, actions) => {
      state.loading = true;
    },
    [edit_task.fulfilled]: (state, actions) => {
      state.task = actions.payload.data;
      state.status = actions.payload.status;
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [edit_task.rejected]: (state, actions) => {
      state.error = actions.payload.message;
      state.status = "error";
    },

    // Update_tasks
    [Update_tasks.pending]: (state, actions) => {
      console.log(actions);
      state.loading = true;
    },
    [Update_tasks.fulfilled]: (state, actions) => {
      console.log(actions.payload);
      //state.task = actions.payload.data;
      state.status = 200;
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [Update_tasks.rejected]: (state, actions) => {
      console.log(actions);
      state.error = actions.payload.message;
      state.status = 401;
    },
  },
});

export const {} = TasksSlice.actions;
export default TasksSlice.reducer;
