const express = require("express");
const users = require("../controllers/users");

const router = express.Router();

router.get('/', users.getUsers);
router.post("/create", users.signup);
router.post('/login', users.login);

module.exports = router;
