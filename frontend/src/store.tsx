import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import taskReducer from "./slices/taskSlice";
import userReducer from "./slices/userSlice";

export const storeConfig = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
    user: userReducer,
  },
});

// Define RootState type
export type RootState = ReturnType<typeof storeConfig.getState>;
export type AppDispatch = typeof storeConfig.dispatch;
