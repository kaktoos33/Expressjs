require('dotenv').config();
const Book = require('../models/bookModel');
const mongoose = require("mongoose");
const errorTemplate = require('../templates/errorTemplate');
const { findBooks, findBook, saveBook, updateBook } = require('../db/bookDb');
const messages = require('../messages/messages');
const successTemplate = require('../templates/successTemplate');


exports.getAllBooks = async (req, res) => {
    try {
        console.log('getAllBooks is calling');
        const books = await findBooks({}, '-__v');
        return res.status(200).json({
            message: 'successfull Books',
            metadata: {
                books: books,
                hostname: req.hostname,
                method: req.method,
            }
        });
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};
exports.getAllBookIds = async (req, res) => {
    try {
        console.log('getAllBookIds is calling');
        const books = await findBooks({}, '_id,title');
        return res.status(200).json({
            message: 'successfull Books',
            metadata: {
                books: books,
                hostname: req.hostname,
                method: req.method,
            }
        });
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};
exports.getBookById = async (req, res) => {
    try {
        console.log('getBookById is calling');
        console.log(req.params.bookId);
        const book = await findBook({ _id: req.params.bookId }, '-__v');
        if (!book) {
            throw new Error(messages.book_not_found);
        }
        else {
            successTemplate(res, book, messages.book_found, 200);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

exports.postBook = async (req, res) => {
    try {
        console.log('save book is calling');
        const bookStub = new Book();
        let foundBook = Object.assign(bookStub, req.body);
        const book = await findBook(foundBook);
        if (!book) {
            foundBook._id = new mongoose.Types.ObjectId();
            const saved = await saveBook(foundBook);
            successTemplate(res, saved, messages.book_saved, 200);
        }
        else {
            throw new Error(messages.book_cataloged);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};

exports.updateBook = async (req, res) => {
    try {
        console.log('update book is calling');
        const foundBook = await findBook({ _id: req.body._id });
        if (foundBook) {

            const updated = await updateBook({ _id: foundBook._id }, req.body);
            successTemplate(res, updated, messages.book_updated, 200);
        }
        else {
            throw new Error(messages.book_not_found);
        }
    }
    catch (err) {
        errorTemplate(res, err, err.message);
    }
};