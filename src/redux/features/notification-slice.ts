import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Notification } from "@/types/notifications";

import testImg from "public/test/notification-img.jpg";
import testImg2 from "public/test/notification-img-2.jpg";

type InitialState = {
  notifications: Notification[];
};

// these are dummy notifications until the real list is gotten from the database
const initialState: InitialState = {
  notifications: [
    {
      id: "jedjdfjk",
      imageUrl: testImg.src,
      item: "Logitech Keyboard",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "stock-out",
    },
    {
      id: "jedjdfjk",
      imageUrl: testImg.src,
      item: "Logitech Keyboard",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "stock-out",
    },
    {
      id: "jedjdfjkdsds",
      imageUrl: testImg2.src,
      name: "Charles Lore",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "new-order",
      price: 300,
    },
    {
      id: "jedfbdsge",
      imageUrl: testImg.src,
      item: "Hisense Smart TV",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "stock-out",
    },
    {
      id: "jnwerewwer",
      imageUrl: testImg2.src,
      item: "iPhone XR",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "stock-out",
    },
    {
      id: "jreaeggffg",
      imageUrl: testImg.src,
      name: "Luffy Uzumaki",
      timestamp: "Dec 12 2021 - 12:40PM",
      type: "new-order",
      price: 300,
    },
  ],
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
