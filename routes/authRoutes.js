const express = require("express");
const { register, login, logout, getAllStudents } = require("../controllers/authController");
const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);

// Get all students (accessible by teacher only)
router.get('/students', authMiddleware, roleMiddleware('teacher'), getAllStudents);

module.exports = router;
