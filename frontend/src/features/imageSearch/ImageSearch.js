import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchImages, selectImages, loadMoreImages } from './imageSearchSlice';
import LazyMasonry from '../common/LazyMasonry/LazyMasonry';
import DebouncingInputBox from './components/DebouncingTextField/DebouncingTextField';
import PhotoTile from '../common/PhotoTile/PhotoTile';

export default function ImageSearch() {
  const images = useSelector(selectImages);
  const dispatch = useDispatch();

  function loadMoreItems() {
    console.log('load more images');
    dispatch(loadMoreImages());
  }

  function handleSearch(query) {
    dispatch(searchImages({ query, perPage: 30 }));
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
          />
        ))}
      </LazyMasonry>
    </div>
  )
}

