const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const unsplashService = require('../services/unsplash');
const config = require('../config');

router.get('/search', [
  check('query').exists(),
  check('page').optional().isInt({ gt: 0 }).toInt(),
  check('perPage').optional().isInt({ gt: 0 }).toInt()
], async (req, res, next) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  try {
    const serviceResponse = await unsplashService.search(
      req.query.query,
      config.getUnsplashAccessKey(),
      req.query.page,
      req.query.perPage
    );

    serviceResponse.results = serviceResponse.results.map(r => {
      return {
        id: r.id,
        thumbnailURL: r.urls.small,
        downloadURL: r.links.download,
        profileImageURL: r.user.profile_image.small,
        profileURL: r.user.links.html,
        profileUserName: r.user.name,
        originalWidth: r.width,
        originalHeight: r.height
      }
    });

    res.send(serviceResponse);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
