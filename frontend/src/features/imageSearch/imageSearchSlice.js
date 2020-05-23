import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  images: [],
  page: null,
  total: null,
  totalPages: null
};

export const searchImages = createAsyncThunk(
  'imageSearch/searchImages',
  async ({query, page = 1, perPage = 10}) => {
    const response = await axios.get('/api/mock', {params: { query, page, perPage } });
    return response.data;
  }
);

export const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState,
  reducers: {
  },
  extraReducers: {
    [searchImages.fulfilled]: (state, action) => {
      state.total = action.payload.total;
      state.totalPages = action.payload.total_pages;
      state.images = state.images.concat(action.payload.results);
    }
  }
});

export const selectImages = state => state.images;

export default imageSearchSlice.reducer;
