import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { DataUser, RequestState } from "../../types/types";

export const fetchCurrent = createAsyncThunk(
  "current/fetchCurrent",
  async ({ jwt, id }: { id: number; jwt: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get<DataUser>(
        `${BASE_URL}/api/current?id=${id}`,
        {
          headers: {
            "Content-Type": "application/json",
            authorization: jwt,
          },
        }
      );

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
  user: DataUser | null;
};

const initialState: initialState = {
  status: "idle",
  error: null,
  user: null,
};

export const currentSlice = createSlice({
  name: "current",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrent.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchCurrent.fulfilled, (state, action) => {
      state.status = `fulfilled`;
      state.user = action.payload;
    });

    builder.addCase(fetchCurrent.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string | null;
    });
  },
});
export default currentSlice.reducer;
export const current = currentSlice.reducer;
