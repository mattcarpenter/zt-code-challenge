import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

export const initialState = {
  categories: [],
  favorites: {}
};

export const saveToFavorites = createAsyncThunk(
  'favorites/saveToFavorites',
  async ({image, categories, newCategoryName, newCategoryDescription}) => {
    // Typically, an action such as assigning images to a category or creating a new category would do so by
    // making a network request to an api server. Since this project uses a redux store plus localStorage to persist
    // categories and favorites, this async thunk has been created so that it would be easy to swap out for a REST
    // implementation in the future.

    const payload = {image, categories};
    if (newCategoryName && newCategoryName.trim()) {
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
  reducers: {
    updateCategory: (state, action) => {
      const { id, name, description } = action.payload;
      const category = state.categories.filter(c => c.id === id)[0];
      category.name = name;
      category.description = description;
    }
  },
  extraReducers: {
    [saveToFavorites.fulfilled]: (state, action) => {
      const {image, categories, newCategory} = action.payload;
      const imageId = image.id;

      // add to favorites map if it doesn't already exist
      state.favorites[imageId] = state.favorites[imageId] || {id: imageId, categories: []};

      // merge (or add) categories
      state.favorites[imageId] = {
        ...image,
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

export const {updateCategory} = favoritesSlice.actions;

export const selectCategories = state => state.favorites.categories;
export const selectFavorites = state => state.favorites.favorites;

export default favoritesSlice.reducer;
