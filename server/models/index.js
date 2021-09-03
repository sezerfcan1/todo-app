const Sequelize = require("sequelize");
const sequelize = require("../helpers/database/connectDatabase");

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./User");

module.exports = {db,sequelize};