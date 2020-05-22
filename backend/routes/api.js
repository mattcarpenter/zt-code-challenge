const express = require('express');
const router = express.Router();
const unsplashService = require('../services/unsplash');
const config = require('../config');

router.get('/search', async (req, res) => {
  const results = await unsplashService.search('kittens', config.getUnsplashAccessKey());
  res.send(results);
});

module.exports = router;
