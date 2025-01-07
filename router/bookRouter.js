const express = require("express");
const { getAllBooks, getAllBookIds, getBookById, postBook, updateBook, deleteBook } = require("../services/bookService");
const auth = require('../auth/authorization');
const router = express.Router();

router.get("/", [auth, getAllBooks]);
router.get("/books", [auth, getAllBookIds]);
router.get("/:bookId", [auth, getBookById]);

router.post("/", [auth, postBook]);
router.put("/", [auth, updateBook]);
router.delete("/", [auth, deleteBook]);

module.exports = router;