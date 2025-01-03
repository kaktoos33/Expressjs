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