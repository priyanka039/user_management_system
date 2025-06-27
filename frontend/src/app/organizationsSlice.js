import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getOrganizations, addOrganization, updateOrganization, deleteOrganization } from '../api/organizationsApi';

export const fetchOrganizations = createAsyncThunk('organizations/fetchOrganizations', async (tenant_id, { rejectWithValue }) => {
  const response = await getOrganizations(tenant_id);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createOrganization = createAsyncThunk('organizations/createOrganization', async ({ tenant_id, org }, { rejectWithValue }) => {
  const response = await addOrganization(tenant_id, org);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editOrganization = createAsyncThunk('organizations/editOrganization', async ({ tenant_id, id, updates }, { rejectWithValue }) => {
  const response = await updateOrganization(tenant_id, id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removeOrganization = createAsyncThunk('organizations/removeOrganization', async ({ tenant_id, id }, { rejectWithValue }) => {
  const response = await deleteOrganization(tenant_id, id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrganizations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchOrganizations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchOrganizations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createOrganization.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createOrganization.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editOrganization.fulfilled, (state, action) => {
        const idx = state.items.findIndex((o) => o.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editOrganization.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeOrganization.fulfilled, (state, action) => {
        state.items = state.items.filter((o) => o.id !== action.payload);
      })
      .addCase(removeOrganization.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default organizationsSlice.reducer; 