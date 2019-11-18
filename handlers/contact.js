const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '',
    // pass: 'email password here',
  },
});

module.exports = {
  sendContactMail: async (req, res, next) => {
    try {
      const mailOptions = {
        from: req.body.mail,
        to: req.body.mail,
        subject: `Contact ${req.body.name}`,
        html: req.body.message,
      };
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          res.send(err);
        } else {
          res.send(info);
        }
      });
    } catch (err) {
      res.send(err);
    }
  },
};
