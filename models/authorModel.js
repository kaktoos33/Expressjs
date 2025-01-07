const mongoose = require("mongoose");

const authorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        requiered: true,
    },
    book: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Book',
        requiered: true,
    },
    publisher: {
        type: String,
        required: true,
    },
    website: {
        type: String,
        required: false,
    },
    twitter: {
        type: String,
        required: false,
    },
    about: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('Author', authorSchema);
