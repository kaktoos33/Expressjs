# ExpressJS - BackEnd

# Initilizing commands

```shell
node -v
v18.17.0

npm -v
9.6.7

npm init -y

npm install --save-Dev = npm i -D
npm i express dotenv
npm i -D jest nodemon
```

# .gitignore

```shell
node_modules
package-lock.json
```

# To Run The Backend

```shell
npm i
nm start
```

# To Test The Backend

```shell
npm i
nm test
```

# git

```shell
git branch -M master
git remote add origin https://github.com/kaktoos33/Expressjs
git push -u origin master
```

# Server/Listener/Router Design Pattern

## Server -> server.js using(http,dotenv)

## Request Listener - > app.js using(Express)

## Router -> router.js using(Express)

# server.js

```shell
const http = require('http');
const app = require('./app/app');

require('dotenv').config(); // loads .env file contents into process.env

http.createServer(app).listen(process.env.port, ()=>{
    console.log(`server is running on port: ${process.env.port}`);
});

```

# app.js

```shell
const express = require('express');
const app = express();
const cors = require('cors');

// use middleware to form our contract for incoming json payloads
app.use(express.json());

// use middleware for our encoding
app.use(express.urlencoded({extended: true}));

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
    // const error = new Error("Not Found");
    // error.status = 404;
    // next(error);

}); */

// use middleware to handle cors policy
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
```

# cors handling

```shell
npm i cors

const cors = require('cors');
app.use(cors());
```

# router.js

```shell
const express = require("express");

const router = express.Router();

router.get("/",(req,res,next)=>{
    res.status(200).json({
        message:'Server is up',
        metadata: {
            hostname: req.hostname,
            method: req.method
        }

    });
});
router.get("/:id",(req,res,next)=>{
    res.status(200).json({
    message: "successfull Get",
    metadata: {
        id: req.params.id,
        hostname: req.hostname,
        method: req.method,
    }
    });
});

module.exports = router;

```
