const Report = require("../models/report");

// POST   reports
exports.createReport = async (req, res) => {
  try {
    const {
      student,
      sabaq,
      sabqi,
      manzil,
      aageKaSabaq,
      tareeqaSunaneKa,
      totalAyat,
    } = req.body;

    const report = new Report({
      teacher: req.user._id,
      student,
      sabaq,
      sabqi,
      manzil,
      aageKaSabaq,
      tareeqaSunaneKa,
      totalAyat,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET reports/my (student)
exports.getReportsForStudent = async (req, res) => {
  try {
    const reports = await Report.find({ student: req.user._id }).populate(
      "teacher",
      "name"
    );
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Optional: GET reports/teacher (teacher)
exports.getReportsByTeacher = async (req, res) => {
  try {
    const reports = await Report.find({ teacher: req.user._id }).populate(
      "student",
      "name"
    );
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// get All Reports With Comments
exports.getAllReportsWithComments = async (req, res) => {
  try {
    const reports = await Report.find()
      .populate({
        path: "comments",
        populate: {
          path: "user",
          select: "name",
        },
      }).sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
