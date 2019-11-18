const router = require('express').Router();
const passport = require('passport');
const userProfileHandler = require('../handlers/userProfile');

router.post(
  '/editProfile',
  passport.authenticate('jwt', { session: false }),
  userProfileHandler.editProfile,
);

router.post(
  '/save-contact',
  passport.authenticate('jwt', { session: false }),
  userProfileHandler.addContact,
);

router.post(
  '/get-profile',
  passport.authenticate('jwt', { session: false }),
  userProfileHandler.getProfileInfo,
);

router.post(
  '/remove-contact',
  passport.authenticate('jwt', { session: false }),
  userProfileHandler.removeContact,
);

module.exports = router;
