const multer = require('multer');
const db = require('../model');

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    callback(null, `${file.fieldname}-${Date.now()}.jpg`);
  },
});

const upload = multer({ storage }).single('profilePic');

module.exports = {
  editProfile: async (req, res, next) => {
    const { id } = req.user;

    db.User.findById(id, (err, user) => {
      if (err) {
        res.send('Error while fetching user');
      } else {
        upload(req, res, (err) => {
          user.name = req.body.name;
          user.phone = req.body.phone;
          user.email = req.body.email;
          user.country = req.body.country;
          if (req.file) {
            user.profileImage = req.file.filename;
          }
          user.save((err, user) => {
            if (err) {
              res.json({
                success: false,
                user: 'Error while updating the contact details',
              });
            } else {
              res.json({ success: true, user });
            }
          });
        });
      }
    });
  },
  addContact: async (req, res, next) => {
    const { id } = req.user;
    const { user_id } = req.body;
    db.User.findById(id, (err, user) => {
      if (err) {
        res.json({ message: 'Error while saving the contact', success: false });
      } else {
        user.saved.push(user_id);
        user.save((err) => {
          if (err) {
            res.json({
              message: 'Error while saving the contact',
              success: false,
            });
          } else {
            res.json({
              message: 'Contact saved',
              userId: user_id,
              success: true,
            });
          }
        });
      }
    });
  },
  removeContact: async (req, res, next) => {
    const { id } = req.user;
    const { user_id } = req.body;
    db.User.findById(id, (err, user) => {
      if (err) {
        res.json({ message: 'Error while saving the contact', success: false });
      } else {
        const index = user.saved.indexOf(user_id);
        if (index > -1) {
          user.saved.splice(index, 1);
          user.save((err) => {
            if (err) {
              res.json({
                message: 'Error while removing the contact',

                success: false,
              });
            } else {
              res.json({
                message: 'Contact removed',
                userId: user_id,
                success: true,
              });
            }
          });
        }
      }
    });
  },
  // Get info of other user profile
  getProfileInfo: async (req, res, next) => {
    const { id } = req.user;
    db.User.findById(id)
      .populate('saved')
      .exec((err, result) => {
        if (err) {
          res.json(err);
        } else {
          res.json(result);
        }
      });
  },
};
