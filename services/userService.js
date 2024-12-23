require('dotenv').config();
const User = require('../models/usermodel');
const mongoose = require("mongoose");
const { saveUser, findUser } = require("../db/db");
const errorTemplate = require("../templates/errorTemplate");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const registerUser = async (req, res) => {
    findUser({ email: req.body.email })
        .then((user) => {
            if (user) {
                return res.status(409).json({ message: "User already exists!" });
            }
            else {
                const user = new User();
                user._id = new mongoose.Types.ObjectId();
                const newUser = Object.assign(user, req.body);
                console.log(newUser);
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
            console.log('err');
            errorTemplate(res, err);
        });
};

const loginUser = async (req, res) => {
    try {
        const loggedUser = await findUser({ email: req.body.email });
        if (!loggedUser) {
            throw new Error('Authentication failed, unable to fine user');
        } else {
            const result = bcrypt.compare(req.body.passWord, loggedUser.passWord);
            if (result) {
                const token = jwt.sign({ user: loggedUser }, process.env.jwt_secret);
                return res.status(201).json({
                    user: loggedUser,
                    logged: true,
                    token: token,
                    message: "Login successful",
                });

            } else {
                throw new Error('Authentication failed, email or password does not match');
            }
        }
    }
    catch (e) {
        return errorTemplate(res, e, e.message);

    }
};

module.exports = { loginUser, registerUser };