import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { RequestState } from "../../types/types";

export const fetchDeleteUserSlice = createAsyncThunk(
  "deleteUser/fetchDeleteUserSlice",
  async ({ jwt, id }: { jwt: string; id: number }, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/user?id=${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: jwt,
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

export const deleteUserSlice = createSlice({
  name: "deleteUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDeleteUserSlice.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchDeleteUserSlice.fulfilled, (state) => {
      state.status = `fulfilled`;
    });

    builder.addCase(fetchDeleteUserSlice.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string | null;
    });
  },
});
export default deleteUserSlice.reducer;
export const deleteUser = deleteUserSlice.reducer;
