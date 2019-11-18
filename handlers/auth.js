const jwt = require('jsonwebtoken');
const passport = require('passport');
const Fs = require('fs');
const Path = require('path');
const Axios = require('axios');
const db = require('../model');
require('../config/passport');

async function downloadImage(imageUrl, imageName) {
  const url = imageUrl;

  const path = Path.resolve(__dirname, '../uploads', imageName);
  const writer = Fs.createWriteStream(path);

  const response = await Axios({
    url,
    method: 'GET',
    responseType: 'stream',
  });

  response.data.pipe(writer);

  return new Promise((resolve, reject) => {
    writer.on('finish', resolve);
    writer.on('error', reject);
  });
}

module.exports = {
  register: async (req, res, next) => {
    try {
      const user = await db.User.create(req.body);
      const { id, name } = user;
      const token = jwt.sign({ id, name }, 'secretKeyword');
      return res.status(201).json({
        success: true,
        id,
        name,
        token,
      });
    } catch (err) {
      res.send({ message: 'Email already exist', success: false });
    }
  },
  login: async (req, res, next) => {
    passport.authenticate(
      'local-login',
      { session: false },
      (err, user, info) => {
        if (err || !user) {
          return res.json({
            message: 'Email or Password is Incorrect',
            success: false,
          });
        }
        req.login(user, { session: false }, (err) => {
          if (err) {
            res.send(err);
          }
          const token = jwt.sign(
            { id: user.id, name: user.name },
            'secretKeyword',
          );
          return res.json({
            success: true,
            id: user.id,
            name: user.name,
            email: user.email,
            token,
          });
        });
      },
    )(req, res);
  },
  googleLogin: async (req, res, next) => {
    const { email } = req.body;
    const phone = 'N/A';
    const country = 'N/A';
    db.User.findOne({ email }, (err, user) => {
      if (err) {
        res.json({ message: 'Error while fetching the user', success: false });
      } else if (user === null) {
        const tempImageName = 'profilePic-' + Date.now() + '.jpg';
        downloadImage(req.body.imageUrl, tempImageName).then(() => {
          db.User.create(
            {
              email: req.body.email,
              name: req.body.name,
              phone,
              country,
              profileImage: tempImageName,
            },
            (err, newUser) => {
              if (err) {
                res.json({
                  message: 'Error while creating the user',
                  success: false,
                });
              } else {
                const { id, name } = newUser;
                const token = jwt.sign({ id, name }, 'secretKeyword');
                return res.status(201).json({
                  success: true,
                  id,
                  email,
                  name,
                  token,
                });
              }
            },
          );
        });
      } else {
        const { id, name } = user;
        const token = jwt.sign({ id, name }, 'secretKeyword');
        return res.status(201).json({
          success: true,
          id,
          email,
          name,
          token,
        });
      }
    });
  },
  secret: async (req, res, next) => {
    try {
      res.send('Secret Auth');
    } catch (err) {
      return next(err);
    }
  },
  hello: async (req, res, next) => {
    res.send('Hello');
  },
};
