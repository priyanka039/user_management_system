import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getLegalEntities, addLegalEntity, updateLegalEntity, deleteLegalEntity } from '../api/legalEntitiesApi';

export const fetchLegalEntities = createAsyncThunk('legalEntities/fetchLegalEntities', async (tenant_id, { rejectWithValue }) => {
  const response = await getLegalEntities(tenant_id);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const createLegalEntity = createAsyncThunk('legalEntities/createLegalEntity', async ({ tenant_id, entity }, { rejectWithValue }) => {
  const response = await addLegalEntity(tenant_id, entity);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const editLegalEntity = createAsyncThunk('legalEntities/editLegalEntity', async ({ tenant_id, id, updates }, { rejectWithValue }) => {
  const response = await updateLegalEntity(tenant_id, id, updates);
  if (!response.success) return rejectWithValue(response.message);
  return response.data;
});

export const removeLegalEntity = createAsyncThunk('legalEntities/removeLegalEntity', async ({ tenant_id, id }, { rejectWithValue }) => {
  const response = await deleteLegalEntity(tenant_id, id);
  if (!response.success) return rejectWithValue(response.message);
  return id;
});

const legalEntitiesSlice = createSlice({
  name: 'legalEntities',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLegalEntities.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLegalEntities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchLegalEntities.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })
      .addCase(createLegalEntity.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(createLegalEntity.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(editLegalEntity.fulfilled, (state, action) => {
        const idx = state.items.findIndex((e) => e.id === action.payload.id);
        if (idx !== -1) state.items[idx] = action.payload;
      })
      .addCase(editLegalEntity.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      })
      .addCase(removeLegalEntity.fulfilled, (state, action) => {
        state.items = state.items.filter((e) => e.id !== action.payload);
      })
      .addCase(removeLegalEntity.rejected, (state, action) => {
        state.error = action.payload || action.error.message;
      });
  },
});

export default legalEntitiesSlice.reducer; 