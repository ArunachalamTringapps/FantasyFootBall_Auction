const express = require('express');
const router = express.Router();
const {register,login,createAuction,currentauction,upcomingauction,historyauction,completeAuction,teamauction,playerinformation}= require("./Controller")

const registerroute=router.post('/',register );
const loginroute=router.post('/user', login);
const auctionroute=router.post("/auction",createAuction)
const currentauctionroute=router.get("/currentauction/:email_id",currentauction)
const upcomingauctionroute=router.get("/upcomingauction/:email_id",upcomingauction)
const historyauctionroute=router.get("/historyauction/:email_id",historyauction)
const teamauctionroute=router.get("/historyauction/auction/:auction_id",teamauction)
const completeAuctionRoute=router.get("/completeauction/:emailid/:auctionname",completeAuction)
const playerdetails=router.get("/player/:email_id",playerinformation)
module.exports = {
    registerroute,
    loginroute,
    auctionroute,
    currentauctionroute,
    upcomingauctionroute,
    historyauctionroute,
    teamauctionroute,
    completeAuctionRoute,
    playerdetails
}