require('dotenv').config();
const mongoose = require("mongoose");

async function connect() {
    await mongoose.connect(process.env.mongo).then(
        () => {
            console.log('/** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ ');
        },
        err => { console.log('/** handle initial connection error */'); }
    );
    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = { connect };