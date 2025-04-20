const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema(
  {
    teacher: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Sabaq Section
    sabaq: {
      paraName: { type: String },
      suratName: { type: String },
      ayatFrom: { type: Number },
      ayatTo: { type: Number },
      mistakes: { type: Number },
      mistakeAyatNumbers: [{ type: Number }],
      otherPara: { type: String },            // Optional
      otherSurat: { type: String },           // Optional
    },

    // Sabqi Section
    sabqi: {
      paraName: { type: String },
      suratName: { type: String },
      rukuFrom: { type: Number },
      rukuTo: { type: Number },
      mistakes: { type: Number },
      mistakeAyatNumbers: [{ type: Number }],
      otherPara: { type: String },            // Optional
      otherSurat: { type: String },           // Optional
    },

    // Manzil Section
    manzil: {
      paraName: { type: String },
      suratName: { type: String },
      totalRuku: { type: Number },
      mistakes: { type: Number },
      mistakeRukuNumbers: [{ type: Number }],
      otherPara: { type: String },            // Optional
      otherSurat: { type: String },           // Optional
    },

    // New Sabaq Section
    aageKaSabaq: {
      paraName: { type: String },
      suratName: { type: String },
      ayatFrom: { type: Number },
      ayatTo: { type: Number },
      totalAyat: { type: Number },
      otherPara: { type: String },            // Optional
      otherSurat: { type: String },           // Optional
    },

    tareeqaSunaneKa: { type: String },
    overallPerformance: { type: String },
  },
  {
    timestamps: true,
  }
);

reportSchema.virtual("comments", {
  ref: "Comment",
  localField: "_id",
  foreignField: "report",
});

reportSchema.set("toObject", { virtuals: true });
reportSchema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Report", reportSchema);
