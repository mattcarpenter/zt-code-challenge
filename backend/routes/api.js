const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const unsplashService = require('../services/unsplash');
const config = require('../config');

router.get('/search', [
  check('query').exists()
], async (req, res) => {

  // request validation
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors });
  }

  // perform image search and respond with result
  const results = await unsplashService.search('kittens', config.getUnsplashAccessKey());
  res.send(results);
});

module.exports = router;
