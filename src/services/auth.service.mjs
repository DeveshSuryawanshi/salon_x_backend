import User from "../models/User.model.mjs";
import jwt from 'jsonwebtoken';

class AuthService {
  constructor() {
    this.isLoggedIn = false;
  }

  async login(email, password) {
    try {
      // Validate input fields
      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
      }
  
      // Check if the user exists in the database
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Validate the password
      const isPasswordCorrect = await user.isPasswordCorrect(password);
      if (!isPasswordCorrect) {
        return res.status(401).json({ message: 'Invalid email or password.' });
      }
  
      // Generate a JWT token
      const token = jwt.sign(
        {
          id: user._id,
          name: user.name,
          role: user.role,
        },
        process.env.JWT_SECRET, // Replace with your secret key
        { expiresIn: '1h' } // Token expiration time
      );
  
      // Respond with user details and token
      res.status(200).json({
        message: 'Login successful.',
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          profilePic: user.profilePic || null,
        },
        token,
      });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
  }

  async register(userData) {
    const { name, email, password, role, profilePic, address } = userData;

    try {
      // Validate input fields
      if (!name || !email || !password) {
        return res
          .status(400)
          .json({ message: "Name, email, and password are required." });
      }

      // Check if email is already registered
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Email already in use." });
      }

      // Create a new user instance
      const newUser = new User({
        name,
        email,
        password, // Password will be hashed automatically via `pre('save')`
        role: role || "user", // Default role is 'user'
        profilePic: profilePic || "",
        address: address || "",
      });

      // Save the user to the database
      const savedUser = await newUser.save();

      // Respond with success message
      return res.status(201).json({
        message: "User registered successfully.",
        user: {
          id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role,
          profilePic: savedUser.profilePic,
          address: savedUser.address,
          createdAt: savedUser.createdAt,
        },
      });
    } catch (error) {
      console.error("Error registering user:", error.message);
      return res
        .status(500)
        .json({ message: "Internal Server Error", error: error.message });
    }
  }
}

export default AuthService;