const express = require("express");
const router = new express.Router();
const { lookUpCitizen } = require("../controllers/citizensController");
const { auth } = require("../middleware/auth");

router.get("/homeland/citizens/:id", auth, lookUpCitizen);

module.exports = router;
