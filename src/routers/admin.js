const express = require("express");
const router = new express.Router();
const { createCitizen } = require("../controllers/citizensController");
const { auth, isAdmin } = require("../middleware/auth");

//only Admin is allowed to create a citizen
router.post("/admin/new", auth, isAdmin, createCitizen);

module.exports = router;
