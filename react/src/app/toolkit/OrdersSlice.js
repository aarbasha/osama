import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `http://localhost:8000/api`;

export const all_Orders = createAsyncThunk(
  "orders/all_Orders",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await axios.get(`${API_URL}/orders/all`, {
        withCredentials: true,
      });
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
export const delete_Orders = createAsyncThunk(
  "orders/delete_Orders",
  async (id, { rejectWithValue }) => {
    try {
      const responce = await axios.delete(`${API_URL}/orders/${id}`, {
        withCredentials: true,
      });
      console.log(responce.data);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const create_tasks = createAsyncThunk(
  "orders/create_tasks",
  async ({ id, auther }, { rejectWithValue }) => {
    try {
      const responce = await axios.post(
        `${API_URL}/tasks/${id}`,
        { auther },
        {
          withCredentials: true,
        }
      );
      console.log(id + auther);
      return responce.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const add_Orders = createAsyncThunk(
  "orders/add_Orders",
  async (_, { rejectWithValue }) => {
    try {
    } catch (error) {}
  }
);

export const initialState = {
  orders: null,
  tasks: null,
  createBtnTasks: false,
  status: "loading",
  errors: null,
  message: null,
  loading: false,
};

export const OrdersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: {
    [all_Orders.pending]: (state, actions) => {
      state.loading = true;
    },
    [all_Orders.fulfilled]: (state, actions) => {
      state.orders = actions.payload.data;
      state.status = "success";
      state.message = actions.payload.message;
      state.loading = false;
    },
    [all_Orders.rejected]: (state, actions) => {
      state.error = actions.payload.message;
      state.status = "error";
    },

    [create_tasks.pending]: (state, actions) => {
      state.loading = true;
      state.createBtnTasks = false;
    },
    [create_tasks.fulfilled]: (state, actions) => {
      state.tasks = actions.payload.data;
      state.status = "success";
      state.createBtnTasks = true;
      state.message = actions.payload.message;
      state.loading = false;
    },
    [create_tasks.rejected]: (state, actions) => {
      state.error = actions.payload.message;
      state.status = "error";
    },
  },
});

export const {} = OrdersSlice.actions;
export default OrdersSlice.reducer;
