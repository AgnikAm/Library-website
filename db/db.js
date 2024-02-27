const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://user:1MoV3SIgoxt0vA1e@librarycluster.prdrxgt.mongodb.net', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on('connected', () => {
  console.log('Connected to MongoDB');
});

module.exports = mongoose;