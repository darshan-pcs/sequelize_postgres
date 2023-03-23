const { Sequelize } = require('sequelize');
const express = require("express")

const sequelize = new Sequelize('abc', 'postgres', '123', {
    host: 'localhost',
    dialect: 'postgres'
})

try {
    const success = sequelize.authenticate();
    console.log(success);
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

var db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;