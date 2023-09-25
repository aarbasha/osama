import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:8000/api";

export const Categories = createAsyncThunk(
  "categorie/Categories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories/categories`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const All_Categories = createAsyncThunk(
  "categorie/All_Categories",
  async (current_page, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${API_URL}/categories/sub?page=${current_page}`,
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

export const add_Categories = createAsyncThunk(
  "categorie/add_Categories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/categories/add`, data, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_subCategories = createAsyncThunk(
  "categorie/add_subCategories",
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/categories/addsub`, data, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteCategorie = createAsyncThunk(
  "categorie/deleteCategorie",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${API_URL}/categories/${id}`, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const editCategories = createAsyncThunk(
  "categorie/editCategories",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/categories/${id}`, {
        withCredentials: true,
      });
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateCategories = createAsyncThunk(
  "categorie/updateCategories",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axios.post(
        `${API_URL}/categories/up/${id}`,
        data,
        {
          withCredentials: true,
        }
      );
      if (response.data.status === 200) {
        return response.data;
      } else {
        return rejectWithValue(response.data.message);
      }
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  all_categories: [],
  old_categories: [],
  children: [],
  status: null,
  loading: false,
  success: false,
  error: null,
  message: null,
  current_page: 1,
  total: 0,
  per_page: 5,
};

export const CategorieSlice = createSlice({
  name: "categorie",
  initialState,
  reducers: {
    updateCurrentPage: (state, action) => {
      console.log(action.payload);
      state.current_page = action.payload;
    },
    insertchildren: (state, action) => {
      state.children.push(action.payload);
      console.log(action.payload);
    },
  },
  extraReducers: {
    [Categories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [Categories.fulfilled]: (state, actions) => {
      state.all_categories = actions.payload.data;
      state.loading = false;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [Categories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
    },

    //all_Categories
    [All_Categories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [All_Categories.fulfilled]: (state, actions) => {
      state.all_categories = actions.payload.data.data;
      state.loading = false;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
      state.current_page = actions.payload.data.current_page;
      state.total = actions.payload.data.total;
      state.per_page = actions.payload.data.per_page;
    },
    [All_Categories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
    },

    //Add_Categories
    [add_Categories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [add_Categories.fulfilled]: (state, actions) => {
      state.all_categories.push(actions.payload.data);
      state.loading = false;
      state.success = true;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [add_Categories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
      state.error = actions.payload;
    },

    //Add_SUBCategories
    [add_subCategories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [add_subCategories.fulfilled]: (state, actions) => {
      state.all_categories.push(actions.payload.data);
      state.loading = false;
      state.success = true;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [add_subCategories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
      state.error = actions.payload;
    },

    //Delete Categories
    [deleteCategorie.pending]: (state, actions) => {
      console.log(actions.payload);
      state.status = "pending";
      state.loading = true;
    },
    [deleteCategorie.fulfilled]: (state, actions) => {
      console.log(actions.payload);

      // state.filter((item) => item.id !== action.payload);
      // state.all_categories.filter((id) => id !== actions.payload);
      state.loading = false;
      state.success = true;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [deleteCategorie.rejected]: (state, actions) => {
      console.log(actions.payload);
      /*   state.loading = true;
      state.status = "filed";
      state.error = actions.payload; */
    },

    //edit Categories
    [editCategories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [editCategories.fulfilled]: (state, actions) => {
      state.old_categories = actions.payload.data[0];
      state.loading = false;
      state.success = true;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [editCategories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
      state.error = actions.payload.message;
    },

    //update Categories
    [updateCategories.pending]: (state, actions) => {
      state.status = "pending";
      state.loading = true;
    },
    [updateCategories.fulfilled]: (state, actions) => {
      state.loading = false;
      state.success = true;
      state.status = actions.payload.status;
      state.message = actions.payload.message;
    },
    [updateCategories.rejected]: (state, actions) => {
      state.loading = true;
      state.status = "filed";
      state.error = actions.payload.message;
    },
  },
});

export const { updateCurrentPage, insertchildren } = CategorieSlice.actions;

export default CategorieSlice.reducer;
