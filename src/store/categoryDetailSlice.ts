import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

export interface Category {
  id: number;
  name: string;
  description: string;
}

interface CategoryDetailState {
  item: Category | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryDetailState = {
  item: null,
  loading: false,
  error: null,
};

export const fetchCategoryById = createAsyncThunk<
  Category,
  number,
  { rejectValue: string }
>(
  'categoryDetail/fetchById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get<{ data: { id: number; attributes: { name: string; description: string } } }>(
        `https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories/${id}`
      );

      const data = response.data.data;
      return {
        id: data.id,
        name: data.attributes.name,
        description: data.attributes.description,
      };
    } catch {
      return rejectWithValue('Failed to fetch category');
    }
  }
);

const categoryDetailSlice = createSlice({
  name: 'categoryDetail',
  initialState,
  reducers: {
    clearCategoryDetail(state) {
      state.item = null;
      state.error = null;
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryById.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.item = null;
      })
      .addCase(fetchCategoryById.fulfilled, (state, action: PayloadAction<Category>) => {
        state.loading = false;
        state.item = action.payload;
      })
      .addCase(fetchCategoryById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? 'Failed to fetch category';
      });
  },
});

export const { clearCategoryDetail } = categoryDetailSlice.actions;

export default categoryDetailSlice.reducer;