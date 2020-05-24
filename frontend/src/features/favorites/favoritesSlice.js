import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const initialState = {
  categories: [],
  favorites: {}
};

export const saveToFavorites = createAsyncThunk(
  'favorites/saveToFavorites',
  async ({imageId, categories, newCategoryName, newCategoryDescription}) => {
    // Typically, an action such as assigning images to a category or creating a new category would do so by
    // making a network request to an api server. Since this project uses a redux store plus localStorage to persist
    // categories and favorites, this async thunk has been created so that it would be easy to swap out for a REST
    // implementation in the future.

    const payload = {imageId, categories};
    if (newCategoryName.trim()) {
      payload.newCategory = {
        name: newCategoryName,
        description: newCategoryDescription,
        id: uuidv4() // this would typically be generated server-side
      };
    }

    return payload;
  }
);

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {},
  extraReducers: {
    [saveToFavorites.fulfilled]: (state, action) => {
      const {imageId, categories, newCategory} = action.payload;

      // add to favorites map if it doesn't already exist
      state.favorites[imageId] = state.favorites[imageId] || {id: imageId, categories: []};

      // merge (or add) categories
      state.favorites[imageId] = {
        categories: [...new Set([...categories, ...state.favorites[imageId].categories])]
      };

      if (newCategory) {
        // create new category and add to the favorite
        state.categories.push(newCategory);
        state.favorites[imageId].categories.push(newCategory.id);
      }
    }
  }
});

export const {increment, decrement, incrementByAmount} = favoritesSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = amount => dispatch => {
  setTimeout(() => {
    dispatch(incrementByAmount(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = state => state.counter.value;
export const selectCategories = state => state.favorites.categories;

export default favoritesSlice.reducer;
