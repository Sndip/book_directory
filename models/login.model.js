const db = require("../config/db.config");

const { Sequelize, DataTypes } = require("sequelize");

const Login = db.define("login", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    allowNull: false,
  },
  username: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false,
    unique: true,
  },
  role: {
    type: DataTypes.STRING(45),
    allowNull: false,
  },
});

module.exports = Login;
