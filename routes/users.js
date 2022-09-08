const express = require("express");
const users = require("../controllers/users");
const authorize = require("../controllers/authorize");

const router = express.Router();

router.get('/', users.getUsers);
router.post("/create", users.signup);
router.post('/login', users.login);

router.patch('/update', authorize.authorize, users.update);

module.exports = router;
