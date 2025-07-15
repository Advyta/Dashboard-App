import { createSlice } from "@reduxjs/toolkit";
import { UserData } from "../types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface UserState {
  user: UserData | null;
  isAuthenticated: boolean;
  loading: "idle" | "pending" | "succeeded" | "failed";
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  loading: "idle",
};

// Fetch user by Id
export const fetchUserById = createAsyncThunk(
  "user/fetchUserbyId",
  async (id: string) => {
    const res = await axios.get(`/api/users/${id}`);
    return res.data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // set user
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    // update user
    updateUser: (state, action) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
    // logout
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
    // delete user
    deleteUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchUserById.pending, (state) => {
      state.loading = "pending";
    });
    builder.addCase(fetchUserById.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = "succeeded";
    });
    builder.addCase(fetchUserById.rejected, (state) => {
      state.loading = "failed";
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser, updateUser, logout, deleteUser } = userSlice.actions;
export default userSlice.reducer;
