const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  username: { 
    type: String,
    required: true, 
    unique: true 
  },
  password: {
    type: String,
    required: true
  },
  profilePicture: {
    type: String,
    default: 'https://cdn.pixabay.com/photo/2018/11/13/21/43/avatar-3814049_1280.png'
  },
  currentBorrowed: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    borrowedAt: {
      type: Date,
      default: Date.now
    }
  }],
  historyBorrowed: [{
    book: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Book'
    },
    borrowedAt: {
      type: Date,
      default: Date.now
    },
    returnedAt: Date
  }]
});

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;