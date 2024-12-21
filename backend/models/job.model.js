const { DataTypes } = require("sequelize");
const { sequelize } = require("../db/connectToDb.js");

const Job = sequelize.define("Job", {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    posted_date: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    company_logo_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_page_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    salary: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    summary: {
        type: DataTypes.TEXT,
        allowNull: true,
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_remote: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
    },
    workplace_types: {
        type: DataTypes.JSON,
        allowNull: true,
    },
    created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
});

module.exports = Job;