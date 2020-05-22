const axios = require('axios');
const querystring = require('querystring');

module.exports = {
  search: search
};

async function search(query, accessKey, page = 1, perPage = 10) {
  const qs = querystring.stringify({
    query: query,
    page: page,
    per_page: perPage
  });

  const config = { headers: { Authorization: `Client-ID ${accessKey}` } };
  const { data } = await axios.get(`https://api.unsplash.com/search/photos?${qs}`, config);
  return data;
}
