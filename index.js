const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const path = require('path');

require('./config/passport');

const routes = require('./routes');

const port = process.env.PORT || 8080;

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.use(passport.initialize());

app.use('/api/auth', routes.auth);
app.use('/api/contact', routes.contact);
app.use('/api/location', routes.location);
app.use('/api/userProfile', routes.userProfile);

app.use('/uploads', express.static('uploads'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
