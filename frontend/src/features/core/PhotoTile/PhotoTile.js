import React from 'react';
import PropTypes from 'prop-types';
import { withSize } from 'react-sizeme';
import { makeStyles } from '@material-ui/core/styles';
import SaveAltIcon from '@material-ui/icons/SaveAlt';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
  root: {
    position: 'relative',
    '&:hover > div': {
      display: 'block'
    },
    margin: '12px 6px',
    borderRadius: 3,
    overflow: 'hidden',
    backgroundColor: 'rgb(100,100,100)'
  },
  image: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 0
  },
  meta: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    position: 'absolute',
    color: '#fff',
    bottom: 0,
    right: 0,
    left: 0,
    zIndex: 1,
    padding: 10
  },
  actions: {
    position: 'absolute',
    top: 15,
    right: 15,
    zIndex: 1
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    verticalAlign: 'middle',
    marginRight: 15
  },
  profileLink: {
    textDecoration: 'none',
    color: '#aaa',
    transition: 'color .5s',
    '&:hover': {
      color: '#fff',
      transition: 'color .5s'
    }
  },
  button: {
    marginLeft: 10,
    minWidth: 0,
    padding: '6px 10px',
    '& svg': {
      fill: '#666'
    }
  },
  cover: {
    display: 'none',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  }
});

const PhotoTile = ({ id, thumbnailURL, profileImageURL, profileUserName, originalWidth,
                     originalHeight, canFavorite, size, profileURL, onFavorite, downloadURL }) => {
  const scaledHeight = calculateScaledHeight(originalWidth, originalHeight, size.width);
  const classes = useStyles();

  const handleDownloadClick = () => {
    // tricks the browser into initiating a download for this resource
    var anchor = document.createElement('a');
    anchor.href = downloadURL;
    anchor.target = '_blank';
    anchor.download = id;
    anchor.click();
  };

  return (
    <div style={{ height: scaledHeight }} className={classes.root}>
      <img
        className={classes.image} src={thumbnailURL}
        width={size.width}
        height={scaledHeight} />
      <div className={classes.cover}>
        <div className={classes.meta}>
          <a href={profileURL} target="_BLANK" className={classes.profileLink} rel="noopener noreferrer">
            <img src={profileImageURL} className={classes.profileImage} />
            { profileUserName }
          </a>
        </div>
        <div className={classes.actions}>
          { canFavorite && (
            <Button
              aria-label="Add to Favorites"
              onClick={onFavorite}
              variant="contained"
              className={classes.button}
              color="default">
              <AddIcon />
            </Button>
          )}
          <Button
            aria-label="Download Image"
            onClick={handleDownloadClick}
            variant="contained"
            className={classes.button}
            color="default">
            <SaveAltIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};

PhotoTile.propTypes = {
  id: PropTypes.string.isRequired,
  profileURL: PropTypes.string,
  thumbnailURL: PropTypes.string.isRequired,
  profileImageURL: PropTypes.string,
  downloadURL: PropTypes.string,
  profileUserName: PropTypes.string,
  originalWidth: PropTypes.number.isRequired,
  originalHeight: PropTypes.number.isRequired,
  canFavorite: PropTypes.bool,
  onFavorite: PropTypes.func
};

PhotoTile.defautProps = {
  onFavorite: () => {}
};

export default withSize()(PhotoTile);

export const calculateScaledHeight = (originalWidth, originalHeight, newWidth) => {
  return originalHeight * newWidth / originalWidth;
};
