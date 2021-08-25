import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

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
      const data = await response.json();
      return data;
    }
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState: initialState,
  reducers: {
    addPost(state, action) {
      state.posts.push(action.payload);
    },
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
      .addCase(fetchPosts.rejected, (state) => {
        state.status = "failed";
        state.error = "Couldn't fetch posts";
      })
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { addPost, resetPosts } = postsSlice.actions;

export default postsSlice.reducer;