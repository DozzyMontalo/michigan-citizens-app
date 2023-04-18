const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const StateSchema = new Schema(
  {
    name: { type: String, required: true },
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

module.exports = mongoose.model("State", StateSchema);
