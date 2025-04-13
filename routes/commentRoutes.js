const express = require('express');
const router = express.Router();
const {
    addComment,
    getCommentsByReportId
} = require('../controllers/commentController');

const authMiddleware = require('../middlewares/authMiddleware');

// Add comment (student/parent)
router.post('/:reportId', authMiddleware, addComment);

// Get all comments for a report
router.get('/:reportId', authMiddleware, getCommentsByReportId);

module.exports = router;
