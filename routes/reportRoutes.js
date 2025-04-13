const express = require('express');
const router = express.Router();
const {
    createReport,
    getReportsForStudent,
    getReportsByTeacher,
    getAllReportsWithComments
} = require('../controllers/reportController');

const authMiddleware = require('../middlewares/authMiddleware');
const roleMiddleware = require('../middlewares/roleMiddleware');

// Teacher only - Create report
router.post('/teacher', authMiddleware, roleMiddleware('teacher'), createReport);

// Student only - Get reports for logged in student
router.get('/my', authMiddleware, roleMiddleware('student'), getReportsForStudent);

// Optional: For teacher to see all reports submitted by them
router.get('/teacher', authMiddleware, roleMiddleware('teacher'), getReportsByTeacher);

// Teacher dashboard pe students ke reports fetch karne ka route
router.get('/all', authMiddleware, roleMiddleware('teacher'), getAllReportsWithComments);


module.exports = router;
