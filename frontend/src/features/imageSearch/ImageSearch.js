import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchImages } from './imageSearchSlice';
import LazyMasonry from '../common/LazyMasonry/LazyMasonry';
import DebouncingInputBox from './components/DebouncingTextField/DebouncingTextField';

export default function ImageSearch() {
  const dispatch = useDispatch();

  function loadMoreItems() {

  }

  function handleSearch(query) {
    dispatch(searchImages({
      query: query
    }));
  }

  return (
    <div>
      <DebouncingInputBox
        placeholder="Start typing to begin a search..."
        onChange={handleSearch}
      />
      <LazyMasonry
        loadMoreItems={loadMoreItems}
      >

      </LazyMasonry>
    </div>
  )
}

