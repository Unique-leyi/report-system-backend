const User = require("../model/user.model");

// Create a new user
exports.createUser = async (req, res) => {
    try {
      const { username, password } = req.body;
      const newUser = new User({ username, password });
      await newUser.save();
      res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Read all users
 exports.getUsers =  async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Read a single user by ID
  exports.getUser = async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Update a user by ID
  exports.updateUser =  async (req, res) => {
    try {
      const { username, password } = req.body;
      const updatedUser = { username, password };
      const user = await User.findByIdAndUpdate(req.params.id, updatedUser, { new: true });
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  // Delete a user by ID
  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndRemove(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      res.json({ message: 'User deleted' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  