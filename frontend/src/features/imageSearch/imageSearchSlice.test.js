import reducer, {searchImages, initialState} from './imageSearchSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import moxios from 'moxios';

const mockStore = configureStore([thunk]);

const mockAxiosResponse = {
  status: 200,
  response: {
    total: 2,
    total_pages: 2,
    results: [
      {}, {}
    ]
  }
};

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

  it('dispatch the correct actions after a successful image search', async () => {
    moxios.stubRequest(/.*/, mockAxiosResponse);

    await store.dispatch(searchImages({query: 'kittens '}));
    const actions = store.getActions();

    expect(actions[0].type).toBe(searchImages.pending.type);
    expect(actions[1].type).toBe(searchImages.fulfilled.type);
    expect(actions[1].payload).toBe(mockAxiosResponse.response);
  });

  it('should properly add the images and pagination information when an image search succeeds', () => {
    const nextState = reducer(initialState, searchImages.fulfilled(mockAxiosResponse.response));
    expect(nextState.images).toEqual(mockAxiosResponse.response.results);
    expect(nextState.total).toEqual(mockAxiosResponse.response.total);
    expect(nextState.totalPages).toEqual(mockAxiosResponse.response.total_pages);
  });

});
