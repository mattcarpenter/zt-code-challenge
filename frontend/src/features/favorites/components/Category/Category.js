import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper'
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import React, {useState} from 'react';
import LazyMasonry from '../../../core/LazyMasonry/LazyMasonry';
import PhotoTile from '../../../core/PhotoTile/PhotoTile';
import UpdateCategoryDialogForm from '../UpdateCategoryDialogForm/UpdateCategoryDialogForm';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: 20,
    position: 'relative',
    backgroundColor: 'rgb(35, 35, 35)'
  },
  masonryContainer: {
    padding: '0px 6px 6px 6px'
  },
  categoryHeader: {
    padding: 15
  },
  description: {
    padding: "5px 0px"
  },
  actions: {
    [theme.breakpoints.up('sm')]: {
      position: 'absolute',
      top: 15,
      right: 15
    }
  }
}));

const Category = ({name, description, onUpdateCategory, favorites, cols}) => {
  const [ editDialogOpen, setEditDialogOpen ] = useState(false);
  const classes = useStyles();

  const handleUpdateCategory = (newName, newDescription) => {
    onUpdateCategory(newName, newDescription);
    setEditDialogOpen(false);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.categoryHeader}>
        <Typography variant="h6" tag="h2">{name}</Typography>
        <p className={classes.description}>
          { description }
        </p>
        <div className={classes.actions}>
          <Button
            onClick={() => setEditDialogOpen(true)}
            variant="contained"
            color="default"
            className={classes.button}
            startIcon={<EditIcon />}
          >
            Edit
          </Button>
        </div>
      </div>
      <div className={classes.masonryContainer}>
        <LazyMasonry cols={cols}>
          {favorites.map(image => (
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
              canFavorite={false}
            />
          ))}
        </LazyMasonry>
      </div>
      <Dialog
        open={editDialogOpen}
        onClose={() => setEditDialogOpen(false)}
        aria-labelledby="form-dialog-title"
      >
        <UpdateCategoryDialogForm
          name={name}
          description={description}
          onClose={() => setEditDialogOpen(false)}
          onSave={handleUpdateCategory}
        />
      </Dialog>
    </Paper>
  )
};

Category.propTypes = {
  cols: PropTypes.number,
  onUpdateCategory: PropTypes.func,
  name: PropTypes.string,
  description: PropTypes.string,
  favorites: PropTypes.arrayOf(PropTypes.object)
};

Category.defaultProps = {
  onUpdateCategory: () => {}
};

export default Category;
