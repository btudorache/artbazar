import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addNewPost } from "./profileSlice";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchDashboardPosts = createAsyncThunk(
  "dashboard/fetchDashboardPosts",
  async (arg, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch("http://localhost:8080/api/posts/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      throw new Error("Couldn't fetch posts")
    }
  }
);

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState: initialState,
  reducers: {
    resetDashboardPosts(state) {
      state.posts = []
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchDashboardPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchDashboardPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchDashboardPosts.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { resetDashboardPosts: resetDashboardPosts } = dashboardSlice.actions;

export default dashboardSlice.reducer;
