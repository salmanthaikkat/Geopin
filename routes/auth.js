const router = require('express').Router();
const passport = require('passport');
const authHandler = require('../handlers/auth');

router.post('/register', authHandler.register);
router.post('/login', authHandler.login);
router.get(
  '/secret',
  passport.authenticate('jwt', { session: false }),
  authHandler.secret,
);

router.post('/googleAuth', authHandler.googleLogin);

router.get('/hello', authHandler.hello);

module.exports = router;
