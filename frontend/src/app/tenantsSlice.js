import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTenants, addTenant, updateTenant, deleteTenant } from '../api/tenantsApi';

export const fetchTenants = createAsyncThunk('tenants/fetchTenants', async (_, { rejectWithValue }) => {
  const response = await getTenants();
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createTenant = createAsyncThunk('tenants/createTenant', async (tenant, { rejectWithValue }) => {
  const response = await addTenant(tenant);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editTenant = createAsyncThunk('tenants/editTenant', async ({ id, updates }, { rejectWithValue }) => {
  const response = await updateTenant(id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removeTenant = createAsyncThunk('tenants/removeTenant', async (id, { rejectWithValue }) => {
  const response = await deleteTenant(id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const tenantsSlice = createSlice({
  name: 'tenants',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTenants.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTenants.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchTenants.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createTenant.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createTenant.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editTenant.fulfilled, (state, action) => {
        const idx = state.items.findIndex((t) => t.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editTenant.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeTenant.fulfilled, (state, action) => {
        state.items = state.items.filter((t) => t.id !== action.payload);
      })
      .addCase(removeTenant.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default tenantsSlice.reducer; 