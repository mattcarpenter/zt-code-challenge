const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const unsplashService = require('../services/unsplash');
const config = require('../config');

router.get('/search', [
  check('query').exists(),
  check('page').optional().isInt({ gt: 0 }).toInt(),
  check('perPage').optional().isInt({ gt: 0 }).toInt()
], async (req, res) => {

  // validate request
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  const query = req.query.query;
  const page = req.query.page;
  const perPage = req.query.perPage;

  // perform search and respond with result
  const results = await unsplashService.search(query, config.getUnsplashAccessKey(), page, perPage);
  res.send(results);
});

module.exports = router;
