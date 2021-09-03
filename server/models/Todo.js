const { Sequelize, Model } = require("sequelize");
const sequelize = require("../helpers/database/connectDatabase");


class Todo extends Model {}

Todo.init(
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.INTEGER,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: true
    },
  },
  {
    sequelize,
    modelName: "todo",
  }
);



module.exports = Todo;
