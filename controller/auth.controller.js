const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require("../model/user.model");



exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the username already exists
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'Username already exists' });
    }

    // Hash the password before storing it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    // Return a success message
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};

// User login
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).json({ error: 'Login failed' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Login failed' });
    }

    const { password: passwordHash, ...otherDetails } = user.toJSON();

    const token = jwt.sign({ userId: user._id }, process.env.SECRET, { expiresIn: '1h' }); 

   
    res.cookie('token', token, {
      maxAge: 3600000, 
      httpOnly: false,
      secure: false, 
    });

    return res.status(200).json(
    { 
        token: token, 
        user: otherDetails, 
        message: 'Login successful' 
    });
  
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Something went wrong' });
  }
};


exports.logout = (req, res) => {
  try {
    // Clear the token cookie
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
    });

    // Return a success message
    return res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to logout' });
  }
};


