const { conn, Sequelize } = require('../conn');

const Address = conn.define('address', {
    isShipping: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    street: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    city: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    state: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    zip: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    }
}, {
        timestamps: false
    })

module.exports = Address;
