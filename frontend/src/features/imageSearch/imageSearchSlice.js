import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const initialState = {
  /**
   * List of images to be rendered in the image search masonry
   */
  images: [],
  /**
   * Indicates the last page to have been loaded from the API. The `loadMoreImages` thunk considers this value when
   * determining which page to load next from the API and its reducer will increment this value on success.
   */
  page: 0,
  /**
   * Total number of images for the current query (all pages combined)
   */
  total: 0,
  /**
   * Total number of pages for the current query. loadMoreImages considers this value along with `page` to determine
   * whether or not it should proceed. For example, if `page` is 10 and `totalPages` is also 10, the loadMoreImages
   * thunk's condition method will return false and the thunk will not proceed.
   */
  totalPages: 0,
  /**
   * Current query
   */
  query: '',
  /**
   * Indicates whether or not an API call is being made to the /api/search endpoint.
   */
  loading: false
};

export const searchImages = createAsyncThunk(
  'imageSearch/searchImages',
  async ({
           /**
            * Search terms to query the Unsplash API with
            */
           query,
           /**
            * Maximum number of results to return
            */
           perPage = 10
  }) => {
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

export default imageSearchSlice.reducer;
