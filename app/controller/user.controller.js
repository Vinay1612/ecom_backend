const db = require('../model/index');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const User = db.user;

//Create a user
exports.createUser = async (req, res) => {
    try {
        // get user input
        const { name, username, password} = req.body;

        //validate user input
        if( !(name && username && password)){
            res.status(400).send("All inputs are required");
        }

        //check if user already exists in database
        const oldUser = await User.findOne({
            where: { username: username}
        });

        if(oldUser) {
            return res.status(409).send("User already exists!. Please Login if existing Or use a different username");
        }

        //it's a standard practice to encrypt user password before storing in db
        encryptedPassword = await bcrypt.hash(password, 10);

        //create user in database 
        const user = await User.create({
            name: name,
            username: username,
            password: encryptedPassword,
        });

        // send the new user as response
        res.status(201).json(user);
    } catch (error) {
        console.log("error in signup",error);
        
    }   
};

//create token for an existing user
exports.createToken = async (req, res) => {
    try {
        //get user input
        const { username, password} = req.body;

        //validate input
        if (!(username && password)) {
            res.status(400).send("All inputs are required");
        }

        //validate if user exist in db
        const user = await User.findOne({
            where: { username: username}
        });
        if (user && (await bcrypt.compare(password, user.password))) {
            // //check if user is logging in from a different device
            // if(user.token){
            //     res.status(400).send("Login from Multiple devices not allowed! Please Logout before Login from new device");
            // }
            // Create token
            const token = jwt.sign(
                {id: user.id},
                config.secret
            );
            // save user token in db
            user.token = token;
            await user.save();
      
            // user
            res.status(200).json(user);
        }
        else{
            if(!user) {
                res.status(400).send("Signup needed");
            }
            else{
                res.status(400).send("Invalid Credentials");
            }
        }
    } catch (error) {
        console.log(error);
    }
};

//list all users
exports.findAll = async (req, res) => {
    try {
        console.log(req.userID,"this is the user ID");
        const users = await User.findAll();
        res.status(200).json({
        status: true,
        data: users
        });
    } catch (error) {
        console.log(error);
    }
};
