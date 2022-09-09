const { Schema, model } = require("mongoose");

const usersSchema = new Schema({
    name: { type: "string", required: true },
    email: { type: "string", required: true},
    password: { type: "string", required: true },
    age: Number,
    dob: Date,
    location: String,
    role: { type: "string", enum: ["admin", "user"], default: "user" },
});

module.exports = model("users", usersSchema);
