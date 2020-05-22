const app = require('../app');
const supertest = require('supertest');
const request = supertest(app);

describe('api', () => {

  it('returns pagination info and list of images', async done => {
    const response = await request.get('/api/search?query=kittens');
    expect(response.body.total).toEqual(expect.any(Number));
    done();
  });

  it('returns an error if no query is specified', async done => {
    const response = await request.get('/api/search');
    expect(response.body.errors).toEqual(expect.any(Array));
    expect(response.body.errors.length).toEqual(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');
    expect(response.body.errors[0].param).toEqual('query');
    done();
  });

  it('returns an error if non-numeric page', async done => {
    const response = await request.get('/api/search?query=kittens&page=puppies');
    expect(response.body.errors).toEqual(expect.any(Array));
    expect(response.body.errors.length).toEqual(1);
    expect(response.body.errors[0].msg).toEqual('Invalid value');
    expect(response.body.errors[0].param).toEqual('page');
    done();
  });
});
