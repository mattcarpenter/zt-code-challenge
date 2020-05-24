import {shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import Favorites, {bucketFavorites} from './Favorites';

const mockStore = configureStore([thunk]);

describe('Favorites', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <Favorites/>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('properly sorts favorites into categories', () => {
    const categories = [{ id: 'a' }];
    const favorites = {
      f: {
        categories: ['a']
      },
      g: {
        categories: ['a']
      }
    };

    const result = bucketFavorites(categories, favorites);
    expect(result.length).toBe(1);
    expect(result[0].id).toBe('a');
    expect(result[0].favorites.length).toBe(2);
  });

});
