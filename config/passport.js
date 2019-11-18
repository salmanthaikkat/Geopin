const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const passportJWT = require('passport-jwt');
const db = require('../model');

const { ExtractJwt } = passportJWT;
const JWTStrategy = passportJWT.Strategy;

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(
  'local-login',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      db.User.findOne(
        {
          email,
        },
        (err, user) => {
          if (err) {
            console.log('Error ');
            return done(err);
          }
          if (!user) {
            return done(null, false, console.log('No user found'));
          }
          user.comparePassword(password).then((res) => {
            if (!res) {
              return done(null, false, console.log('Wrong password'));
            }
            return done(null, user);
          });
        },
      );
    },
  ),
);

passport.use(
  'google-login',
  new GoogleStrategy(
    {
      clientID:
        '72224001257-v0bitsfmhidfn045oeh2at8k6okk0it4.apps.googleusercontent.com',
      clientSecret: '3KaU8DX3cA6OrgLoRd2WhJ7F',
      callbackURL: '${process.env.REACT_APP_BACKEND_ENDPOINT}/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      const userData = {
        email: profile.emails[0].value,
        name: profile.displayName,
        token: accessToken,
      };
      done(null, userData);
    },
  ),
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'secretKeyword',
    },
    (jwtPayload, cb) => db.User.findById(jwtPayload.id)
      .then((user) => cb(null, user))
      .catch((err) => cb(err)),
  ),
);
