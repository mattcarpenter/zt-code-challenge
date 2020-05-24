import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  images: [],
  page: 0,
  total: 0,
  totalPages: 0,
  query: '',
  loading: false
};

export const searchImages = createAsyncThunk(
  'imageSearch/searchImages',
  async ({query, perPage = 10}) => {
    const response = await axios.get('/api/search', {params: { query, perPage } });
    return { ...response.data, query: query };
  }
);

export const loadMoreImages = createAsyncThunk(
  'imageSearch/loadMoreImages',
  async (params, { getState }) => {
    const pageToFetch = getState().imageSearch.page + 1;
    const query = getState().imageSearch.query;
    const response = await axios.get('/api/search', {params: { query, page: pageToFetch, perPage: params.perPage } });
    return { ...response.data, page: pageToFetch };
  },
  {
    condition: (params, { getState }) => {
      const state = getState().imageSearch;
      // skip executing the payload creator if there's no current search results or there's no more images to fetch
      return !(state.query === null || state.page === state.totalPages);
    }
  }
);

export const imageSearchSlice = createSlice({
  name: 'imageSearch',
  initialState,
  reducers: {},
  extraReducers: {
    [searchImages.pending]: state => {
      state.loading = true;
    },
    [searchImages.fulfilled]: (state, action) => {
      state.totalPages = action.payload.total_pages;
      state.images = action.payload.results;
      state.total = action.payload.total;
      state.query = action.payload.query;
      state.page = 1;
      state.loading = false;
    },
    [searchImages.rejected]: state => {
      state.loading = false;
    },
    [loadMoreImages.pending]: state => {
      state.loading = true;
    },
    [loadMoreImages.fulfilled]: (state, action) => {
      state.images = state.images.concat(action.payload.results);
      state.page = action.payload.page;
      state.loading = false;
    },
    [loadMoreImages.rejected]: state => {
      state.loading = false;
    }
  }
});

export const selectImages = state => state.imageSearch.images;
export const selectLoading = state => state.imageSearch.loading;
export const selectQuery = state => state.imageSearch.query;

export default imageSearchSlice.reducer;
