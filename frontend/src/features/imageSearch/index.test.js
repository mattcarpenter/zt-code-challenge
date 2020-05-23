import React from 'react';
import { mount } from 'enzyme';
import ImageSearch from './index';
import LazyStackGrid from '../common/LazyStackGrid';

describe('imageSearch', () => {

  it('renders an image grid', () => {
    const wrapper = mount(<ImageSearch/>);
    expect(wrapper.containsAnyMatchingElements([LazyStackGrid])).toBe(true);
  });

});
