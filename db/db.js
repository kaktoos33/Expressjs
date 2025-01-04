require('dotenv').config();
const mongoose = require("mongoose");
const User = require("../models/userModel");

// async function connect() {
const connect = async () => {
    mongoose.set('strictQuery', true);
    await mongoose.connect(process.env.mongo).then(
        () => {
            console.log('/** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ ');
        },
        err => { console.log('/** handle initial connection error */'); }
    ).catch((err) => {
        console.log(err);
    });
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
};
const disconnect = async () => {
    await mongoose.connection.close().then(
        () => {
            console.log('/** The `mongoose.disconnect()` promise resolves to mongoose instance. */ ');
        },
        err => { console.log('/** handle disconnect connection error */'); }
    );
};
const findUser = async (obj) => {
    return User.findOne(obj);
};
const saveUser = async (newUser) => {
    return await newUser.save();

};
module.exports = { connect, disconnect, findUser, saveUser };