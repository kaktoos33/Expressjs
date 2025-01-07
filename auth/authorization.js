require('dotenv').config();
const jwt = require('jsonwebtoken');
const errorTemplate = require('../templates/errorTemplate');
const messages = require('../messages/messages');

module.exports = (req, res, next) => {
    try {
        const [, token] = req.headers.authorization.split(' ');
        jwt.verify(token, process.env.jwt_secret);
        next();
    }
    catch (err) {
        errorTemplate(res, err, messages.auth_failed);
    }
};