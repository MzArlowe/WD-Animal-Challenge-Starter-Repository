const {Sequelize} = require('sequelize');

const db = new Sequelize("postgres://postgres:2d2233dbb0e741cf9014e40264ac3f23@localhost:5432/animal-server");

module.exports = db;