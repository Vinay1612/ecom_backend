//this middleware checks if a user can access protected resources

const jwt = require("jsonwebtoken");
const config = require('../config/auth.config');
const db = require('../model/index');
const User = db.user;

const verifyToken = async (req, res, next) => {
  const token =
    req.body.token || req.query.token || req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send("Not allowed to use this resource");
  }
  try {
    const decoded = jwt.verify(token, config.secret);
    //extract the user id from the incoming token
    const userId = decoded.id;
    if(userId){
        //find the user details for the given userId
        const user = await User.findOne({
            where: userId
        });
        if(user){
            //if the incoming token is equal to the token stored in db
            if(token !== user.token){
                return res.status(401).send("Login from Multiple devices not allowed");
            }
            else{
                //same device valid user store the user details in the req object
                req.user = user;
            }
        }
    }
  } catch (err) {
    return res.status(401).send("Invalid Token");
  }
  return next();
};

module.exports = verifyToken;