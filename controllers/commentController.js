const Comment = require("../models/comment");

// POST comments/:reportId
exports.addComment = async (req, res) => {
  try {
    const { reportId } = req.params;
    const { text } = req.body;

    const comment = new Comment({
      report: reportId,
      user: req.user._id,
      text,
    });

    await comment.save();
    res.status(201).json({ message: "Comment added", comment });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET comments/:reportId
exports.getCommentsByReportId = async (req, res) => {
  try {
    const { reportId } = req.params;
    const comments = await Comment.find({ report: reportId }).populate(
      "user",
      "name email"
    );
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comments" });
  }
};
