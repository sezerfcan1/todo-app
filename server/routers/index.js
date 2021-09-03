const express = require('express');
const auth = require('./auth');
const user = require("./user");
const todo = require("./todo")
const router = express.Router();

router.use("/auth",auth);
router.use("/users",user);
router.use("/todo",todo)

module.exports = router;