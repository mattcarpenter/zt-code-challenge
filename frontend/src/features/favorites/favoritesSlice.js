import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {v4 as uuidv4} from 'uuid';

const mockInitialState = {
  categories: [
    {
      name: 'black cats',
      description: 'mostly just black cats',
      id: '2c19bde1-a9c4-4b57-b4f6-601157d71483'
    },
    {
      name: 'Kittens Only',
      description: 'Only Kittens!!!!',
      id: 'e9e5e132-1d65-4ec0-b1a9-a8596ebe5e0a'
    }
  ],
  favorites: {
    N0pESvB7pPo: {
      id: 'N0pESvB7pPo',
      thumbnailURL: 'https://images.unsplash.com/photo-1567093614297-8ade6cf5d8f0?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNjU0OH0',
      downloadURL: 'https://unsplash.com/photos/N0pESvB7pPo/download',
      profileImageURL: 'https://images.unsplash.com/profile-1553622588102-c3316bd766e6?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
      profileURL: 'https://unsplash.com/@nihaldemirci',
      profileUserName: 'Nihal Demirci',
      originalWidth: 6000,
      originalHeight: 4000,
      categories: [
        '2c19bde1-a9c4-4b57-b4f6-601157d71483'
      ]
    },
    '1l2waV8glIQ': {
      id: '1l2waV8glIQ',
      thumbnailURL: 'https://images.unsplash.com/photo-1532386236358-a33d8a9434e3?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjEzNjU0OH0',
      downloadURL: 'https://unsplash.com/photos/1l2waV8glIQ/download',
      profileImageURL: 'https://images.unsplash.com/profile-1538941834664-a6d8eb80866b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&cs=tinysrgb&fit=crop&h=32&w=32',
      profileURL: 'https://unsplash.com/@calypso999',
      profileUserName: 'Raul Varzar',
      originalWidth: 3200,
      originalHeight: 2361,
      categories: [
        'e9e5e132-1d65-4ec0-b1a9-a8596ebe5e0a'
      ]
    }
  }
};

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
  initialState: mockInitialState,
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

export const {increment, decrement, incrementByAmount, updateCategory} = favoritesSlice.actions;

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
export const selectFavorites = state => state.favorites.favorites;

export default favoritesSlice.reducer;
