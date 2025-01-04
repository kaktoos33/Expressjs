const express = require("express");
const { getAllBooks, getAllBookIds, getBookById, postBook } = require("../services/bookService");

const router = express.Router();

router.get("/", getAllBooks);
router.get("/books", getAllBookIds);
router.get("/:bookId", getBookById);

router.get("/:id", (req, res, next) => {
    res.status(200).json({
        message: "successfull Get by id",
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        }
    });
});
router.post("/", postBook);
router.put("/:id", (req, res, next) => {
    res.status(200).json({
        message: 'successfull PUT by id',
        metadata: {
            id: req.params.id,
            hostname: req.hostname,
            method: req.method,
        }

    });
});
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