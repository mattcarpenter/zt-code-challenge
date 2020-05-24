import React from 'react';
import { useSelector, useDispatch} from 'react-redux';
import { selectCategories, selectFavorites, updateCategory } from './favoritesSlice';
import Category from './components/Category/Category';

export default function Favorites() {
  const dispatch = useDispatch();
  const favorites =  useSelector(selectFavorites);
  const categories = bucketFavorites(useSelector(selectCategories), favorites);

  function handleUpdateCategory(id, name, description) {
    dispatch(updateCategory({ id, name, description }));
  }

  return (
    <div>
      { categories.map(category => (
        <Category
          key={category.id}
          name={category.name}
          description={category.description}
          favorites={category.favorites}
          onUpdateCategory={(name, description) => handleUpdateCategory(category.id, name, description)}
        />
      ))}
    </div>
  );
}

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
