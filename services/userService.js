require('dotenv').config();
const { findUser } = require("../db/db");
const errorTemplate = require("../templates/errorTemplate");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports = loginUser;