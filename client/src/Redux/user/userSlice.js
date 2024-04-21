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
    signInStart: (state) => {
      state.loading = true;
    },
    signInSuccess: (state, action) => {
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    signInFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserStart: (state) => {
      state.loading = true;
    },
    deleteUserSuccess: (state,action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null
    },
    deleteUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    logoutUserStart: (state) => {
      state.loading = true;
    },
    logoutUserSuccess: (state,action) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null
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
export const { signInStart, signInSuccess, signInFailure, updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess,logoutUserFailure, logoutUserStart, logoutUserSuccess, submitFormStart, submitFormSuccess,submitFormFailure } = userSlice.actions;

export default userSlice.reducer;