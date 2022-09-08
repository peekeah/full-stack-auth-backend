const jwt = require('jsonwebtoken');

exports.authorize = async (req, res, next) => {
    if(!req.headers['access-token']) return res.status(400).send({ msg: "Unauthorised: Token not found"});
    try {
        await jwt.verify(req.headers['access-token'], process.env.JWT_SECRET_KEY);
        next();
    } catch (err) {
        return res.status(401).send({ msg: "Token is invalid"});
    }
}