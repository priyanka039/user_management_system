import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getUsers, addUser, updateUser, deleteUser } from '../api/usersApi';

export const fetchUsers = createAsyncThunk('users/fetchUsers', async (tenant_id, { rejectWithValue }) => {
  const response = await getUsers(tenant_id);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createUser = createAsyncThunk('users/createUser', async ({ tenant_id, user }, { rejectWithValue }) => {
  const response = await addUser(tenant_id, user);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editUser = createAsyncThunk('users/editUser', async ({ tenant_id, id, updates }, { rejectWithValue }) => {
  const response = await updateUser(tenant_id, id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removeUser = createAsyncThunk('users/removeUser', async ({ tenant_id, id }, { rejectWithValue }) => {
  const response = await deleteUser(tenant_id, id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editUser.fulfilled, (state, action) => {
        const idx = state.items.findIndex((u) => u.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeUser.fulfilled, (state, action) => {
        state.items = state.items.filter((u) => u.id !== action.payload);
      })
      .addCase(removeUser.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default usersSlice.reducer; 