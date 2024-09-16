import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { RequestState, User } from "../../types/types";

export const fetchRegister = createAsyncThunk(
  "register/fetchRegister",
  async (data: User, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/register`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      const errorResponse = error as AxiosError;
      return rejectWithValue(errorResponse.message);
    }
  }
);

type initialState = {
  status: RequestState;
  error: string | null;
};

const initialState: initialState = {
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "register",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRegister.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchRegister.fulfilled, (state) => {
      state.status = `fulfilled`;
    });

    builder.addCase(fetchRegister.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string | null;
    });
  },
});
export default userSlice.reducer;
export const register = userSlice.reducer;
