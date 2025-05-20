import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Category {
  id: number;
  name: string;
  description: string;
}

interface RawCategory {
  id: number;
  attributes: {
    name: string;
    description: string;
  };
}

interface ApiResponse {
  data: RawCategory[];
}

interface CategoriesState {
  items: Category[];
  loading: boolean;
  error: string | null;
}

const initialState: CategoriesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchCategories = createAsyncThunk<
  Category[],
  void,
  { rejectValue: string }
>("categories/fetchCategories", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse>(
      "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/categories"
    );

    const categories = response.data.data.map((item) => ({
      id: item.id,
      name: item.attributes.name,
      description: item.attributes.description,
    }));

    return categories;
  } catch {
    return rejectWithValue("Failed to fetch categories");
  }
});

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategories.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch categories";
      });
  },
});

export default categoriesSlice.reducer;