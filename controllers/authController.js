const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


//REGISTER
const register = async (req, res) => {
    const { name, email, password, role } = req.body; 
  
    if (!name || !email || !password) {
      return res.status(400).json({ message: "all field required" });
    }
  
    const isUserExist = await User.findOne({ email });
  
    if (isUserExist) {
      return res.status(400).json({ message: "User Already Registerd" });
    }
  
    // If role is not provided, default it to 'student'
    const userRole = role || 'student';  
  
    const newUser = new User({
      name,
      email,
      password,
      role: userRole,  // Setting role here
    });
  
    await newUser.save();
    res.status(201).json({ message: "user registerd successfully", newUser });
  };
  

//LOGIN
const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const isExist = await User.findOne({ email });

  if (!isExist) {
    return res.status(401).json({ message: "email or password not match" });
  }

  const compairPassword = await bcrypt.compare(password, isExist.password);

  if (!compairPassword) {
    return res.status(401).json({ message: "email or password not match" });
  }

  const token = jwt.sign({ id: isExist._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "30m",
  });

  return res.status(200).json({
    message: "user logedin successfully",
    userName: isExist.name,
    token: token,
  });
};


//LOGOUT
const logout = (req, res) => {
  res.json({ message: "Logged out successfully" });
};

// get all student list on dashboard
const getAllStudents = async (req, res) => {
  try {
    const students = await User.find({ role: 'student' }).select('name email');
    res.json(students);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { register, login, logout, getAllStudents };

