const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

// to verify the jwt token
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({ error: "Unauthorized - Token not provided" });
  }

  jwt.verify(token, "defaultsecretkey", (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: "Unauthorized - Invalid Token" });
    }
    req.user = decoded;
    next();
  });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, username, email, password, confirmpassword } =
      req.body;
    const newUser = await User.create({
      firstName,
      lastName,
      username,
      email,
      password,
      confirmpassword,
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateUser = async (req, res) => {
  const userId = req.params.id;
  const { firstName, lastName, username, email, password, confirmpassword } =
    req.body;

  try {
    const updateUser = await User.findByIdAndUpdate(
      userId,
      { firstName, lastName, username, email, password, confirmpassword },
      { new: true }
    );
    if (!updateUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(updateUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deleteUser = await User.findByIdAndDelete(userId);

    if (!deleteUser) {
      return res.status(404).json({ message: "User not Found" });
    }
    res.json({ message: "User Deleted Successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
