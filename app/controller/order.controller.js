const db = require('../model/index');
const Order = db.order;

exports.findAllOrdersForUserId = async (req, res) => {
    if(req.user.id){
        try {
            const orders = await Order.findAll({
                where:{
                    UserId: req.user.id
                }
            });
            return res.status(200).send(orders);
        } catch (error) {
            console.log(error);
        }
    }
    else{
        return res.status(400).send("User id not provided");
    }
}