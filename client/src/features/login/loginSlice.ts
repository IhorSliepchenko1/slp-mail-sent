import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { BASE_URL } from "../../api/constant";
import { RequestState } from "../../types/types";
import { RootState } from "../../app/store";

type Data = {
  login: string;
  password: string;
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (data: Data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/login`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      return response.data;
    } catch (error) {
      const errorResponse = error as AxiosError;
      return rejectWithValue(errorResponse.response?.data);
    }
  }
);

type initialState = {
  status: RequestState;
  error: string;
  current?: {
    token: string;
    userId: number;
  } | null;
};

const initialState: initialState = {
  status: "idle",
  error: "",
  current: JSON.parse(localStorage.getItem(`current`) as string) || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem(`current`);
      state.status = "idle";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUser.pending, (state) => {
      state.status = "pending";
    });

    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.status = action.payload ? `fulfilled` : `idle`;
      localStorage.setItem(`current`, JSON.stringify(action.payload));
      state.current = action.payload;
    });

    builder.addCase(fetchUser.rejected, (state, action) => {
      state.status = "rejected";
      state.error = action.payload as string;
    });
  },
});

export const auth = userSlice.reducer;
export const { logout } = userSlice.actions;
export const selectIsAuthenticated = (state: RootState) => !!state.auth.current;
