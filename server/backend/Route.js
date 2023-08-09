const express = require('express');
const router = express.Router();
const {register,login,createAuction,userdata,currentauction,upcomingauction,historyauction,completeAuction,teamauction,playerdetails,teamjoinsplayers}= require("./Controller")

const registerroute=router.post('/',register );
const loginroute=router.post('/user', login);
const auctionroute=router.post("/auction",createAuction)
const userdataroute=router.get("/userdetails/:email_id",userdata)
const currentauctionroute=router.get("/currentauction/:email_id",currentauction)
const upcomingauctionroute=router.get("/upcomingauction/:email_id",upcomingauction)
const historyauctionroute=router.get("/historyauction/:email_id",historyauction)
const teamauctionroute=router.get("/historyauction/auction/:auction_id",teamauction)
const completeAuctionRoute=router.get("/completeauction/:emailid/:auctionname",completeAuction)
const playerdetailsRoute=router.get("/players/:email_id",playerdetails)
const teamsJoinsPlayersRoute=router.get("/teamjoinplayers/:team_id",teamjoinsplayers)
module.exports = {
    registerroute,
    loginroute,
    auctionroute,
    userdataroute,
    currentauctionroute,
    upcomingauctionroute,
    historyauctionroute,
    teamauctionroute,
    completeAuctionRoute,
    playerdetailsRoute,
    teamsJoinsPlayersRoute
}