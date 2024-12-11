const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const User = sequelize.define('users', {
  name: Sequelize.STRING,
  email : {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  phone: Sequelize.BIGINT
});

module.exports = User;