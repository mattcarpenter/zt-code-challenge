import React from 'react';
import { mount } from 'enzyme';
import PhotoTile from './PhotoTile';
describe('PhotoTile', () => {

  it('properly renders', () => {
    const wrapper = mount(
      <PhotoTile
        size={{ width: 200 }}
        originalWidth={2000}
        originalHeight={1500}
        thumbnailURL="http://fake.com/image.jpg"
        id="abc"
      />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find('img').prop('src')).toBe('http://fake.com/image.jpg');
  });

});
