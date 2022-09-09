const jwt = require('jsonwebtoken');

exports.authenticateToken = async (req, res, next) => {
    if(!req.headers['access-token']) return res.status(400).send({ msg: "Unauthorised: Token not found"});
    try {
        req.body.user = await jwt.verify(req.headers['access-token'], process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Token is invalid"});
    }
}

exports.authorizeUser = async (req, res, next) => {
    if(req.body.user.role !== 'admin') res.status(401).send({ msg: "You are not an admin"});
    next();
}