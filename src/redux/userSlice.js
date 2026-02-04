import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
  account: {
    access_token: "",
    username: "",
    role: "",
    email: "",
    image: "",
  },
  isLogin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    loginSuccess: (state, action) => {
      //   state.account.access_token = action.payload.DT.access_token;
      //   state.account.username = action.payload.DT.username;
      //   state.account.role = action.payload.DT.role;
      //   state.account.email = action.payload.DT.email;
      //   state.account.image = action.payload.DT.image;
      state.account = action.payload.DT;
      state.isLogin = true;
    },
    logout: () => INITIAL_STATE,
  },
});

export const { loginSuccess, logout } = userSlice.actions;
export default userSlice.reducer;
