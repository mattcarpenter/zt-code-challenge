import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages, selectImages, loadMoreImages } from './imageSearchSlice';
import { selectCategories } from '../favorites/favoritesSlice';
import LazyMasonry from '../common/LazyMasonry/LazyMasonry';
import DebouncingInputBox from './components/DebouncingTextField/DebouncingTextField';
import PhotoTile from '../common/PhotoTile/PhotoTile';
import Dialog from '@material-ui/core/Dialog';
import AddToFavoritesDialogForm from './components/AddToFavoritesDialogForm/AddToFavoritesDialogForm';

export default function ImageSearch() {
  const [ addToFavoritesDialogOpen, setAddToFavoritesDialogOpen ] = useState(false);
  const [ imageIdToAddToFavorites, setImageIdToAddToFavorites ] = useState();

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
    debugger;
  }

  function handlePhotoOnFavorite(id) {
    setImageIdToAddToFavorites(id);
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
            thumbnailURL={image.urls.small}
            profileImageURL={image.user.profile_image.small}
            profileURL={image.user.links.html}
            profileUsername={image.user.name}
            originalWidth={image.width}
            originalHeight={image.height}
            canFavorite={true}
            onFavorite={() => handlePhotoOnFavorite(image.id)}
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

