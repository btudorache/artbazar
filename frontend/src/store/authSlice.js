import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

import jwtParser from '../utils/jwtUtils'
import { resetPosts } from "./postsSlice";

const localStorage = window.localStorage

const getInitialState = () => {
  const jwtToken = localStorage.getItem('token')

  if (jwtToken !== null) {
    const parsedJwt = jwtParser(jwtToken)
    const hasExpired = Date.now() > parsedJwt.exp * 1000

    if (!hasExpired) {
      return {
        isLogged: true,
        token: jwtToken,
        username: parsedJwt.sub,
        usertype: parsedJwt.user_type,
        status: "succeeded",
        error: null
      }
    } else {
      localStorage.removeItem('token')
    }
  
  }

  return {
    isLogged: false,
    token: null,
    username: null,
    usertype: null,
    status: "idle",
    error: null,
  };
};

export const authenticate = createAsyncThunk(
  "auth/fetchAuthData",
  async (authData, thunkAPI) => {
    const response = await fetch("http://localhost:8080/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(authData),
    });

    const data = await response.json();
    if (response.ok) {
      const token = data.access_token
      localStorage.setItem('token', token)
      return token;
    } else {
      return thunkAPI.rejectWithValue(data.message);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {
    logoutUser(state) {
        state.isLogged = false
        state.token = null
        state.username = null
        state.usertype = null
        state.status = "idle"
        state.error = null
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        const jwtToken = action.payload
        const parsedJwt = jwtParser(jwtToken)

        state.isLogged = true;
        state.token = jwtToken;
        state.username = parsedJwt.sub
        state.usertype = parsedJwt.user_type
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status = "failed";
        if (action.payload === undefined) {
          state.error = action.error.message
        } else {
          state.error = action.payload;
        }
      })
      .addCase(authenticate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export const logoutThunk = () => {
  return (dispatch) => {
    localStorage.removeItem('token')
    dispatch(resetPosts())
    dispatch(logoutUser())
  }
}

export const { logoutUser } = authSlice.actions

export default authSlice.reducer;
