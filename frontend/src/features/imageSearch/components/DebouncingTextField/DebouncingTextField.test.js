import React from 'react';
import { shallow, mount } from 'enzyme';
import DebouncingTextField from './DebouncingTextField';

describe('debouncingTextBox', () => {

  it('renders properly', () => {
    const wrapper = shallow(<DebouncingTextField placeholder="Placeholder text"/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('debounces user input and calls onChange prop method', done => {
    let callCount = 0;
    let value;
    const handleChange = (v) => {callCount++; value = v};

    const wrapper = mount(
      <DebouncingTextField onChange={handleChange} />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'a' } });
    input.simulate('change', { target: { value: 'ab' } });
    input.simulate('change', { target: { value: 'abc' } });

    setTimeout(function () {
      expect(callCount).toEqual(1);
      expect(value).toEqual('abc');
      done();
    }, 300);
  });
});
