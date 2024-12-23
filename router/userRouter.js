const express = require("express");
const { saveUser, findUser } = require("../db/db");
const User = require('../models/usermodel');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose");
const errorTemplate = require('../templates/errorTemplate');
const router = express.Router();
const loginUser = require('../services/userService');

router.post("/register", (req, res, next) => {
    findUser({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(409).json({ message: "User already exists!" });
            }
            else {
                const user = new User();
                user._id = new mongoose.Types.ObjectId();
                const newUser = Object.assign(user, req.body);
                bcrypt.hash(newUser.passWord, 10, (err, hash) => {
                    if (err) {
                        return res.status(501).json({ message: "Error " + err.message });
                    }
                    else {
                        newUser.passWord = hash;
                        saveUser(newUser)
                            .then((user) => {
                                return res.status(201)
                                    .json({ message: "Successful registration", user: user });
                            })
                            .catch((err) => {
                                errorTemplate(res, err);
                            });

                    }
                });
            }
        })
        .catch((err) => {
            errorTemplate(res, err);
        });

});

router.post("/login", loginUser);
module.exports = router;