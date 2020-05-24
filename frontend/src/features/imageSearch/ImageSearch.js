import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages, selectImages, loadMoreImages } from './imageSearchSlice';
import { selectCategories, saveToFavorites } from '../favorites/favoritesSlice';
import LazyMasonry from '../common/LazyMasonry/LazyMasonry';
import DebouncingInputBox from './components/DebouncingTextField/DebouncingTextField';
import PhotoTile from '../common/PhotoTile/PhotoTile';
import Dialog from '@material-ui/core/Dialog';
import AddToFavoritesDialogForm from './components/AddToFavoritesDialogForm/AddToFavoritesDialogForm';

export default function ImageSearch() {
  const [ addToFavoritesDialogOpen, setAddToFavoritesDialogOpen ] = useState(false);
  const [ imageToAddToFavorites, setImageToAddToFavorites ] = useState();

  const images = useSelector(selectImages);
  const categories = useSelector(selectCategories);
  const dispatch = useDispatch();

  function loadMoreItems() {
    console.log('load more images');
    dispatch(loadMoreImages());
  }

  function handleSearch(query) {
    dispatch(searchImages({ query, perPage: 30 }));
  }

  function handleDialogOnSave(categories) {
    setAddToFavoritesDialogOpen(false);
    dispatch(saveToFavorites({ ...categories, image: imageToAddToFavorites }));
  }

  function handlePhotoOnFavorite(image) {
    setImageToAddToFavorites(image);
    setAddToFavoritesDialogOpen(true);
  }

  return (
    <div>
      <DebouncingInputBox placeholder="Start typing to begin a search..."  onChange={handleSearch} />
      <LazyMasonry loadMoreItems={loadMoreItems} cols={3}>
        {images.map(image => (
          <PhotoTile
            key={image.id}
            id={image.id}
            thumbnailURL={image.thumbnailURL}
            profileImageURL={image.profileImageURL}
            downloadURL={image.downloadURL}
            profileURL={image.profileURL}
            profileUserName={image.profileUserName}
            originalWidth={image.originalWidth}
            originalHeight={image.originalHeight}
            canFavorite={true}
            onFavorite={() => handlePhotoOnFavorite(image)}
          />
        ))}
      </LazyMasonry>
      <Dialog
        open={addToFavoritesDialogOpen}
        onClose={() => setAddToFavoritesDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <AddToFavoritesDialogForm
          onClose={() => setAddToFavoritesDialogOpen(false)}
          categories={categories}
          onSave={handleDialogOnSave}
        />
      </Dialog>
    </div>
  )
}

