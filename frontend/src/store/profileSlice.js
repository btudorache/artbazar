import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  userDetail: null,
  status: "idle",
  error: null,
};

export const fetchProfile = createAsyncThunk(
  "profile/fetchProfile",
  async (args, thunkAPI) => {
    const auth = thunkAPI.getState().auth;
    const token = auth.token
    const username = auth.username
    
    const response = await fetch(
      `http://localhost:8080/api/users/${username}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      const userDetail = await response.json();
      return userDetail;
    } else {
      throw new Error("Couldn't fetch profile");
    }
  }
);

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    addNewPost(state, action) {
      if (state.userDetail !== null) {
        state.userDetail.posts.unshift(action.payload);
      }
    },
    resetProfile(state) {
      state.userDetail = null;
      state.status = "idle";
      state.error = null;
    },
    editProfile(state, action) {
      const profileData = action.payload;
      state.userDetail.name = profileData.name;
      state.userDetail.location = profileData.location;
      state.userDetail.description = profileData.description;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userDetail = action.payload;
      })
      .addCase(fetchProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchProfile.pending, (state) => {
        state.status = "loading";
      });
  },
});

export const addPostAsync = (formData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token
    const response = await fetch("http://localhost:8080/api/posts/artpost", {
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

export const editProfileThunk = (formData) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch("http://localhost:8080/api/users/edit", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const profileData = await response.json();
      dispatch(editProfile(profileData));
    }
  };
};

export const { addNewPost, resetProfile, editProfile } = profileSlice.actions;

export default profileSlice.reducer;
