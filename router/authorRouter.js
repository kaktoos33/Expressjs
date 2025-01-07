const express = require("express");
const { postAuthor, updateAuthor, deleteAuthor, getAllAuthors, getAuthorById } = require("../services/authorService");
const auth = require('../auth/authorization');
const router = express.Router();

router.get("/", [auth, getAllAuthors]);
router.get("/:authorId", [auth, getAuthorById]);

router.post("/", [auth, postAuthor]);
router.patch("/", [auth, updateAuthor]);
router.delete("/", [auth, deleteAuthor]);

module.exports = router;