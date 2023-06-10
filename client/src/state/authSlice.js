/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";

const initialState = { user: null, token: null };

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    loggedInUser: null,
  },
  reducers: {
    login(state, { payload }) {
      state.user = payload.user;
      state.token = payload.token;
    },
    logout(state, { payload }) {
      return initialState;
      // console.log(state);
    },
    storeSurveysAction: (state, action) => {
      state.surveys = action.payload;
    },
    deleteSurveyAction: (state, action) => {
      state.surveys = state.surveys.filter(
        (survey) => survey.id !== action.payload
      );
    },
  },
});

// reducer
export const authReducer = authSlice.reducer;
// actions
export const { login, logout } = authSlice.actions;

// selectors
export const selectLoggedInUser = (state) => state.auth.user;
export const selectAuthToken = (state) => state.auth.token;

export const { storeSurveysAction, deleteSurveyAction } = authSlice.actions;
