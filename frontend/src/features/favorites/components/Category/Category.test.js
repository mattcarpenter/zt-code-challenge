import {mount} from 'enzyme';
import React from 'react';
import Category from './Category';

describe('Category', () => {

  it('should render correctly', () => {
    const wrapper = mount(<Category favorites={[]}/>);
    expect(wrapper).toMatchSnapshot();
  });

});
