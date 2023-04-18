const User = require("../model/user");

//Create user callback function
const userCreate = async (req, res) => {
  const { name, email, password } = req.body;

  //Confirm data
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //Check for duplicate username
  const duplicate = await User.findOne({ name }).lean().exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate name" });
  }
  const user = new User(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error.message);
  }
};

//userLogin callback fuction
const userLogin = async (req, res) => {
  try {
    const user = await User.findByCredentials(
      req.body.email,
      req.body.password
    );
    const token = await user.generateAuthToken();
    res.status(200).send({ user, token });
  } catch (e) {
    res.status(400).send(e.message);
  }
};

//userProfile callback function
const userProfile = async (req, res) => {
  res.send(req.user);
};

//userLogout callback function
const userLogout = async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token != req.token;
    });

    await req.user.save();
    res.send();
  } catch (e) {
    res.status(500).send(e.message);
  }
};

module.exports = {
  userCreate,
  userLogin,
  userProfile,
  userLogout,
};
