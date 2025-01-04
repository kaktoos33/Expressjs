const express = require("express");
const { getAllBooks, getAllBookIds, getBookById, postBook, updateBook } = require("../services/bookService");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/books", getAllBookIds);
router.get("/:bookId", getBookById);

router.post("/", postBook);
router.put("/update", updateBook);
router.delete("/:id", (req, res, next) => {
    res.status(200).json({
        message: 'successfull DELETE by id',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        }

    });
});

module.exports = router;