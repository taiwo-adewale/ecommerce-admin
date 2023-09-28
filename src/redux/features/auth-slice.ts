import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  value: AuthState;
};

type AuthState = {
  isAuth: boolean;
  username: string;
  uid: string;
  isAdmin: boolean;
};

const initialState: InitialState = {
  value: {
    isAuth: false,
    username: "",
    uid: "",
    isAdmin: false,
  },
};

export const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut: () => {
      return initialState;
    },

    logIn: (_, action: PayloadAction<string>) => {
      return {
        value: {
          isAuth: true,
          username: action.payload,
          uid: "test2345",
          isAdmin: false,
        },
      };
    },

    toggleAdmin: (state) => {
      state.value.isAdmin = !state.value.isAdmin;
    },
  },
});

export const { logIn, logOut, toggleAdmin } = auth.actions;
export default auth.reducer;
