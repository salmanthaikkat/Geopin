const router = require('express').Router();
const passport = require('passport');
const locationHandler = require('../handlers/location');

router.post(
  '/addReview',
  passport.authenticate('jwt', { session: false }),
  locationHandler.saveReview,
);

router.post(
  '/getUserReview',
  passport.authenticate('jwt', { session: false }),
  locationHandler.getUserReviews,
);

router.post('/getLocationReview', locationHandler.getLocationReviews);

router.post('/getOtherUserReview', locationHandler.getOtherUserReviews);

module.exports = router;
