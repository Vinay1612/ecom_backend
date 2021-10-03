module.exports = (sequelize, Sequelize) => {
    const item = sequelize.define("Item", {
      name: {
        type: Sequelize.STRING(100),
      }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
  
    return item;
  };