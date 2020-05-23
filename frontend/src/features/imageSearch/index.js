import React, { useState } from 'react';
import LazyStackGrid from '../common/LazyStackGrid';
import DebouncingInputBox from './components/debouncingTextField';

export default function ImageSearch() {

  function loadMoreItems() {

  }

  return (
    <div>
      <DebouncingInputBox
        placeholder="Start typing to begin a search..."/>
      <LazyStackGrid
        loadMoreItems={loadMoreItems}
      >

      </LazyStackGrid>
    </div>
  )
}

