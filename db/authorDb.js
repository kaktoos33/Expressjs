require('dotenv').config();
const mongoose = require("mongoose");
const Author = require("../models/authorModel");

const findAuthors = async (obj) => {
    return await Author.find(obj).populate('book').select('-__v').exec();
};
const findAuthorByID = async (obj) => {
    return await Author.findOne(obj).populate('book').select('-__V').exec();
};
const saveAuthor = async (newAuthor) => {
    return await newAuthor.save();
};
const updateAuthor = async (filter, update) => {
    return await Author.updateOne(filter, update, { new: true }).exec();
};
const deleteAuthor = async (obj) => {
    return await Author.deleteOne(obj).exec();
};
module.exports = { saveAuthor, updateAuthor, deleteAuthor, findAuthors, findAuthorByID };