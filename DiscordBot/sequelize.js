const { Sequelize } = require('sequelize');
const config = require('./config.json');

// sqlite Database connection
const sequelize = new Sequelize('database', 'user', 'password', {
    host: config.host,
    dialect: config.dialect,
    logging: config.logging,
    storage: config.storage,
});

module.exports = {
    images: sequelize.define('images', {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image_name: {
            type: Sequelize.STRING,
            unique: true,
        },
        uploaded: {
            type: Sequelize.BOOLEAN,
            defaultValue: 0,
        },
        upvotes: {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        }
    })
};