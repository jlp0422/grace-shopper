const { conn, Sequelize } = require('../conn');

const Review = conn.define('review', {
  rating: {
    type: Sequelize.INTEGER,
    validate: {
      min: 0,
      max: 5
    }
  },
  description: {
    type: Sequelize.TEXT
  }
}, {
  timestamps: false
});

module.exports = Review;
