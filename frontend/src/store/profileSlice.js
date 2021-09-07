import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userDetail: null,
  status: "idle",
  error: null
}

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (username, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch(`http://localhost:8080/api/users/${username}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const userDetail = await response.json();
      return userDetail;
    } else {
      throw new Error("Couldn't fetch profile")
    }
  }
)

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    addNewPost(state, action) {
      if (state.userDetail !== null) {
        state.userDetail.posts.unshift(action.payload)
      }
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded"
        state.userDetail = action.payload
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading"
      })
  }
})

export const { addNewPost } = profileSlice.actions

export default profileSlice.reducer