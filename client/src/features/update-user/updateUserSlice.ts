import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { RequestState, User } from "../../types/types";

type Props = {
  id: number;
  // jwt: string;
  data: User;
};

export const fetchUpdateUserSlice = createAsyncThunk(
  "updateUser/fetchUpdateUserSlice",
  async ({ id, data }: Props, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/update?id=${id}`,
        data,
        {
          headers: {
            "Content-Type": "application/json",
            // authorization: jwt,
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
};

const initialState: initialState = {
  status: "idle",
  error: null,
};

export const updateUserSlice = createSlice({
  name: "updateUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUpdateUserSlice.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchUpdateUserSlice.fulfilled, (state) => {
      state.status = `fulfilled`;
    });

    builder.addCase(fetchUpdateUserSlice.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string | null;
    });
  },
});
export default updateUserSlice.reducer;
export const updateUser = updateUserSlice.reducer;
