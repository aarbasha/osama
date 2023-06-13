import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const allusers = createAsyncThunk(
  "users/allusers",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/all`, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const AddUsers = createAsyncThunk(
  "users/AddUsers",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/add`, data, {
        withCredentials: true,
      });

      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const editUser = createAsyncThunk(
  "users/editUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/${id}`, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const UpdateUsers = createAsyncThunk(
  "users/UpdateUsers",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/users/up/${id}`, data, {
        withCredentials: true,
      });
      console.log(response.data);

      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "users/editUser",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/users/${id}`, {
        withCredentials: true,
      });

      console.log(response.data);

      /*   if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      } */
    } catch (error) {
      return rejectWithValue(error.data.message);
    }
  }
);

export const UserOnlineOffline = createAsyncThunk(
  "users/UserOnlineOffline",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/users/online`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  users: [],
  usersOnline: null,
  usersOffline: null,
  oldUser: null,
  status: null,
  error: null,
  success: null,
  loading: false,
  message: null,
};

const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: {
    //all users
    [allusers.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [allusers.fulfilled]: (state, actions) => {
      state.users = actions.payload.data;
      state.loading = false;
      state.status = "success";
    },
    [allusers.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "field";
      state.error = actions.payload.message;
    },
    //add users
    [AddUsers.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [AddUsers.fulfilled]: (state, actions) => {
      state.users.push(actions.payload.data);
      state.loading = false;
      state.status = "success";
      state.message = actions.payload.message;
    },
    [AddUsers.rejected]: (state, actions) => {
      state.users = actions.payload.data;
      state.loading = false;
      state.status = "field";
      state.error = actions.payload.message;
    },

    //edit users

    [editUser.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [editUser.fulfilled]: (state, actions) => {
      //console.log(actions.payload.data);
      state.oldUser = actions.payload.data;
      //state.oldUser.push(actions.payload.data);
      state.loading = false;
      state.status = "success";
      state.message = actions.payload.message;
    },
    [editUser.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "field";
      state.error = actions.payload.message;
    },

    // Update Users
    [UpdateUsers.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [UpdateUsers.fulfilled]: (state, actions) => {
      state.loading = false;
      state.status = "success";
      state.message = actions.payload.message;
    },
    [UpdateUsers.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "field";
      state.error = actions.payload.message;
    },

    // UserOnlineOffline

    [UserOnlineOffline.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [UserOnlineOffline.fulfilled]: (state, actions) => {
      state.loading = false;
      state.status = "success";
      state.usersOnline = actions.payload.online;
      state.usersOffline = actions.payload.offline;
    },
    [UserOnlineOffline.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "field";
    },
  },
});

export default UsersSlice.reducer;
