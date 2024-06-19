const express = require('express');
const app = express();
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use((req,res,next)=>{
    res.header('Access-Control-Allow-Origin','*');
    res.header(
        'Access-Control-Allow-Headers',
        'Content-Type,Acept, Authorization,Origin,X-Requested-With'
    );

    if(req.method === "OPTIONS"){
        res.header('Access-Control-Allow-Methods','POST,PUT,GET,DELETE,PATCH');
    }
    next();
    // const error = new Error("Not Found");
    // error.status = 404;
    // next(error);

});

app.use(cors());

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message,
            status:error.status
        },
    });
});

app.get("/",(req,res,next)=>{
    res.status(200).json({Message:'Server is up'});
});
module.exports= app;