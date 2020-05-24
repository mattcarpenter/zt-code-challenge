import React from 'react';
import { mount } from 'enzyme';
import PhotoTile, {calculateScaledHeight} from './PhotoTile';

describe('PhotoTile', () => {

  describe('component', () => {

    it('properly renders', () => {
      const wrapper = mount(
        <PhotoTile
          size={{width: 200}}
          originalWidth={2000}
          originalHeight={1500}
          thumbnailURL="abc"
          id="def"
        />
      );

      expect(wrapper).toMatchSnapshot();
    });

    it('calls the onFavorite method when the Add to Favorites button is clicked', () => {
      const onFavorite = jest.fn();
      const wrapper = mount(
        <PhotoTile
          size={{width: 200}}
          originalWidth={2000}
          originalHeight={1500}
          onFavorite={onFavorite}
          thumbnailURL="abc"
          id="def"
          canFavorite={true}
        />
      );
      wrapper.find('button').find({'aria-label':'Add to Favorites'}).simulate('click');
      expect(onFavorite.mock.calls.length).toBe(1);
    });

    it('calls the onDownload method when the Add to Favorites button is clicked', () => {
      const onDownload = jest.fn();
      const wrapper = mount(
        <PhotoTile
          size={{width: 200}}
          originalWidth={2000}
          originalHeight={1500}
          onDownload={onDownload}
          thumbnailURL="abc"
          id="def"
          canFavorite={true}
        />
      );
      wrapper.find('button').find({'aria-label':'Download Image'}).simulate('click');
      expect(onDownload.mock.calls.length).toBe(1);
    });

  });

  describe('calculateScaledHeight', () => {

    it('calculates the correct new height given original dimensions and a new width', () => {
      expect(calculateScaledHeight(800, 600, 400)).toBe(300);
      expect(calculateScaledHeight(600, 800, 300)).toBe(400);
      expect(calculateScaledHeight(500,500,250)).toBe(250);
    });

  });

});
