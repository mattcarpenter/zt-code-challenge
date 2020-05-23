import React from 'react';
import sizeMe from 'react-sizeme';
import PropTypes from 'prop-types';

const PhotoTile = ({profileURL, thumbnailURL, originalURL, profileImage, uploaderName, id, originalWidth, originalHeight, canFavorite, size }) => {
  const scaledHeight = calculateScaledHeight(originalWidth, originalHeight, size.width);

  return (
    <div>
      <img src={thumbnailURL} width={size.width} height={scaledHeight}/>
    </div>
  );
};

PhotoTile.propTypes = {
  profileURL: PropTypes.string,
  thumbnailURL: PropTypes.string.isRequired,
  originalURL: PropTypes.string,
  id: PropTypes.string.isRequired,
  profileImage: PropTypes.string,
  uploaderName: PropTypes.string,
  originalWidth: PropTypes.number.isRequired,
  originalHeight: PropTypes.number.isRequired,
  canFavorite: PropTypes.bool
};

export default sizeMe()(PhotoTile);

export const calculateScaledHeight = (originalWidth, originalHeight, newWidth) => {
  return originalHeight * newWidth / originalWidth;
};
