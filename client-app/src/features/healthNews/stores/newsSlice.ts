// src/features/healthNews/stores/newsSlice.ts
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCombinedNews } from "../api/newsApi";
import { Article } from "../types";

type State = {
  items: Article[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error?: string;
};
const initialState: State = { items: [], status: "idle" };

export const loadNews = createAsyncThunk<Article[], number | undefined, { rejectValue: string }>(
  "news/load",
  async (limit = 25, { rejectWithValue }) => {
    try { return await fetchCombinedNews(limit); }
    catch (e: any) { return rejectWithValue(e?.message ?? "Failed to load news"); }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(loadNews.pending, (s) => { s.status = "loading"; s.error = undefined; });
    b.addCase(loadNews.fulfilled, (s, a: PayloadAction<Article[]>) => {
      s.status = "succeeded"; s.items = a.payload;
    });
    b.addCase(loadNews.rejected, (s, a) => {
      s.status = "failed"; s.error = a.payload ?? "Unknown error";
    });
  }
});

export default newsSlice.reducer;
