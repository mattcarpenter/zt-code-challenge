const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const unsplashService = require('../services/unsplash');
const config = require('../config');
const fs = require('fs');

router.get('/search', [
  check('query').exists(),
  check('page').optional().isInt({ gt: 0 }).toInt(),
  check('perPage').optional().isInt({ gt: 0 }).toInt()
], async (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    const results = await unsplashService.search(
      req.query.query,
      config.getUnsplashAccessKey(),
      req.query.page,
      req.query.perPage
    );

    res.send(results);
  } catch (e) {
    next(e);
  }
});

router.get('/mock', (req, res) => {
  const mockResponse = JSON.parse(fs.readFileSync(__dirname + '/kittens.json').toString());
  res.send(mockResponse);
});

module.exports = router;
