module.exports = (sequelize, Sequelize) => {
    const order = sequelize.define("Order", {
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
  
    return order;
  };