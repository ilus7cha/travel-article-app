import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthResponse {
  jwt: string;
  user: User;
}

interface AuthState {
  token: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
}

interface LoginPayload {
  identifier: string;
  password: string;
}

interface RegisterPayload {
  email: string;
  password: string;
}

const initialState: AuthState = {
  token: localStorage.getItem("token") || null,
  user: null,
  loading: false,
  error: null,
};

export const login = createAsyncThunk<
  AuthResponse,
  LoginPayload,
  { rejectValue: string }
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch("https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.error?.message || "Login failed";
        return rejectWithValue(errorMsg);
      }
      localStorage.setItem("token", data.jwt);
      return data as AuthResponse;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

export const register = createAsyncThunk<
  AuthResponse,
  RegisterPayload,
  { rejectValue: string }
>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const res = await fetch("https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/auth/local/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) {
        const errorMsg = data.error?.message || "Register failed";
        return rejectWithValue(errorMsg);
      }
      localStorage.setItem("token", data.jwt);
      return data as AuthResponse;
    } catch {
      return rejectWithValue("Network error");
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.token = null;
      state.user = null;
      localStorage.removeItem("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.user = action.payload.user;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      })
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.token = action.payload.jwt;
        state.user = action.payload.user;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Unknown error";
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;