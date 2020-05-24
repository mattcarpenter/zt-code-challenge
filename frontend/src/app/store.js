import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import imageSearchReducer from '../features/imageSearch/imageSearchSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    imageSearch: imageSearchReducer,
    favorites: favoritesReducer
  },
});
