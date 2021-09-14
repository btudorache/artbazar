import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./authSlice";
import dashboardReducer from "./dashboardSlice";
import profileReducer from "./profileSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    dashboard: dashboardReducer,
    profile: profileReducer,
  },
});
