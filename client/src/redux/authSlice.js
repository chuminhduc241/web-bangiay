import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isLogged: false,
    isAdmin: false,
  },
  reducers: {
    loginSuccess: (state) => {
      state.isLogged = true;
    },
    logOut: (state) => {
      state.isLogged = false;
    },
    getUser: (state, action) => {
      const { user, isAdmin } = action.payload;
      state.user = user;
      state.isAdmin = isAdmin;
    },
  },
});
const { reducer, actions } = authSlice;
export const { loginSuccess, getUser, logOut } = actions;
export default reducer;
