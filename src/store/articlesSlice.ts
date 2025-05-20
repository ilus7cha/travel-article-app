import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

export interface Article {
  id: number;
  title: string;
  content: string;
  author: string;
  createdAt: string;
}

interface RawArticle {
  id: number;
  attributes: {
    title: string;
    content: string;
    author: string;
    createdAt: string;
  };
}

interface ApiResponse {
  data: RawArticle[];
}

interface ArticlesState {
  items: Article[];
  loading: boolean;
  error: string | null;
}

const initialState: ArticlesState = {
  items: [],
  loading: false,
  error: null,
};

export const fetchArticles = createAsyncThunk<
  Article[],
  void,
  { rejectValue: string }
>("articles/fetchArticles", async (_, { rejectWithValue }) => {
  try {
    const response = await axios.get<ApiResponse>(
      "https://extra-brooke-yeremiadio-46b2183e.koyeb.app/api/articles?populate=*"
    );
    const articles = response.data.data.map((item) => ({
      id: item.id,
      title: item.attributes.title,
      content: item.attributes.content,
      author: item.attributes.author,
      createdAt: item.attributes.createdAt,
    }));
    return articles;
  } catch {
    return rejectWithValue("Failed to fetch articles");
  }
});

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action: PayloadAction<Article[]>) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ?? "Failed to fetch articles";
      });
  },
});

export default articlesSlice.reducer;