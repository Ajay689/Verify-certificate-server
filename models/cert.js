const mongoose = require("mongoose");
const certSchema = mongoose.Schema({
     _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        required: true
    },
    course: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/

    },
    rollNo: {
        type: String,
        required: true
    },
    date: { type: Date, required: true, default:Date.now() },
})

module.exports = mongoose.model("Cert", certSchema);
