import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getRoles, addRole, updateRole, deleteRole } from '../api/rolesApi';

export const fetchRoles = createAsyncThunk('roles/fetchRoles', async (tenant_id, { rejectWithValue }) => {
  const response = await getRoles(tenant_id);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createRole = createAsyncThunk('roles/createRole', async ({ tenant_id, role }, { rejectWithValue }) => {
  const response = await addRole(tenant_id, role);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editRole = createAsyncThunk('roles/editRole', async ({ tenant_id, id, updates }, { rejectWithValue }) => {
  const response = await updateRole(tenant_id, id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removeRole = createAsyncThunk('roles/removeRole', async ({ tenant_id, id }, { rejectWithValue }) => {
  const response = await deleteRole(tenant_id, id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const rolesSlice = createSlice({
  name: 'roles',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRoles.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchRoles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createRole.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createRole.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editRole.fulfilled, (state, action) => {
        const idx = state.items.findIndex((r) => r.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editRole.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeRole.fulfilled, (state, action) => {
        state.items = state.items.filter((r) => r.id !== action.payload);
      })
      .addCase(removeRole.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default rolesSlice.reducer; 