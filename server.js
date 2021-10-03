var express = require("express");
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());

// include database config file
const db = require("./app/model");

// force: true will drop the table if it already exists
// db.sequelize.sync({ force: true }).then(() => {
//   console.log("Drop and Resync with { force: true }");
// });
db.sequelize.sync().then(()=> {
    console.log("sync");
});

// include application routes
require("./app/route/user.route.js")(app);
require("./app/route/item.route.js")(app);
require("./app/route/cart.route.js")(app);
require("./app/route/order.route.js")(app);

// Create & Listen Server
var server = app.listen(8081, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log("Application request listening at http://%s:%s", host, port);
});
