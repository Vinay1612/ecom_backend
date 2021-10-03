const db = require('../model/index');
const Item = db.item;

// Post a Item
exports.create = (req, res) => {
    // Save to MySQL database
    Item.create({
      name: req.body.name,
    }).then((item) => {
      res.status(200).json({
        status: true,
        message: "Item created successfully",
      });
    });
  };

//list all items
exports.findAll = (req, res) => {
    Item.findAll().then((items) => {
      // Send all Users as response
      res.status(200).json({
        status: true,
        data: items,
      });
    });
};