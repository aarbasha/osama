import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `http://localhost:8000/api`;
export const all_Posts = createAsyncThunk(
  "post/all_Posts",
  async (current_page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/posts/all?page=${current_page}`,
        {
          withCredentials: true,
        }
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const add_Posts = createAsyncThunk(
  "post/add_Posts",
  async (data, { rejectWithValue, getState, requestId, extra }) => {
    try {
      const response = await axios.post(`${API_URL}/posts/add`, data, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const { loaded, total } = progressEvent;
          const progress = Math.round((loaded / total) * 100);
          console.log(`File upload progress: ${progress}%`);
        },
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data);
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const edit_Posts = createAsyncThunk(
  "post/edit_Posts",
  async (id, { rejectWithValue, dispatch }) => {
    try {
      const response = await axios.get(`${API_URL}/posts/${id}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
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
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/posts/${id}`, {
        withCredentials: true,
      });
      console.log(response.data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delete_Image_Post_Edit = createAsyncThunk(
  "post/delete_Image_Post_Edit",
  async ({ id, name_folder }, { rejectWithValue, dispatch }) => {
    try {
      const responce = await axios.post(
        `${API_URL}/posts/deleteImage/${id}`,
        name_folder,
        { withCredentials: true }
      );
      console.log(responce);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const delete_Cover_Post_Edit = createAsyncThunk(
  "post/delete_Image_Post_Edit",
  async ({ id, name_folder }, { rejectWithValue, dispatch }) => {
    try {
      const responce = await axios.post(
        `${API_URL}/posts/deleteCover/${id}`,
        { id, name_folder },
        { withCredentials: true }
      );
      console.log(responce.data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const initialState = {
  posts: [],
  oldPost: null,
  imagesPost: null,
  loading: false,
  status: null,
  error: null,
  progress: 0,
  current_page: 1,
  total: 0,
  per_page: 5,
};
const PostSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      console.log(action.payload);
      state.current_page = action.payload;
    },
  },
  extraReducers: {
    [all_Posts.pending]: (state, actions) => {
      console.log(actions);

      /*   state.loading = true; */
    },
    [all_Posts.fulfilled]: (state, actions) => {
      console.log(actions.payload);
      state.posts = actions.payload.data.data;
      state.loading = false;
      state.error = null;
      state.current_page = actions.payload.data.current_page;
      state.total = actions.payload.data.total;
      state.per_page = actions.payload.data.per_page;
    },
    [all_Posts.rejected]: (state, actions) => {
      console.log(actions);
    },

    // add post
    [add_Posts.pending]: (state, actions) => {
      console.log(actions);
      state.loading = true;
      state.progress = 0;
    },
    [add_Posts.fulfilled]: (state, actions) => {
      console.log(actions.payload);
      state.status = actions.payload.status;
      state.loading = false;
      state.error = null;
    },
    [add_Posts.rejected]: (state, actions) => {
      console.log(actions);
      state.status = actions.payload.status;
      state.loading = false;
      state.error = actions.payload.message;
    },

    //edit_Posts
    [edit_Posts.pending]: (state, actions) => {
      state.loading = true;
      state.progress = 0;
    },
    [edit_Posts.fulfilled]: (state, actions) => {
      state.oldPost = actions.payload.data[0];
      state.imagesPost = actions.payload.data[1];
      state.loading = false;
      state.error = null;
    },
    [edit_Posts.rejected]: (state, actions) => {
      state.status = actions.payload.status;
      state.loading = false;
      state.error = actions.payload.message;
    },

    // delete_Posts
    [delete_Posts.pending]: (state, actions) => {
      console.log(actions);
      /*      state.loading = true;
      state.progress = 0; */
    },
    [delete_Posts.fulfilled]: (state, actions) => {
      console.log(actions.payload);
      /*   state.status = actions.payload.status;
      state.loading = false;
      state.error = null; */
    },
    [delete_Posts.rejected]: (state, actions) => {
      console.log(actions);
      /*   state.status = actions.payload.status;
      state.loading = false;
      state.error = actions.payload.message; */
    },
  },
});

export const { updateCurrentPage } = PostSlice.actions;

export default PostSlice.reducer;
