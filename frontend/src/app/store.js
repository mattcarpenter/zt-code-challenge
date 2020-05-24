import { configureStore } from '@reduxjs/toolkit';
import imageSearchReducer from '../features/imageSearch/imageSearchSlice';
import favoritesReducer from '../features/favorites/favoritesSlice';
import persistState from 'redux-localstorage';

export default configureStore({
  reducer: {
    imageSearch: imageSearchReducer,
    favorites: favoritesReducer
  },
  enhancers: [
    persistState('favorites')
  ]
});
