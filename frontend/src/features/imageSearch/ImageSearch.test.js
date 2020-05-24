import {shallow} from 'enzyme';
import React from 'react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import ImageSearch from './ImageSearch';

const mockStore = configureStore([thunk]);

describe('imageSearch', () => {
  let store;

  beforeEach(() => {
    store = mockStore({});
  });

  it('renders correctly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ImageSearch/>
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

});
