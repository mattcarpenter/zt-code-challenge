import React from 'react';
import { mount } from 'enzyme';
import AddToFavoritesDialogForm from './AddToFavoritesDialogForm';

const categories = [ { id: 'a', name: 'a' }, { id: 'b', name: 'b' } ];

describe('AddToFavoritesDialogForm', () => {

  it('renders correctly', () => {
    const wrapper = mount(<AddToFavoritesDialogForm categories={categories} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('calls onClose when close button is clicked', () => {
    const onClose = jest.fn();
    const wrapper = mount(<AddToFavoritesDialogForm categories={categories} onClose={onClose}/>);
    wrapper.find('button').at(0).simulate('click');
    expect(onClose.mock.calls.length).toBe(1);
  });

  it('calls onSave with parameters when the save button is clicked', () => {
    const onSave = jest.fn();
    const wrapper = mount(<AddToFavoritesDialogForm categories={categories} onSave={onSave}/>);

    // tick first category checkbox
    const checkbox = wrapper.find('input').at(0);
    checkbox.simulate('change', { target: { checked: true } });

    // enter new category name and description
    wrapper.find('input').at(2).simulate('change', { target: { value: 'new name' } });
    wrapper.find('input').at(3).simulate('change', { target: { value: 'new desc' } });

    wrapper.find('button').at(1).simulate('click');

    expect(onSave.mock.calls[0][0]).toStrictEqual({
      categories: ['a'],
      newCategoryName: 'new name',
      newCategoryDescription: 'new desc'
    });
  });

});
