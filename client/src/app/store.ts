import { configureStore } from "@reduxjs/toolkit";
import { register } from "../features/register/registerSlice";
import { auth } from "../features/login/loginSlice";
import { current } from "../features/current/currentSlice";
import { users } from "../features/users/usersSlice";

export const store = configureStore({
  reducer: {
    register: register,
    auth: auth,
    current: current,
    users: users,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
