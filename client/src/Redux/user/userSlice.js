import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
  error: null,
  loading: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logInStart: (state) => {
      state.loading = true;
    },
    logInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
      localStorage.setItem('token', action.payload.token);
    },
    logInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserStart: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state,action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      localStorage.removeItem('token');
    },
    logoutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    submitFormStart: (state) => {
      state.loading = true;
    },
    submitFormSuccess: (state,action) => {
      state.loading = false;
      state.error = null
    },
    submitFormFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { logInStart, logInSuccess, logInFailure, signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure,logoutUserFailure, logoutUserStart, logoutUserSuccess, submitFormStart, submitFormSuccess,submitFormFailure } = userSlice.actions;

export default userSlice.reducer;