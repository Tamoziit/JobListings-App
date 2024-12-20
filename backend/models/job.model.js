const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectToDb.js");

// Define the Job model
const Job = sequelize.define("Job", {
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    company: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    location: {
        type: DataTypes.STRING,
    },
    salary: {
        type: DataTypes.DECIMAL(10, 2),
    },
    createdAt: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Job;
