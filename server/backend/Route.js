const express = require('express');
const router = express.Router();
const multer=require('multer');
const path = require('path');
const { register, login, createAuction, userdata, currentauction, upcomingauction, historyauction, searchPlayers, teamauction, playerdetails, teamjoinsplayers, topfiveplayers, usereditprofile,teamButton,playeraddteam,teamdetails,auctionpoints ,teams,updateteambalanceSold,updateteambalanceUnsold,teamseditsettings,teamsdelete,players,searchplayer} = require("./Controller")
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
// const usereditroute = router.put("/editdetails/:email_id", usereditprofile)
const teambuttonRoute=router.get("/button/:email_id/:auction_id",teamButton)
const playeraddteamRoute=router.put("/joining/:email_id/:player_id",playeraddteam)
const updateteambalanceSoldRoute=router.put("/updatebalance",updateteambalanceSold)
const updateteambalanceUnsoldRoute=router.put("/addamounttoteam",updateteambalanceUnsold)
const storage = multer.diskStorage({
    destination: './uploads/', 
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '_' + Date.now() +path.extname(file.originalname));
    },
    
  }); 
const upload = multer({ storage });
const teamdetailsroute=router.post("/teamslist",upload.single('team_image'),teamdetails)
// const storage1=multer.diskStorage({
//         destination: (req,file,cb)=>{
//             cb(null, 'Images')
//         },
//         filename: (req,file,cb)=>{
//             cb(null,Date.now()+file.originalname);
//         },
//     })
// const upload1 = multer({ storage1 });
const usereditroute = router.put("/editdetails/:email_id",upload.single('Image'), usereditprofile)
const auctionpointsroute=router.get("/pointsperteam/:auction_id",auctionpoints)
const teamroute=router.get("/view/:auction_id/:email_id",teams)
const playerroute=router.get("/playersview/:auction_id/:email_id",players)
const searchplayersroute = router.get("/searchplayers/:email_id/:auction_id/:players_name",searchplayer)
const teamseditroute=router.put("/settings/:team_id",upload.single('team_image'),teamseditsettings)
const teamsdeleteroute=router.delete('/settings/:team_id',teamsdelete)
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
    teamroute,
    playerroute,
    searchplayersroute,
    updateteambalanceSoldRoute,
    updateteambalanceUnsoldRoute,
    teamseditroute,
    teamsdeleteroute
}