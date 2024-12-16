const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    firstName: {
        type: String,
        requiered: true,
    },
    lastName: {
        type: String,
        requiered: true,
    },
    addres: {
        type: String,
        requiered: true,
    },
    city: {
        type: String,
        requiered: true,
    },
    state: {
        type: String,
        requiered: true,
    },
    email: {
        type: String,
        requiered: true,
    },
    zipCode: {
        type: String,
        requiered: true,
    },
    passWord: {
        type: String,
        requiered: true,
    }
});

module.exports = mongoose.model('User', userSchema);
