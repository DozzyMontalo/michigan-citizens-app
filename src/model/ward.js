const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const WardSchema = new Schema(
  {
    name: { type: String, required: true },
    lga: { type: Schema.Types.ObjectId, ref: "LGA" },
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

//Export model
module.exports = mongoose.model("Ward", WardSchema);
