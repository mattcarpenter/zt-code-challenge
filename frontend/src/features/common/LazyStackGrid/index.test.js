import React from 'react';
import { mount } from 'enzyme';
import LazyStackGrid from './index';

describe('LazyStackGrid', () => {

  it('places children into columns', () => {
    let items = makeGridItems(4);

    const wrapper = mount(
      <LazyStackGrid style={{width: 200, height: 200}}>
        {items}
      </LazyStackGrid>
    );

    expect(wrapper.find('#child-0 + #child-2').length).toBe(1);
    expect(wrapper.find('#child-1 + #child-3').length).toBe(1);

    // add four more items and verify they're placed into the appropriate columns
    wrapper.setProps({ children: items.concat(makeGridItems(4, 4)) });
    wrapper.update();

    expect(wrapper.find('#child-2 + #child-4').length).toBe(1);
    expect(wrapper.find('#child-3 + #child-5').length).toBe(1);
  });

  xit('calls `loadMoreItems` when bottom becomes visible', (done) => {

  });

});

function makeGridItems(count, startIndex = 0) {
  return [...Array(count).keys()].map(k => {
    const key = k + startIndex;
    return (
      <div style={{width: 100, height: 100}} key={key}  id={`child-${key}`}>
        child {key}
      </div>
    );
  });
}
