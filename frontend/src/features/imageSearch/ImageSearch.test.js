import React from 'react';
import { mount } from 'enzyme';
import ImageSearch from './ImageSearch';
import LazyMasonry from '../common/LazyMasonry/LazyMasonry';

describe('imageSearch', () => {

  xit('renders an image grid', () => {
    const wrapper = mount(<ImageSearch/>);
    expect(wrapper.exists(LazyMasonry)).toBe(true);
  });

});
