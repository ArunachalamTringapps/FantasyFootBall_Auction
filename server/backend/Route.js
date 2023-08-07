const express = require('express');
const router = express.Router();
const {register,login,createAuction}= require("./Controller")

const registerroute=router.post('/',register );
const loginroute=router.post('/user', login);
const auction=router.post("/auction",createAuction)
module.exports = {
    registerroute,
    loginroute,
    auction
}