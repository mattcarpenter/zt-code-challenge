import {mount} from 'enzyme';
import React from 'react';
import UpdateCategoryDialogForm from './UpdateCategoryDialogForm';

describe('UpdateCategoryDialogForm', () => {

  it('should render properly', () => {
    const wrapper = mount(<UpdateCategoryDialogForm name="foo" description="bar" />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClose when the close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = mount(<UpdateCategoryDialogForm onClose={onClose}/>);
    wrapper.find('button').at(0).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('calls onSave with parameters when the save button is clicked', () => {
    const onSave = jest.fn();
    const wrapper = mount(<UpdateCategoryDialogForm name="old name" description="old desc" onSave={onSave}/>);

    // enter new category name and description
    wrapper.find('input').at(0).simulate('change', { target: { value: 'new name' } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 'new desc' } });

    wrapper.find('button').at(1).simulate('click');

    expect(onSave.mock.calls[0][0]).toBe('new name');
    expect(onSave.mock.calls[0][1]).toBe('new desc');
  });

});
