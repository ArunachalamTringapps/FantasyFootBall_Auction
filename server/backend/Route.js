const express = require('express');
const router = express.Router();
const {register,login,createAuction,userdata,currentauction,upcomingauction,historyauction,searchPlayers,teamauction,playerdetails,teamjoinsplayers,topfiveplayers}= require("./Controller")

const registerroute=router.post('/',register );
const loginroute=router.post('/user', login);
const createauctionroute=router.post("/createauction",createAuction)
const userdataroute=router.get("/userdetails/:email_id",userdata)
const currentauctionroute=router.get("/currentauction/:email_id",currentauction)
const upcomingauctionroute=router.get("/upcomingauction/:email_id",upcomingauction)
const historyauctionroute=router.get("/historyauction/:email_id",historyauction)
const teamauctionroute=router.get("/historyauction/auction/:auction_id",teamauction)
const searchPlayersRoute=router.get("/searchplayers/:emailid/:players_name",searchPlayers)
const playerdetailsRoute=router.get("/players/:email_id",playerdetails)
const teamsJoinsPlayersRoute=router.get("/teamjoinplayers/:team_id",teamjoinsplayers)
const topfiveplayersRoute=router.get("/limitfive/:email_id",topfiveplayers)
module.exports = {
    registerroute,
    loginroute,
    createauctionroute,
    userdataroute,
    currentauctionroute,
    upcomingauctionroute,
    historyauctionroute,
    teamauctionroute,
    searchPlayersRoute,
    playerdetailsRoute,
    teamsJoinsPlayersRoute,
    topfiveplayersRoute
}