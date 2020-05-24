import {mount, shallow} from 'enzyme';
import React from 'react';
import DebouncingTextField from './DebouncingTextField';

describe('debouncingTextBox', () => {

  it('renders properly', () => {
    const wrapper = shallow(<DebouncingTextField placeholder="Placeholder text"/>);
    expect(wrapper).toMatchSnapshot();
  });

  it('debounces user input and calls onChange prop method', done => {
    const handleChange = jest.fn();
    const wrapper = mount(
      <DebouncingTextField onChange={handleChange} />
    );

    const input = wrapper.find('input');
    input.simulate('change', { target: { value: 'a' } });
    input.simulate('change', { target: { value: 'ab' } });
    input.simulate('change', { target: { value: 'abc' } });

    setTimeout(function () {
      expect(handleChange.mock.calls.length).toBe(1);
      expect(handleChange.mock.calls[0][0]).toBe('abc');
      done();
    }, 300);
  });
});
