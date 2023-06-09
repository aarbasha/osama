import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const login = createAsyncThunk(
  "auth/login",
  async (inputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/login`, inputs, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  async (inputs, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/register`, inputs, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const profile = createAsyncThunk(
  "auth/profile",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/profile`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const Logout = createAsyncThunk(
  "auth/Logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  user: null,
  token: null,
  status: "xxxx",
  success: null,
  loading: false,
  error: null,
  isAuth: false,
};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    //login
    [login.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
      state.isAuth = false;
    },
    [login.fulfilled]: (state, actions) => {
    
      state.loading = false;
      state.status = "succeeded";
      state.success = "successfyle login ...";
      state.user = actions.payload.user;
      state.token = actions.payload.token;
      state.error = null;
      state.isAuth = true;
    },
    [login.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "failed";
      state.error = actions.payload.message;
      state.isAuth = false;
    },

    //register
    [register.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
    },
    [register.fulfilled]: (state, actions) => {
    
      state.user = actions.payload.data;
      state.loading = false;
      state.status = actions.payload.status;
      state.success = true;
      state.error = actions.payload.message;
    },
    [register.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "failed";
      state.error = actions.payload.message;
    },

    //profile

    [profile.pending]: (state, actions) => {
  
      state.loading = true;
      state.status = "loading";
      state.isAuth = false;
    },
    [profile.fulfilled]: (state, actions) => {
 
      state.loading = false;
      state.status = "succeeded";
      state.user = actions.payload;
      state.error = null;
      state.isAuth = true;
    },
    [profile.rejected]: (state, actions) => {
 
      state.loading = false;
      state.status = "failed";
      state.error = actions.payload.message;
      state.isAuth = false;
    },

    //logout
    [Logout.pending]: (state, actions) => {
      state.loading = true;
      state.status = "loading";
      state.isAuth = false;
    },
    [Logout.fulfilled]: (state, actions) => {
      state.loading = false;
      state.status = "succeeded";
      state.success = "successfyle logout ...";
      state.error = null;
      state.isAuth = false;
    },
    [Logout.rejected]: (state, actions) => {
      state.loading = false;
      state.status = "failed";
      state.error = actions.payload.message;
      state.isAuth = false;
    },
  },
});

export default AuthSlice.reducer;


