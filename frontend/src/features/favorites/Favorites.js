import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Category from './components/Category/Category';
import {selectCategories, selectFavorites, updateCategory} from './favoritesSlice';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  },
  nothingHere: {
    textAlign: 'center',
    padding: 50,
    color: '#ddd'
  }
});

const Favorites = ({
  /**
  * Number of columns to arrange photo tiles in to
  */
  cols
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorites =  useSelector(selectFavorites);
  const categories = bucketFavorites(useSelector(selectCategories), favorites);

  function handleUpdateCategory(id, name, description) {
    dispatch(updateCategory({ id, name, description }));
  }

  return (
    <div className={classes.root}>
      { categories.length === 0 && (
        <div className={classes.nothingHere}>
          <Typography variant="h6" tag="h2">You haven't created any lists yet!</Typography>
        </div>
      )}
      { categories.map(category => (
        <Category
          cols={cols}
          key={category.id}
          name={category.name}
          description={category.description}
          favorites={category.favorites}
          onUpdateCategory={(name, description) => handleUpdateCategory(category.id, name, description)}
        />
      ))}
    </div>
  );
};

Favorites.propTypes = {
  cols: PropTypes.number
};

export default Favorites;

export const bucketFavorites = (categories, favorites) => {
  const categoriesMap = categories.reduce((acc, curr) => {
    acc[curr.id] = {...curr};
    return acc;
  }, {});
  Object.keys(favorites).forEach(fc => {
    favorites[fc].categories.forEach(c => {
      categoriesMap[c].favorites = categoriesMap[c].favorites || [];
      categoriesMap[c].favorites.push(favorites[fc]);
    });
  });
  return Object.keys(categoriesMap).map(cid => categoriesMap[cid]);
};
