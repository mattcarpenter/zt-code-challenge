import reducer, {searchImages, initialState} from './imageSearchSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const mockStore = configureStore([thunk]);

describe('imageSearch slice', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    store.replaceReducer(reducer);
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('returns the initial state on the first run', () => {
    const nextState = initialState;
    const result = reducer(undefined, {});
    expect(result).toEqual(nextState);
  });

  it('dispatches the correct actions after a successful image search', async () => {
    const mockAxiosResponse = createMockImageSearchResponse(100, 2, 50);
    moxios.stubRequest(/.*/, mockAxiosResponse);

    await store.dispatch(searchImages({query: 'kittens'}));
    const actions = store.getActions();

    expect(actions[0].type).toBe(searchImages.pending.type);
    expect(actions[1].type).toBe(searchImages.fulfilled.type);
    expect(actions[1].payload).toStrictEqual({ ...mockAxiosResponse.response, query: 'kittens', page: 1 });
  });

  it('properly adds images and pagination information when images searches succeed', () => {
    const mockAxiosResponse = createMockImageSearchResponse(100, 2, 50);
    const state2 = reducer(initialState, searchImages.fulfilled({ ...mockAxiosResponse.response, query: 'kittens'}));
    expect(state2.images).toEqual(mockAxiosResponse.response.results);
    expect(state2.total).toEqual(mockAxiosResponse.response.total);
    expect(state2.totalPages).toEqual(mockAxiosResponse.response.total_pages);

    // simulate another search with the same query; expect new results to be added to previous results
    const state3 = reducer(state2, searchImages.fulfilled({ ...mockAxiosResponse.response, query: 'kittens'}));
    expect(state3.images.length).toBe(100);

    // simulate another search with a different query; expect the new results to replace the previous results
    const mockAxiosResponse2 = createMockImageSearchResponse(75, 1, 75);
    const state4 = reducer(state3, searchImages.fulfilled({ ...mockAxiosResponse2.response, query: 'puppies'}));
    expect(state4.images.length).toBe(75);
    expect(state4.query).toBe('puppies');
  });

});

function createMockImageSearchResponse(total, totalPages, itemCount) {
  return {
    status: 200,
    response: {
      total: total,
      total_pages: totalPages,
      results: [...Array(itemCount).keys()].map(k => {})
    }
  };
}
