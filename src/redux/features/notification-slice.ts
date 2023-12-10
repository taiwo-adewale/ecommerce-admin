import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Notification } from "@/types/notifications";

// dummy notifications
import { testNotifications } from "@/test-files/notifications";

type InitialState = {
  notifications: Notification[];
};

const initialState: InitialState = {
  notifications: testNotifications,
};

export const notifications = createSlice({
  name: "notifications",
  initialState,
  reducers: {
    deleteNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter(
        (notification) => notification.id !== action.payload
      );
    },
  },
});

export const { deleteNotification } = notifications.actions;
export default notifications.reducer;
