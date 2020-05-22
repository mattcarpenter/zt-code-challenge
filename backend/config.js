const dotenv = require('dotenv').config({path: '../.env'});

module.exports = {
  getUnsplashAccessKey: getUnsplashAccessKey
};

function getUnsplashAccessKey() {
  return process.env.UNSPLASH_ACCESS_KEY;
}
