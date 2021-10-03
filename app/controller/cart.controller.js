const db = require('../model/index');
const Cart = db.cart;
const Order = db.order;
const Item = db.item;

exports.addItem = async (req, res) => {
    try {
        const { itemId } = req.body;
        console.log(itemId,"Item ID");
        if(itemId){
            //check if an unpurchased cart is present for the user
            const cart = await Cart.findOne({
                where: {
                    UserId: req.user.id,
                    is_purchased: false
                }
            });
            console.log("found in db",cart);
            //if not present create a new cart for user
            if(!cart){
                const cart = await Cart.create({
                    is_purchased: false
                });
                cart.setUser(req.user.id);
                console.log("created in db",cart);
            }

            //add itemId to the existing cart also the userId to which the cart belongs --ie in the cartItems join table
            console.log("here",cart);
            if(cart){
                cart.addItem(itemId);
                return res.status(200).send("Item added successfully to cart");
            }
        }
        else{
            return res.status(400).send("Invalid input");
        }
    } catch (error) {
        console.log("Error adding items",error);
    }
};

exports.complete = async (req,res) => {
    const { cartId } = req.params;
    console.log(cartId,"cartId");
    if(cartId){
        try {
            //fetch the cart for the incoming cart id from db
            const cart = await Cart.findOne({
                where: {
                    id: cartId
                }
            });
            console.log(cart,"cart");
            if(cart){
                //make the status to purchased
                cart.is_purchased = true;
                await cart.save();
                //create an entry in the order table for this cart id, user id
                const order = await Order.create();
                order.setCart(cartId);
                order.setUser(req.user.id);
                return res.status(200).send("order placed successfully");
            }
            else{
                return res.status(400).send("Invalid cart");
            }
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(400).send("Invalid input");
    }
};

exports.findAllCartsForUserId = async (req, res) => {
    if(req.user.id){
        try {
            //find all carts for given user id
            const carts = await Cart.findAll({
                where: {
                    UserId: req.user.id
                }
            });
            return res.status(200).send(carts);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(400).send("User id not provided");
    }
};
exports.findActiveCart = async (req, res) => {
    if(req.user.id){
        try {
            //find all carts for given user id
            const carts = await Cart.findOne({
                where: {
                    UserId: req.user.id,
                    is_purchased: false
                },
                include : Item
            });
            return res.status(200).send(carts);
        } catch (error) {
            console.log(error);
        }
    }
    else {
        return res.status(400).send("User id not provided");
    }
};