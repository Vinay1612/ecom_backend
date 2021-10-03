const auth = require('../middleware/auth');
module.exports = function (app) {
  
    const order = require("../controller/order.controller.js");
  
    // list orders for a user
    app.get("/api/order/list", auth, order.findAllOrdersForUserId);

};