const express = require("express");
const users = require("../controllers/users");
const authorize = require("../controllers/authorize");

const router = express.Router();

router.post("/create", users.signup);
router.post("/login", users.login);

router.patch("/update", authorize.authenticateToken, users.updateUser);

//Authorized: Only admin can see
router.get(
    "/",
    authorize.authenticateToken,
    authorize.authorizeUser,
    users.getUsers
);

module.exports = router;
