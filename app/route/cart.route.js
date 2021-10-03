const auth = require('../middleware/auth');
module.exports = function (app) {
  
    const cart = require("../controller/cart.controller.js");
  
    // add items to a cart
    app.post("/api/cart/add", auth, cart.addItem);

    //Convert and a cart to an order ---checkout
    app.put("/api/cart/:cartId/complete", auth, cart.complete);

    //list all carts for a user
    app.get("/api/cart/list", auth, cart.findAllCartsForUserId);

    //get all items for current cart
    app.get("/api/cart/items", auth , cart.findActiveCart);

};