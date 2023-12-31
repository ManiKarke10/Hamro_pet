const User = require("../model/User");

const register = async (req, res) => {
  try {
    const email = req.body.email;
    console.log(email);
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      res.status(406).json({
        message: "The email is already registered. Please login",
      });
      return;
    }
    const user = await User.create({ ...req.body });
    const token = user.createJWT();
    res.status(200).json({
      user: { name: user.name, _id: user.id, role: user.role },
      token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

const login = async (req, res) => {

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(200).json({ message: "Please provide email and password" });
  }
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  // compare password
  const isPasswordCorrect = await user.comparePassword(password);
  if (!isPasswordCorrect) {
    return res.status(400).json({ message: "Invalid Credentials" });
  }
  const token = user.createJWT();
  res.status(200).json({
    userdetails: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    },
    token,
  });
};

module.exports = { register, login };
