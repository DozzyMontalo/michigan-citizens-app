const Citizen = require("../model/citizen");

//Controller function to create citizen
const createCitizen = async (req, res) => {
  const citizen = new Citizen({
    ...req.body,
    admin: req.user._id,
  });
  try {
    await citizen.save();
    res.status(201).send(citizen);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//Controller function to look up a specific citizen
const lookUpCitizen = async (req, res) => {
  const _id = req.params.id;
  try {
    const citizen = await Citizen.findById(_id).lean().exec();

    if (!citizen) {
      return res.status(404).json({ error: "citizen not found" });
    }
    res.send(citizen);
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  createCitizen,
  lookUpCitizen,
};
