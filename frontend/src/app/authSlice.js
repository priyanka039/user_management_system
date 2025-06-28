import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { mockLogin, mockRefreshToken, mockLogout, isTokenExpired, getTokenPayload } from '../api/mockApi';

// Token storage utilities
const TOKEN_KEY = 'ums_access_token';
const REFRESH_TOKEN_KEY = 'ums_refresh_token';
const USER_KEY = 'ums_user';

const saveTokens = (accessToken, refreshToken, user) => {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

const clearTokens = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
};

const getStoredTokens = () => {
  const accessToken = localStorage.getItem(TOKEN_KEY);
  const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);
  const user = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
  return { accessToken, refreshToken, user };
};

export const login = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await mockLogin(credentials);
    if (!response.success) {
      return rejectWithValue(response.error?.message || response.message);
    }
    
    // Save tokens to localStorage
    saveTokens(
      response.data.access_token,
      response.data.refresh_token,
      response.data
    );
    
    return response.data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const refreshToken = createAsyncThunk('auth/refreshToken', async (_, { getState, rejectWithValue }) => {
  try {
    const { refreshToken: storedRefreshToken } = getStoredTokens();
    
    if (!storedRefreshToken) {
      throw new Error('No refresh token available');
    }
    
    const response = await mockRefreshToken(storedRefreshToken);
    if (!response.success) {
      clearTokens();
      throw new Error(response.error?.message || response.message);
    }
    
    // Update stored tokens
    const { user } = getStoredTokens();
    saveTokens(
      response.data.access_token,
      storedRefreshToken,
      user
    );
    
    return response.data;
  } catch (error) {
    clearTokens();
    return rejectWithValue(error.message);
  }
});

export const logout = createAsyncThunk('auth/logout', async (_, { rejectWithValue }) => {
  try {
    await mockLogout();
    clearTokens();
    return null;
  } catch (error) {
    clearTokens(); // Clear tokens even if logout API fails
    return rejectWithValue(error.message);
  }
});

// Initialize state from localStorage
const initializeAuthState = () => {
  const { accessToken, refreshToken, user } = getStoredTokens();
  
  if (accessToken && user && !isTokenExpired(accessToken)) {
    return {
      user,
      token: accessToken,
      refreshToken,
      loading: false,
      error: null,
      isAuthenticated: true
    };
  }
  
  // Clear invalid tokens
  if (accessToken || refreshToken) {
    clearTokens();
  }
  
  return {
    user: null,
    token: null,
    refreshToken: null,
    loading: false,
    error: null,
    isAuthenticated: false
  };
};

const initialState = initializeAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError(state) {
      state.error = null;
    },
    checkTokenExpiration(state) {
      if (state.token && isTokenExpired(state.token)) {
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        clearTokens();
      }
    }
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.token = action.payload.access_token;
        state.refreshToken = action.payload.refresh_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
        state.isAuthenticated = false;
      })
      
      // Refresh Token
      .addCase(refreshToken.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(refreshToken.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.access_token;
        state.isAuthenticated = true;
        state.error = null;
      })
      .addCase(refreshToken.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      })
      
      // Logout
      .addCase(logout.pending, (state) => {
        state.loading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.token = null;
        state.refreshToken = null;
        state.isAuthenticated = false;
        state.error = action.payload || action.error.message;
      });
  },
});

export const { clearError, checkTokenExpiration } = authSlice.actions;

// Selectors
export const selectAuth = (state) => state.auth;
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectUser = (state) => state.auth.user;
export const selectToken = (state) => state.auth.token;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;

export default authSlice.reducer; 