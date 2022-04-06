const express = require("express");

const { get404, get500 } = require("../controllers/error");

const router = express.Router();

router.get("/500", get500);

router.get("*", get404);

module.exports = router;
