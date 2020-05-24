import Dialog from '@material-ui/core/Dialog';
import {makeStyles} from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import LazyMasonry from '../core/LazyMasonry/LazyMasonry';
import PhotoTile from '../core/PhotoTile/PhotoTile';
import {saveToFavorites, selectCategories} from '../favorites/favoritesSlice';
import AddToFavoritesDialogForm from './components/AddToFavoritesDialogForm/AddToFavoritesDialogForm';
import DebouncingInputBox from './components/DebouncingTextField/DebouncingTextField';
import {loadMoreImages, searchImages, selectImages, selectLoading, selectQuery} from './imageSearchSlice';

const useStyles = makeStyles({
  root: {
    minHeight: '100vh',
    position: 'relative',
    backgroundColor: 'rgb(35, 35, 35)',
    marginBottom: 50,
    paddingBottom: 15
  },
  search: {
    padding: '20px 20px 10px 20px'
  }
});

const ImageSearch = ({cols}) => {
  const [ addToFavoritesDialogOpen, setAddToFavoritesDialogOpen ] = useState(false);
  const [ imageToAddToFavorites, setImageToAddToFavorites ] = useState();

  const categories = useSelector(selectCategories);
  const images = useSelector(selectImages);
  const loading = useSelector(selectLoading);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleDialogOnSave = (categories) => {
    setAddToFavoritesDialogOpen(false);
    dispatch(saveToFavorites({ ...categories, image: imageToAddToFavorites }));
  };

  const handlePhotoOnFavorite = (image) => {
    setImageToAddToFavorites(image);
    setAddToFavoritesDialogOpen(true);
  };

  return (
    <div className={classes.root}>
      <div className={classes.search}>
        <DebouncingInputBox
          placeholder="Start typing to begin a search..."
          onChange={(query) => dispatch(searchImages({ query, perPage: 100 }))}
          className={classes.input}
        />
      </div>
      <LazyMasonry loadMoreItems={() => dispatch(loadMoreImages({ perPage: 50 }))} cols={cols} loading={loading}>
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
};

ImageSearch.propTypes = {
  cols: PropTypes.number
};

export default ImageSearch;

