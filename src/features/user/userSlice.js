import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("stylehub_user");
const storedToken = localStorage.getItem("stylehub_token");

const userSlice = createSlice({
  name: "user",
  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null,
    token: storedToken || null,
    isLoggedIn: !!storedToken,
  },
  reducers: {
    login: (state, action) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isLoggedIn = true;
      localStorage.setItem("stylehub_user", JSON.stringify(user));
      localStorage.setItem("stylehub_token", token);
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem("stylehub_user");
      localStorage.removeItem("stylehub_token");
    },
    updateProfile: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
        localStorage.setItem("stylehub_user", JSON.stringify(state.user));
      }
    },
  },
});

export const { login, logout, updateProfile } = userSlice.actions;
export default userSlice.reducer;
