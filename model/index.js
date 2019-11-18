const mongoose = require('mongoose');

mongoose.set('debug', true);

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

// mongoose.connect('mongodb://localhost:27017/geopin', { useNewUrlParser: true });
mongoose.connect('mongodb://geopin:geopin123@ds161724.mlab.com:61724/geopin', {
  useNewUrlParser: true,
});

module.exports.User = require('./user');
module.exports.Pin = require('./pin');
