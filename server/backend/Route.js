const express = require('express');
const multer = require('multer');
const router = express.Router();
const path = require('path');
const { register, login, createAuction, userdata, currentauction, upcomingauction, historyauction, searchPlayers, teamauction, playerdetails, teamjoinsplayers, topfiveplayers, usereditprofile,teamButton,playeraddteam,teamdetails,auctionpoints ,teams} = require("./Controller")
const registerroute = router.post('/', register);
const loginroute = router.post('/user', login);
const createauctionroute = router.post("/createauction", createAuction)
const userdataroute = router.get("/userdetails/:email_id", userdata)
const currentauctionroute = router.get("/currentauction/:email_id", currentauction)
const upcomingauctionroute = router.get("/upcomingauction/:email_id", upcomingauction)
const historyauctionroute = router.get("/historyauction/:email_id", historyauction)
const teamauctionroute = router.get("/historyauction/auction/:auction_id/:email_id", teamauction)
const searchPlayersRoute = router.get("/searchplayers/:email_id/:auction_id/:players_name", searchPlayers)
const playerdetailsRoute = router.get("/players/:email_id", playerdetails)
const teamsJoinsPlayersRoute = router.get("/teamjoinplayers/:team_id/:email_id", teamjoinsplayers)
const topfiveplayersRoute = router.get("/limitfive/:email_id", topfiveplayers)
const usereditroute = router.put("/editdetails/:email_id", usereditprofile)
const teambuttonRoute=router.get("/button/:email_id/:auction_id",teamButton)
const playeraddteamRoute=router.put("/joining/:email_id/:player_id",playeraddteam)
const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: (req, file, cb) => {
      cb(null, file.fieldname + path.extname(file.originalname));
    },
  }); 
  const upload = multer({ storage });
const teamdetailsroute=router.post("/teamslist",upload.single('team_image'),teamdetails)
const auctionpointsroute=router.get("/pointsperteam/:auction_id",auctionpoints)
const teamroute=router.get("/view/:auction_id/:email_id",teams)
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
    topfiveplayersRoute,
    usereditroute,
    teambuttonRoute,
    playeraddteamRoute,
    teamdetailsroute,
    auctionpointsroute,
    teamroute
}