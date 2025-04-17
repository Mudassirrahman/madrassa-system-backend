const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// REGISTER
const register = async (req, res) => {
  const { name, email, password, role, teacher } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const isUserExist = await User.findOne({ email });
  if (isUserExist) {
    return res.status(400).json({ message: "User already registered" });
  }

  const userRole = role || "student";

  const newUser = new User({
    name,
    email,
    password,
    role: userRole,
    teacher: userRole === "student" ? teacher : null,
  });

  await newUser.save();
  res.status(201).json({ message: "User registered successfully", newUser });
};

// LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const isExist = await User.findOne({ email });
  if (!isExist) {
    return res.status(401).json({ message: "Email or password not match" });
  }

  const comparePassword = await bcrypt.compare(password, isExist.password);
  if (!comparePassword) {
    return res.status(401).json({ message: "Email or password not match" });
  }

  const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

  return res.status(200).json({
    message: "User logged in successfully",
    userName: isExist.name,
    role: isExist.role,
    token: token,
  });
};

// LOGOUT
const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

// Get all students (only assigned to the logged-in teacher)
const getAllStudents = async (req, res) => {
  try {
    if (!req.user || req.user.role !== "teacher") {
      return res.status(403).json({ message: "Not authorized" });
    }

    const students = await User.find({
      role: "student",
      teacher: req.user.id,
    }).select("name email");
    res.json({ students });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const teachers = await User.find({ role: "teacher" }).select("name email");
    res.json({ teachers });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  register,
  login,
  logout,
  getAllStudents,
  getAllTeachers,
};
