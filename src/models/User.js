const { dataTypes } = require("sequelize");
const sequelize = require("../config/db");

const User = sequelize.define("User", {
  id: {
    type: dataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  googleId: {
    type: dataTypes.STRING,
    unique: true,
    allowNull: false
  },
  name: dataTypes.STRING,
  email: dataTypes.STRING,
  avatar: dataTypes.STRING
});

module.exports = User;
