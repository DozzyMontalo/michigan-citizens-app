const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CitizenSchema = new Schema(
  {
    first_name: { type: String, required: true, maxLength: 100 },
    family_name: { type: String, required: true, maxLength: 100 },
    phone_number: { type: Number, min: 9, required: true },
    gender: { type: String, required: true, enum: ["male", "female"] },
    address: { type: String, required: true },
    // ward: { type: Schema.Types.ObjectId, ref: "Ward" },
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

//virtual for citizen's full name
CitizenSchema.virtual("name").get(function () {
  let fullname = "";
  if (this.first_name && this.family_name) {
    fullname = `${this.family_name}, ${this.first_name}`;
  }
  if (!this.family_name || !this.family_name) {
    fullname = "";
  }
  return fullname;
});

//virtual for citizen's url
CitizenSchema.virtual("url").get(function () {
  return;
});

//Export model
module.exports = mongoose.model("Citizen", CitizenSchema);
