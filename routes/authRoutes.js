const express = require("express");
const {
  register,
  login,
  logout,
  getAllStudents,
  getAllTeachers,
} = require("../controllers/authController");
const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Get students assigned to teacher (for teacher dashboard)
router.get("/students", authMiddleware, roleMiddleware("teacher"), getAllStudents);

// Get all teachers (for student signup form)
router.get("/teachers", getAllTeachers);

module.exports = router;
