import {mount} from 'enzyme';
import React from 'react';
import NavigationBar from './NavigationBar';

describe('NavigationBar', () => {

  it('renders correctly', () => {
    const wrapper1 = mount(<NavigationBar navIndex={0} />);
    const wrapper2 = mount(<NavigationBar navIndex={1} />);
    expect(wrapper1).toMatchSnapshot();
    expect(wrapper2).toMatchSnapshot();
  });

});
