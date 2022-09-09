const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const usersRouter = require("./routes/users");
const authorize = require("./controllers/authorize");

dotenv.config();
app.use(cors());
app.use(express.json());

app.use("/", async (req, res, next) => {
    next();
});

app.get('/', (req, res) => {
    res.send("Full stack backend");
})

app.use('/users', usersRouter);

const PORT = process.env.PORT || 5001;
const URL = process.env.MONGO_URL;
    mongoose.connect(URL, () => {
    app.listen(PORT, () => {
    console.log(`Server is started on ${PORT}`);
    });
});
