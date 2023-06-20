import { configureStore } from "@reduxjs/toolkit";
import AuthSlice from "./toolkit/AuthSlice";
import CategorieSlice from "./toolkit/CategorieSlice";
import UsersSlice from "./toolkit/UsersSlice";
import PostSlice from "./toolkit/PostSlice";
import GlobalSlice from "./toolkit/GlobalSlice";
import OrdersSlice from './toolkit/OrdersSlice';
import TasksSlice from "./toolkit/TasksSlice";

export const store = configureStore({
  reducer: {
    auth: AuthSlice,
    categories: CategorieSlice,
    users: UsersSlice,
    post: PostSlice,
    global:GlobalSlice,
    orders:OrdersSlice,
    tasks:TasksSlice
  },
});
