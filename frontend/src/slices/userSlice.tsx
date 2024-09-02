import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../store";
import userService from "../services/userService";

const initialState = {
  user: {},
  error: null as null | string, // Adjusted to handle string errors
  success: false,
  loading: false,
  message: null,
};

export const getUserInfo = createAsyncThunk(
  "user/info",
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const token = state.auth.user?.token;
    const data = await userService.getUserInfo(token);
    if (data.errors) {
      return thunkAPI.rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

export const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.loading = false;
      state.success = false;
      state.error = null; // Handle error assignment
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserInfo.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(getUserInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
