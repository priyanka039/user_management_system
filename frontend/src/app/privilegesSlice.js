import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getPrivileges, addPrivilege, updatePrivilege, deletePrivilege } from '../api/privilegesApi';

export const fetchPrivileges = createAsyncThunk('privileges/fetchPrivileges', async (tenant_id, { rejectWithValue }) => {
  const response = await getPrivileges(tenant_id);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createPrivilege = createAsyncThunk('privileges/createPrivilege', async ({ tenant_id, privilege }, { rejectWithValue }) => {
  const response = await addPrivilege(tenant_id, privilege);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editPrivilege = createAsyncThunk('privileges/editPrivilege', async ({ tenant_id, id, updates }, { rejectWithValue }) => {
  const response = await updatePrivilege(tenant_id, id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removePrivilege = createAsyncThunk('privileges/removePrivilege', async ({ tenant_id, id }, { rejectWithValue }) => {
  const response = await deletePrivilege(tenant_id, id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const privilegesSlice = createSlice({
  name: 'privileges',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPrivileges.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPrivileges.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchPrivileges.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createPrivilege.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createPrivilege.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editPrivilege.fulfilled, (state, action) => {
        const idx = state.items.findIndex((p) => p.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editPrivilege.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removePrivilege.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload);
      })
      .addCase(removePrivilege.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default privilegesSlice.reducer; 