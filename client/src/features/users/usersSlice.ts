import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { DataUser, RequestState } from "../../types/types";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async ({ jwt }: { jwt: string }, { rejectWithValue }) => {
    try {
      const response = await axios.get<DataUser[]>(`${BASE_URL}/api/users`, {
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
  users: DataUser[];
};

const initialState: initialState = {
  status: "idle",
  error: null,
  users: [],
};

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      state.status = `fulfilled`;
      state.users = action.payload;
    });

    builder.addCase(fetchUsers.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string | null;
    });
  },
});
export default usersSlice.reducer;
export const users = usersSlice.reducer;
