const config = require('../config/db.config');

const Sequelize = require("sequelize");

const sequelize = new Sequelize(config.database, config.username, config.password, {
  host: config.host,
  dialect: config.dialect,
  operatorsAliases: false,
});

const db = {};

db.Sequelize = Sequelize; //sequelize library
db.sequelize = sequelize; // the db instance

//Models
db.user = require("./user.model.js")(sequelize, Sequelize);
db.item = require("./item.model.js")(sequelize, Sequelize);
db.cart = require("./cart.model.js")(sequelize, Sequelize);
db.order = require("./order.model.js")(sequelize, Sequelize);

//Relationships

//1. User -> Cart
//user can have multiple carts
//one to many relationship
db.user.hasMany(db.cart);
db.cart.belongsTo(db.user);

//2. Cart -> Item
// cart can have multiple items
//Item can be in multiple carts
//Many to many relationship where cartItems is the join table
let cartItems = sequelize.define('cartItems', {

},{
    timestamps: false
});

db.cart.belongsToMany(db.item, {through: cartItems});
db.item.belongsToMany(db.cart, {through: cartItems});

//3. Cart -> order
//one cart will be a mapped to one order
//one to one relationship

db.cart.hasOne(db.order);
db.order.belongsTo(db.cart);

//4.User -> order 
//one user can have multiple orders
//one to many relationship

db.user.hasMany(db.order);
db.order.belongsTo(db.user);





module.exports = db;