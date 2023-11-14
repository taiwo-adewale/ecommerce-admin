import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  sidebarOpen: boolean;
};

const initialState: InitialState = {
  sidebarOpen: false,
};

export const app = createSlice({
  name: "app",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    openSidebar: (state) => {
      state.sidebarOpen = true;
    },
    closeSidebar: (state) => {
      state.sidebarOpen = false;
    },
  },
});

export const { toggleSidebar, openSidebar, closeSidebar } = app.actions;
export default app.reducer;
