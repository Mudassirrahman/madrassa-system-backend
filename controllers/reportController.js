const Report = require("../models/report");

// POST   reports
exports.createReport = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      student,
      sabaq,
      sabqi,
      manzil,
      aageKaSabaq,
      tareeqaSunaneKa,
      overallPerformance,
    } = req.body;

    const report = new Report({
      teacher: req.user._id,
      student,

      sabaq: {
        paraName: sabaq.paraName,
        suratName: sabaq.suratName,
        ayatFrom: sabaq.ayatFrom,
        ayatTo: sabaq.ayatTo,
        mistakes: sabaq.mistakes,
        mistakeAyatNumbers: sabaq.mistakeAyatNumbers,
        otherPara: sabaq.otherPara || null, 
        otherSurat: sabaq.otherSurat || null, 
      },

      sabqi: {
        paraName: sabqi.paraName,
        suratName: sabqi.suratName,
        rukuFrom: sabqi.rukuFrom,
        rukuTo: sabqi.rukuTo,
        mistakes: sabqi.mistakes,
        mistakeAyatNumbers: sabqi.mistakeAyatNumbers,
        otherPara: sabqi.otherPara || null,
        otherSurat: sabqi.otherSurat || null,
      },

      manzil: {
        paraName: manzil.paraName,
        suratName: manzil.suratName,
        totalRuku: manzil.totalRuku,
        mistakes: manzil.mistakes,
        mistakeRukuNumbers: manzil.mistakeRukuNumbers,
        otherPara: manzil.otherPara || null,
        otherSurat: manzil.otherSurat || null,
      },

      aageKaSabaq: {
        paraName: aageKaSabaq.paraName,
        suratName: aageKaSabaq.suratName,
        ayatFrom: aageKaSabaq.ayatFrom,
        ayatTo: aageKaSabaq.ayatTo,
        totalAyat: aageKaSabaq.totalAyat,
        otherPara: aageKaSabaq.otherPara || null,
        otherSurat: aageKaSabaq.otherSurat || null,
      },

      tareeqaSunaneKa,
      overallPerformance,
    });

    await report.save();
    res.status(201).json({ message: "Report created successfully", report });
  } catch (err) {
    res.status(500).json({ message: `Error: ${err.message}` });
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
      })
      .sort({ createdAt: -1 });

    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: "Error fetching reports" });
  }
};
