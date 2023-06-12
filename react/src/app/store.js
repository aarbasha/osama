import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./toolkit/AuthSlice";
import CategorieSlice from "./toolkit/CategorieSlice";
import UsersSlice from "./toolkit/UsersSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    categories: CategorieSlice,
    users: UsersSlice,
  },
});
