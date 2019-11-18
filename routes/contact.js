const router = require('express').Router();
const contactHandler = require('../handlers/contact');

router.post('/sendMail', contactHandler.sendContactMail);

module.exports = router;
