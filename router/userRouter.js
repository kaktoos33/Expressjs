const express = require("express");
const { saveUser } = require("../db/db");

const router = express.Router();

router.post("/register", (req, res, next) => {
    // saveUser(newUser)
    res.status(200).json({
        message: 'Server is up',
        metadata: {
            hostname: req.hostname,
            method: req.method
        }

    });
});

module.exports = router;