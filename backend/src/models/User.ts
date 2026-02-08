import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    select: false, // Don't return password by default
  },
  provider: {
    type: String,
    enum: ['google', 'demo', 'email'],
    default: 'email',
  },
  googleId: {
    type: String,
    sparse: true,
  },
  avatar: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  lastLogin: Date,
});

export const User = mongoose.model('User', userSchema);
