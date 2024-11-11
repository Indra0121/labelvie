import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = import.meta.env.VITE_REACT_APP_BASE_URL;

export const authenticateUser = createAsyncThunk(
  "global/authenticateUser",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${baseUrl}/api/loginmagasin.php`, {
        email: email,
        password: password,
      });

      // Assuming the response has the structure { user_id, email, password, status }
      return response.data; 
    } catch (error) {
      if (error.response) {
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue({
          message: "Network error or server not responding",
        });
      }
    }
  }
);

const initialState = {
  mode: "dark",
  userId: null, // Changed from adminId to userId
  email: null,
  password: null,
  status: 0, // Binary value (0 or 1)
  isAuthenticated: false,
  loading: false, // Changed status to loading
  error: null,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
    },
    logout: (state) => {
      state.userId = null;
      state.email = null;
      state.password = null;
      state.status = null; // Reset status to 0 on logout
      state.isAuthenticated = false;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticateUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticateUser.fulfilled, (state, { payload }) => {
        const { user_id, email, password, status } = payload; // Destructure the payload to get user info

        state.userId = user_id; // Store the user_id in the state
        state.email = email; // Store the email in the state
        state.password = password; // Store the password in the state (consider security implications)
        state.status = status; // Store the status (0 or 1) in the state
        state.isAuthenticated = true;
        state.loading = false; // Set loading to false on success
      })
      .addCase(authenticateUser.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false; // Set loading to false on error
      });
  },
});

export const { setMode, logout } = globalSlice.actions;
export default globalSlice.reducer;
