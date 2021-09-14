import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { addNewPost } from "./profileSlice";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk(
  "posts/fetchPosts",
  async (arg, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch("http://localhost:8080/api/posts", {
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
  name: "posts",
  initialState: initialState,
  reducers: {
    resetPosts(state) {
      state.posts = []
      state.status = 'idle'
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const addPostAsync = (formData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch("http://localhost:8080/api/posts", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      body: formData,
    })

    if (response.ok) {
      const postDetail = await response.json()
      dispatch(addNewPost(postDetail))
    }
  }
}

export const { resetPosts } = dashboardSlice.actions;

export default dashboardSlice.reducer;
