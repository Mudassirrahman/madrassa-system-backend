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
    sabaq: { type: String, required: true },
    sabqi: { type: String, required: true },
    manzil: { type: String, required: true },
    aageKaSabaq: { type: String, required: true },
    tareeqaSunaneKa: { type: String, required: true },
    totalAyat: { type: Number, required: true },
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
