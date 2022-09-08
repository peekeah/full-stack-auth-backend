const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5001;
const URL = process.env.MONGO_URL;
mongoose.connect(URL, () => {
    app.listen(PORT, () => {
        console.log(`Server is started on ${PORT}`);
    })
})
