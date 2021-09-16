import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  posts: [],
  postsStatus: "idle",
  postsError: null,
  users: [],
  usersStatus: "idle",
  usersError: null
}

export const fetchExplorePosts = createAsyncThunk(
  "explore/fetchExplorePosts",
  async (arg, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch("http://localhost:8080/api/posts/explore", {
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

export const fetchExploreUsers = createAsyncThunk(
  "explore/fetchExploreUsers",
  async (queryUsername, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch(`http://localhost:8080/api/users/search?username=${queryUsername}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const users = await response.json();
      return users;
    } else {
      throw new Error("Couldn't fetch users")
    }
  }
);

const exploreSlice = createSlice({
  name: "explore",
  initialState: initialState,
  reducers: {
    resetExplorePosts(state) {
      state.posts = []
      state.postsStatus = 'idle'
      state.postsError = null
    },
    resetExploreUsers(state) {
      state.users = []
      state.usersStatus = 'idle'
      state.usersError = null
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchExplorePosts.fulfilled, (state, action) => {
        state.posts = action.payload;
        state.postsStatus = "succeeded";
      })
      .addCase(fetchExplorePosts.rejected, (state, action) => {
        state.postsStatus = "failed";
        state.postsError = action.error.message;
      })
      .addCase(fetchExplorePosts.pending, (state) => {
        state.postsStatus = "loading";
      })
      .addCase(fetchExploreUsers.fulfilled, (state, action) => {
        state.users = action.payload;
        state.usersStatus = "succeeded";
      })
      .addCase(fetchExploreUsers.rejected, (state, action) => {
        state.usersStatus = "failed";
        state.usersError = action.error.message;
      })
      .addCase(fetchExploreUsers.pending, (state) => {
        state.usersStatus = "loading";
      });
  }
})

export const { resetExplorePosts, resetExploreUsers } = exploreSlice.actions

export default exploreSlice.reducer