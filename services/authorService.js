require('dotenv').config();
const Author = require('../models/authorModel');
const mongoose = require("mongoose");
const errorTemplate = require('../templates/errorTemplate');
const messages = require('../messages/messages');
const successTemplate = require('../templates/successTemplate');
const { findAuthors, findAuthorByID, saveAuthor, updateAuthor, deleteAuthor } = require('../db/authorDb');


exports.getAllAuthors = async (req, res) => {
    try {
        console.log('getAllAuthors is calling');
        const authors = await findAuthors({}, '-__v');
        successTemplate(res, authors, "", 200);
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

exports.getAuthorById = async (req, res) => {
    try {
        console.log('getAuthorById is calling');
        const author = await findAuthorByID({ _id: req.params.authorId }, '-__v');
        if (!author) {
            throw new Error(messages.author_not_found);
        }
        else {
            successTemplate(res, author, messages.author_found, 200);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

exports.postAuthor = async (req, res) => {
    try {
        console.log('save Author is calling');

        const foundAuthor = await findAuthorByID({
            name: req.body.name,
            book: req.body.book
        });
        console.log(req.body);
        console.log(foundAuthor);
        if (!foundAuthor) {
            const author = new Author();
            const newAuthor = Object.assign(author, req.body);
            newAuthor._id = new mongoose.Types.ObjectId();
            const saved = await saveAuthor(newAuthor);
            successTemplate(res, saved, messages.author_saved, 201);
        }
        else {
            throw new Error(messages.author_cataloged);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

exports.updateAuthor = async (req, res) => {
    try {
        console.log('update author is calling');
        const foundAuthor = await findAuthorByID({ _id: req.body._id });
        if (foundAuthor) {

            const updated = await updateAuthor({ _id: foundAuthor._id }, req.body);
            successTemplate(res, updated, messages.author_updated, 200);
        }
        else {
            throw new Error(messages.book_not_found);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};
exports.deleteAuthor = async (req, res) => {
    try {
        console.log('delete author is calling');
        const foundAuthor = await findAuthorByID({ _id: req.body._id });
        if (foundAuthor) {

            const deleted = await deleteAuthor({ _id: foundAuthor._id });
            successTemplate(res, deleted, messages.author_updated, 200);
        }
        else {
            throw new Error(messages.author_deleted);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

