import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchExplorePosts = createAsyncThunk(
  "explore/fetchExplorePosts",
  async (category, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const url =
      category === "UNSELECTED"
        ? "http://localhost:8080/api/posts/explore"
        : `http://localhost:8080/api/posts/explore?category=${category}`;
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const posts = await response.json();
      return posts;
    } else {
      throw new Error("Couldn't fetch posts");
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: initialState,
  reducers: {
    resetExplorePosts(state) {
      state.posts = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplorePosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.status = "succeeded";
      })
      .addCase(fetchExplorePosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchExplorePosts.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const { resetExplorePosts } = exploreSlice.actions;

export default exploreSlice.reducer;
