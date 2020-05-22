const unsplash = require('./unsplash');
const moxios = require('moxios');

describe('service: unsplash', () => {

  describe('search', () => {

    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    it('calls the Unsplash search endpoint and passes through the response', async () => {
      moxios.stubRequest(/https:\/\/api\.unsplash\.com\/search\/photos.*/, {
        status: 200,
        response: {
          foo: 'bar'
        }
      });

      const results = await unsplash.search('kittens', 'fake_access_key', 2, 20);
      const request = moxios.requests.mostRecent();

      expect(request.headers.Authorization).toEqual('Client-ID fake_access_key');
      expect(request.config.url).toEqual('https://api.unsplash.com/search/photos?query=kittens&page=2&per_page=20');
      expect(results).toEqual({
        foo: 'bar'
      });
    });

    it('uses default page and per_page', async () => {
      moxios.stubRequest(/https:\/\/api\.unsplash\.com\/search\/photos.*/, {
        status: 200,
        response: {
          foo: 'bar'
        }
      });

      const results = await unsplash.search('kittens', 'fake_access_key');
      const request = moxios.requests.mostRecent();

      expect(request.headers.Authorization).toEqual('Client-ID fake_access_key');
      expect(request.config.url).toEqual('https://api.unsplash.com/search/photos?query=kittens&page=1&per_page=10');
      expect(results).toEqual({
        foo: 'bar'
      });
    });
  });
});
