import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth-slice";
import notificationsReducer from "./features/notification-slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    notifications: notificationsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
