const auth = require('../middleware/auth');
module.exports = function (app) {
  
    const user = require("../controller/user.controller.js");
  
    // Create a new user ---signUP
    app.post("/api/user/create", user.createUser);

    //login an existing user -- LoginIN
    app.post("/api/user/login",user.createToken);
  
    // Retrieve all users
    app.get("/api/user/list",auth, user.findAll);

  };