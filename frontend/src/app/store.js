import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import imageSearchReducer from '../features/imageSearch/imageSearchSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    imageSearch: imageSearchReducer
  },
});
