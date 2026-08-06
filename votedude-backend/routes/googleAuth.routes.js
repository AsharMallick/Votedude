const express = require("express");
const router = express.Router();

const { googleLogin } = require("../controllers/googleAuth.controllers");

router.post("/google", googleLogin);

module.exports = router;
