import {configureStore} from '@reduxjs/toolkit';
import persistState from 'redux-localstorage';
import favoritesReducer from '../features/favorites/favoritesSlice';
import imageSearchReducer from '../features/imageSearch/imageSearchSlice';

export default configureStore({
  reducer: {
    imageSearch: imageSearchReducer,
    favorites: favoritesReducer
  },
  enhancers: [
    persistState('favorites')
  ]
});
