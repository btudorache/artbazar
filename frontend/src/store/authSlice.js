import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const getInitialState = () => {
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
      return data.access_token;
    } else {
      return thunkAPI.rejectWithValue(data.error);
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: getInitialState(),
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.fulfilled, (state, action) => {
        state.isLogged = true;
        state.token = action.payload;
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(authenticate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(authenticate.pending, (state) => {
        state.status = "loading";
        state.error = null;
      });
  },
});

export default authSlice.reducer;
