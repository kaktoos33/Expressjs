const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    title: {
        type: String,
        requiered: true,
    },
    author: {
        type: String,
        requiered: true,
    },
    ISBN: {
        type: String,
        requiered: true,
    },
    numberOfPages: {
        type: String,
        requiered: true,
    },
    price: {
        type: Number,
        requiered: true,
    },
    yearPublished: {
        type: String,
        requiered: true,
    }
});

module.exports = mongoose.model('Book', userSchema);
