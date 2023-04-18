const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const LGASchema = new Schema(
  {
    name: { type: String, required: true },
    state: { type: Schema.Types.ObjectId, ref: "State" },
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
module.exports = mongoose.model("LGA", LGASchema);
