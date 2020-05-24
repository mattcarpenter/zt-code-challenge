import reducer, { initialState, saveToFavorites, updateCategory } from './favoritesSlice';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';

const mockStore = configureStore([thunk]);

describe('favorites slice', () => {
  let store;

  beforeEach(() => {
    store = mockStore();
    store.replaceReducer(reducer);
  });

  it('returns the initial state on the first run', () => {
    const nextState = initialState;
    const result = reducer(undefined, {});
    expect(result).toEqual(nextState);
  });

  it('dispatches the correct action when attempting to add an image to an existing category', async () => {
    const params = {
      image: { id: 'foo' },
      categories: ['a']
    };

    await store.dispatch(saveToFavorites(params));
    const actions = store.getActions();

    expect(actions[0].type).toBe(saveToFavorites.pending.type);
    expect(actions[1].type).toBe(saveToFavorites.fulfilled.type);
    expect(actions[1].payload).toStrictEqual(params);
  });

  it('dispatches the correct action when attempting to add an image to an existing category and create a new category', async () => {
    const params = {
      image: { id: 'foo' },
      categories: ['a'],
      newCategoryName: 'New Category',
      newCategoryDescription: 'New category description'
    };

    await store.dispatch(saveToFavorites(params));
    const actions = store.getActions();

    expect(actions[0].type).toBe(saveToFavorites.pending.type);
    expect(actions[1].type).toBe(saveToFavorites.fulfilled.type);
    expect(actions[1].payload).toStrictEqual({
      image: { id: 'foo' },
      categories: ['a'],
      newCategory: {
        name: 'New Category',
        description: 'New category description',
        id: expect.any(String)
      }
    });
  });

  it('properly adds a new favorite and new category', () => {
    const mockPayload = {
      image: { id: 'foo' },
      categories: [],
      newCategory: {
      name: 'New Category',
        description: 'New category description',
        id: 'fakeid'
      }
    };

    const state2 = reducer(initialState, saveToFavorites.fulfilled(mockPayload));
    expect(state2.categories[0].name).toEqual('New Category');
    expect(state2.categories[0].description).toEqual('New category description');
    expect(state2.categories[0].id).toEqual('fakeid');
    expect(state2.favorites.foo.categories[0]).toEqual('fakeid');
  });

  it('updates a category', () => {
    const categories = [{ id: 'a', name: 'old name', description: 'old desc' }];
    const state2 = reducer({ categories }, updateCategory({ id: 'a', name: 'nn', description: 'ndesc' }));
    expect(state2.categories[0].name).toEqual('nn');
    expect(state2.categories[0].description).toEqual('ndesc');
  });

});
