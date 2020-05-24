import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { selectCategories, selectFavorites, updateCategory } from './favoritesSlice';
import { makeStyles } from '@material-ui/core/styles';
import Category from './components/Category/Category';
import PropTypes from 'prop-types';

const useStyles = makeStyles({
  root: {
    marginTop: 20
  }
});

const Favorites = ({cols}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const favorites =  useSelector(selectFavorites);
  const categories = bucketFavorites(useSelector(selectCategories), favorites);

  function handleUpdateCategory(id, name, description) {
    dispatch(updateCategory({ id, name, description }));
  }

  return (
    <div className={classes.root}>
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
