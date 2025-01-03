// require('dotenv').config();
// const mongoose = require("mongoose");
// const User = require("../models/usermodel");
// const usermodel = require('../models/usermodel');

// async function connect() {
const connect = async () => {
    console.log('MongoDB mocked connection');
};
const disconnect = async () => {
    console.log('Mocked Disconnection');
};
const findUser = async (obj) => {
    return Promise.resolve({
        firstName: 'Eric2',
        lastName: 'Clarke',
        address: '123 main St.',
        city: 'Manchester',
        state: 'Manchest',
        email: 'Eric@gmail.com',
        zipCode: '456789',
    });
};
const saveUser = async (newUser) => {
    return Promise.resolve({
        firstName: 'Eric2',
        lastName: 'Clarke',
        address: '123 main St.',
        city: 'Manchester',
        state: 'Manchest',
        email: 'Eric@gmail.com',
        zipCode: '456789',
    });
};
module.exports = { connect, disconnect, findUser, saveUser };