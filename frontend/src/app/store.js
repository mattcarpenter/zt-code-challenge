import { configureStore } from '@reduxjs/toolkit';
import imageSearchReducer from '../features/imageSearch/imageSearchSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';

export default configureStore({
  reducer: {
    imageSearch: imageSearchReducer,
    favorites: favoritesReducer
  },
});
