const express = require('express');
const {checkUserExist} = require("../middlewares/database/databaseErrorHelpers");
const { getSingleUser } = require("../controllers/user.js");

const router = express.Router();

router.get("/",getSingleUser);


module.exports = router;