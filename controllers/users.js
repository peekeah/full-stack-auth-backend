const users = require('../models/users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req,res) => {
    try{
        //Validating Email
        const existUser = await users.findOne({ email: req.body.email});
        if(existUser) return res.status(500).send({ msg: "User already exists"});

        //Hashing Password
        const salt = await bcrypt.genSalt(7);
        req.body.password = await bcrypt.hash(req.body.password, salt);

        //Storing in DB
        const data = await new users({...req.body}).save();
        res.send(data);
    } catch(err) {
        res.status(403).send(err.message);
    }
}

exports.login = async (req, res) => {
    //Validating Email
    const existUser = await users.findOne({ email: req.body.email});
    if(!existUser) return res.status(500).send({ msg: "User does not exists"});

    //Password Validation
    const isValid = await bcrypt.compare(req.body.password, existUser.password);
    if(!isValid) return res.status(500).send({ msg: "Incorrect Password"});

    //Generating token
    const token = jwt.sign(existUser.toJSON(), process.env.JWT_SECRET_KEY);
    res.send(token)
}

//Getting data of all user
exports.getUsers = async (req, res) => {
    try {
        const data = await users.find({});
        res.send(data);
    } catch(err) {
        res.status(403).send(err.message);
    }
}

//Update data of user
exports.updateUser = async (req, res) => {
    try {
        let data = {...req.body};
        delete data.user;
    
        const user = await users.findOneAndUpdate({_id: req.body._id}, data);
        res.send(user);
    } catch(err) {
        res.send(403).send(err.message);
    }
}