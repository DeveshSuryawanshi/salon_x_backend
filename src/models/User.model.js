import bcrypt from 'bcryptjs';
import validator from 'validator';
import mongoose from 'mongoose';

// Create User Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minlength: [3, 'Name must be at least 3 characters long'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: [validator.isEmail, 'Please provide a valid email address'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters long'],
    },
    role: {
      type: String,
      enum: ['user', 'employee', 'manager', 'admin', 'superAdmin'], // Role of the user
      default: 'user',
    },
    // Any other fields you may need for advanced features
    profilePic: {
      type: String, // URL for the user's profile picture (optional)
    },
    address: {
      type: String, // User address (optional)
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // To automatically manage createdAt and updatedAt
  }
);

// Hash the user's password before saving to the database
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next(); // Only hash the password if it's modified

  try {
    const salt = await bcrypt.genSalt(10); // Generate salt
    this.password = await bcrypt.hash(this.password, salt); // Hash password
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare entered password with hashed password
userSchema.methods.isPasswordCorrect = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the model
const User = mongoose.model('User', userSchema);

export default User;
