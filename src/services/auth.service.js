class AuthService {
  constructor() {
    this.isLoggedIn = false;
  }

  async login(email, password) {
    // your login logic here
  }

  async register(email, password) {
    const { name, email, password, role, profilePic, address } = req.body;

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