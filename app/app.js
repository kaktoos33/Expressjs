const express = require('express');
const app = express();
const cors = require('cors');
const userRouter = require("../router/userRouter");
const bookRouter = require("../router/bookRouter");
const authorRouter = require("../router/authorRouter");
const { connect } = require('../db/db');
const swaggerUi = require('swagger-ui-express');
const document = require('../config/swaggerOptions.json');


// use middleware to form our contract for incoming json payloads
app.use(express.json());

// use middleware for our encoding 
app.use(express.urlencoded({ extended: true }));

// handle cors policy manually
/* app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Acept, Authorization,Origin,X-Requested-With'
    );

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','POST,PUT,GET,DELETE,PATCH');
    }
    next();
  
}); */

// use middleware to handle cors policy
app.use(cors());

/* app.use((req,res,next)=>{
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
});
app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message,
            status:error.status
        },
    });
});
 */

// health point or actuator
app.get("/", (req, res, next) => {
    res.status(200).json({ Message: 'Server is up' });
});

// routers
app.use('/users', userRouter);
connect();
app.use('/books', bookRouter);
app.use('/authors', authorRouter);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(document));
module.exports = app;