import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  images: [],
  page: 1,
  total: null,
  totalPages: null
};

export const searchImages = createAsyncThunk(
  'imageSearch/searchImages',
  async ({query, page = 1, perPage = 10}) => {
    const response = await axios.get('/api/mock', {params: { query, page, perPage } });
    return { ...response.data, page: page, query: query };
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
      state.page = action.payload.page;

      if (action.payload.page > 1) {
        // append images
        state.images = state.images.concat(action.payload.results);
      } else {
        // replace images
        state.images = action.payload.results;
      }
    }
  }
});

export const selectImages = state => state.images;
export const selectPage = state => state.page;

export default imageSearchSlice.reducer;
