const { sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const cart = sequelize.define("Cart", {
      is_purchased: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
  
    return cart;
  };