const users = require('../models/users');
const bcrypt = require('bcrypt');

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

    res.send(existUser);

}


exports.getUsers = async (req, res) => {
    try {
        const data = await users.find({});
        res.send(data);
    } catch(err) {
        res.status(403).send(err.message);
    }
}