const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/biblioteka', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;