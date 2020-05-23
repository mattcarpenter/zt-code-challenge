import reducer, {searchImages, loadMoreImages, initialState} from './imageSearchSlice';
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

  it('rejects when attempting to load more images before a search has been performed', async () => {
    await store.dispatch(loadMoreImages());
    const actions = store.getActions();
    expect(actions[0].type).toBe(loadMoreImages.rejected.type);
  });

  it('dispatches the correct actions after a successful image search', async () => {
    const mockAxiosResponse = createMockImageSearchResponse(100, 2, 50);
    moxios.stubRequest(/.*/, mockAxiosResponse);

    await store.dispatch(searchImages({query: 'kittens'}));
    const actions = store.getActions();

    expect(actions[0].type).toBe(searchImages.pending.type);
    expect(actions[1].type).toBe(searchImages.fulfilled.type);
    expect(actions[1].payload).toStrictEqual({ ...mockAxiosResponse.response, query: 'kittens' });
  });

  xit('dispatches the correct actions after successfully loading more images', async () => {

  });

  it('properly sets images and pagination information when an image search succeeds', () => {
    const mockAxiosResponse = createMockImageSearchResponse(100, 2, 50);
    const state2 = reducer(initialState, searchImages.fulfilled({ ...mockAxiosResponse.response, query: 'kittens' }));
    expect(state2.images).toEqual(mockAxiosResponse.response.results);
    expect(state2.page).toBe(1);
    expect(state2.total).toEqual(mockAxiosResponse.response.total);
    expect(state2.totalPages).toEqual(mockAxiosResponse.response.total_pages);
  });

  it('properly appends images after successfully loading more images', () => {
    // simulate search
    const mockAxiosResponse = createMockImageSearchResponse(100, 2, 50);
    const state2 = reducer(initialState, searchImages.fulfilled({ ...mockAxiosResponse.response, query: 'kittens' }));
    expect(state2.images.length).toBe(50);

    // simulate load more images
    const state3 = reducer(state2, loadMoreImages.fulfilled({ ...mockAxiosResponse.response, page: 2 }));
    expect(state3.images.length).toBe(100);
  });

});

function createMockImageSearchResponse(total, totalPages, itemCount) {
  return {
    status: 200,
    response: {
      total: total,
      total_pages: totalPages,
      results: [...Array(itemCount).keys()].map(() => {})
    }
  };
}
