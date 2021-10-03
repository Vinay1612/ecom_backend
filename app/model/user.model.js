module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("User", {
      name: {
        type: Sequelize.STRING(100),
      },
      username: {
        type: Sequelize.STRING(100),
      },
      password: {
        type: Sequelize.STRING(100),
      },
      token: {
        type: Sequelize.TEXT,
      }
    }, {
        timestamps: true,
        createdAt: true,
        updatedAt: false
    });
  
    return user;
  };