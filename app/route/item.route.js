const auth = require('../middleware/auth');
module.exports = function (app) {
  
    const item = require("../controller/item.controller.js");
  
    // Create a new item
    app.post("/api/item/create", auth, item.create);

    //list all items 
    app.get("/api/item/list", auth,item.findAll);
  };