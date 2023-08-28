
const pool = require('../db/database')
const multer = require('multer');
const { insertRegisterDetails, checkLoginDetails, insert_auctionquery, userdataquery, currentauctionquery, upcomingauctionquery, historyauctionquery, teamauctionquery, searchPlayersquery, playerdetailsquery, teamjoinsplayersquery,
     topfiveplayersquery, userExistsQuery, updateuserQuery,teamButtonQuery,insertTeamQuery } = require("./query")
const register = async (req, res) => {
    const { email_id, password_user} = req.body;

    try {
        await pool.query(
            insertRegisterDetails,
            [email_id, password_user]
        );
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
}

const login = async (req, res) => {
    const { email_id, password_user } = req.body;
    try {
        const result = await pool.query(
            checkLoginDetails,
            [email_id]
        );

        if (result.rows.length === 0) {
            return res.status(401).json({ error: 'Email does not exist' });

        }
        if (result.rows[0].password_user !== password_user) {
            res.status(401).json({ error: 'wrong password.' });
            return;
        }
        res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while logging in.' });
    }
}
const createAuction = async (req, res) => {
    const { auction_name, auction_date, points_per_team, players_per_team, email_id } = req.body;
    try {
        const result = await pool.query(insert_auctionquery,
            [auction_name, auction_date, points_per_team, players_per_team, email_id]
        );

        res.status(201).json({ message: 'Auction registered successfully!' });
    }
    catch (err) {
        res.status(500).json({ error: 'An error occurred while registering the auction.' });
    }
}


const userdata = async (req, res) => {
    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(userdataquery, [emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows[0])
    }
    catch (err) {
        res.status(500).json({ error: 'An error occured while user details is not found' })
    }
}


const currentauction = async (req, res) => {
    const currentDate = new Date();

    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(currentauctionquery, [emailId, currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}




const upcomingauction = async (req, res) => {
    const currentDate = new Date()
    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(upcomingauctionquery, [emailId, currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}


const historyauction = async (req, res) => {
    const currentDate = new Date()
    console.log(currentDate)
    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(historyauctionquery, [emailId, currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'This user having current and upcoming auction' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}


const teamauction = async (req, res) => {
    try {
        const auctionId = req.params.auction_id
        const emailId = req.params.email_id
        const result = await pool.query(teamauctionquery, [auctionId, emailId])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Team not found' });
            return;
        }
        res.send(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving team data' });
    }
}

const searchPlayers = async (req, res) => {
    try {
        const { email_id,auction_id,players_name } = req.params;
        const result = await pool.query(searchPlayersquery, [email_id,auction_id,players_name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'given details or wrong' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}


const playerdetails = async (req, res) => {
    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(playerdetailsquery, [emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}

const teamjoinsplayers = async (req, res) => {
    try {
        const teamId = req.params.team_id;
        const emailId = req.params.email_id;
        const result = await pool.query(teamjoinsplayersquery, [teamId, emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}



const topfiveplayers = async (req, res) => {
    try {
        const emailId = req.params.email_id;
        console.log(emailId);
        const result = await pool.query(topfiveplayersquery, [emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}

const usereditprofile = async (req, res) => {
    const emailIduser = req.params.email_id;
    const { newPassword,newUsername,newPhoneno} = req.body;
    console.log("bvvfb",req.file);
    // console.log(newPassword)
    // console.log(newUsername)
    // console.log(newPhoneno)
    // console.log(req.file);
    // console.log(req.file.filename);
    if (!req.file) {
        return res.status(400).json({ error: 'No file provided' });
        console.log("file error");
    }
    const image=req.file.filename;
    try {
        // const userExistsQuery = 'SELECT * FROM users WHERE email_id = $1';
        const userExistsResult = await pool.query(userExistsQuery, [emailIduser]);
        if (userExistsResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        await pool.query(updateuserQuery, [newPassword, newUsername,newPhoneno,image, emailIduser]);
        res.json({ message: 'User settings updated successfully' });
    } catch (error) {
        console.error('Error updating user settings:', error);
        res.status(500).json({ error: 'Error updating user settings' });
    }
}

const teamButton= async (req,res)=>{
    const { email_id,auction_id }=req.params;
    try{
        const teamButtonResult=await pool.query(teamButtonQuery,[email_id,auction_id]);
        if(teamButtonResult.rows.length===0){
            return res.status(404).json({error: 'teams not found'});
        }
        res.json(teamButtonResult.rows)
    }
    catch(error){
        res.status(500).json({error:'error occurs while fetching teams in auction'})
    }
}

const playeraddteam= async (req,res)=>{
    try{
        const {email_id,player_id}=req.params
        const {team_id,sold_or_unsold,sold_amount} =req.body;
        const playeraddteamQuery=`update players set team_id=$1,sold_or_unsold=$2,sold_amount=$3 where email_id=$4 and player_id=$5 `
        await pool.query(playeraddteamQuery,[team_id,sold_or_unsold,sold_amount,email_id,player_id])
        res.json({message: 'players add to team successfully'})
    }
    catch(error){
        res.status(500).json({error: 'error occured while adding players to teams'})
    }
}
const auctionpoints=async(req,res)=>{
    const auction_id=req.params.auction_id;
    try{
    const auctionpointsquery=`select points_per_team from auctions join teams using (auction_id) where auction_id=$1`;
    const result = await pool.query(auctionpointsquery, [auction_id])
    if (result.rows.length === 0) {
        res.status(404).json({ error: 'auction points not found' });
        return;
    }
    res.send(result.rows[0]);
}
catch (error) {
    res.status(500).json({ error: 'Error retrieving auction data' });
}
}

const teamdetails= async (req, res)=>{
    const teamImage = req.file.filename;
    const { team_name, team_owner_name, team_owner_email_id,auction_id,email_id,balance_amount } = req.body;
    console.log("Variables:", team_name, team_owner_name, team_owner_email_id, auction_id, email_id, balance_amount);
  try {
    
    await pool.query(insertTeamQuery, [teamImage, team_name, team_owner_name, team_owner_email_id,auction_id,email_id,balance_amount]);
    res.json({ message: 'Team created successfully' });
  } catch (error) {
    console.error('Error creating team:', error);
    res.status(500).json({ error: 'Error creating team' });
  }
} 

const teams=async(req,res)=>{
    const auction_id=req.params.auction_id;
    const email_id=req.params.email_id;
    try{
    const teamquery=`select * from teams where auction_id=$1 and email_id=$2`;
    const result = await pool.query(teamquery, [auction_id,email_id])
    if (result.rows.length === 0) {
        res.status(404).json({ error: 'team details not found' });
        return;
    }
    res.send(result.rows);
}
catch (error) {
    res.status(500).json({ error: 'Error retrieving team data' });
}
}
const players=async(req,res)=>{
    const auction_id=req.params.auction_id;
    const email_id=req.params.email_id;
    try{
        const playersquery=`select p.player_name,p.player_image,p.minimum_bid,p.bit_increase_by,p.age,p.skills,p.team_id,p.email_id,p.sold_or_unsold,p.sold_amount,t.team_name from players p left join teams t using(team_id) where p.email_id=$1 and p.player_id in(select player_id from auctionplayers where auction_id=$2)`;
        const result = await pool.query(playersquery, [email_id,auction_id])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'player details not found' });
            return;
        }
        res.send(result.rows);
    }
    catch (error) {
        res.status(500).json({ error: 'Error retrieving player data' });
    }
}

const updateteambalanceSold= async(req,res)=>{
    const {player_id,team_id}=req.body;
    try {
        const updateteambalanceSoldQuery=`update teams t set balance_amount=t.balance_amount-p.sold_amount from players p where p.player_id=$1 and t.team_id=$2`
        await pool.query(updateteambalanceSoldQuery, [player_id,team_id]);
        res.json({ message: 'Team updated successfully' });
      } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ error: 'Error updating team' });
      }
}

const updateteambalanceUnsold=async(req,res)=>{
    const {player_id}=req.body;
    try {
        const updateteambalanceUnsoldQuery=`update teams t set balance_amount=t.balance_amount+p.sold_amount from players p where p.player_id=$1 and t.team_id =(select team_id from players where player_id=$1)`
        await pool.query(updateteambalanceUnsoldQuery, [player_id]);
        res.json({ message: 'Team updated successfully' });
      } catch (error) {
        console.error('Error updating team:', error);
        res.status(500).json({ error: 'Error updating team' });
      }
}
const teamseditsettings=async(req,res)=>{
    console.log(req.file);
    const teamId=req.params.team_id;
    const { newteamname,newteamownername,newteamemailid} = req.body;
    const team_image = req.file.filename;

    try {
        const teamexistsquery=`select * from teams where team_id=$1`
        const teamExistsResult = await pool.query(teamexistsquery, [teamId]);
        if (teamExistsResult.rows.length === 0) {
            return res.status(404).json({ error: 'Team not found for editing' });
        }
        const updateTeamQuery = 'update teams set  team_image = $1,team_name=$2,team_owner_name=$3,team_owner_email_id=$4 where team_id=$5';
        await pool.query(updateTeamQuery, [team_image, newteamname,newteamownername,newteamemailid,teamId]);
        res.json({ message: 'Team edit updated successfully' });
    } catch (error) {
        console.error('Error updating Team settings:', error);
        res.status(500).json({ error: 'Error updating Team settings' });
    }
}
const teamsdelete=async(req,res)=>{
    const teamId=req.params.team_id;
    try {
        const teamexistsdeletequery=`select * from teams where team_id=$1`
        const teamResult = await pool.query(teamexistsdeletequery, [teamId]);
        if (teamResult.rows.length === 0) {
            return res.status(404).json({ error: 'Team not found for deleting' });
        }
        const DeleteTeamQuery = 'delete from teams where team_id=$1';
        await pool.query(DeleteTeamQuery, [teamId]);
        res.json({ message: 'Team deleted successfully' });
    } catch (error) {
        console.error('Error deleting team settings:', error);
        res.status(500).json({ error: 'Error deleting team settings' });
    }
}
const searchplayer = async (req, res) => {
    try {
        const { email_id,auction_id,players_name } = req.params;
        const playerQuery=`select * from players  p join auctionplayers a using(player_id) where p.email_id=$1 and a.auction_id=$2 and p.player_name ILIKE $3 || '%' limit 1`;
        const result = await pool.query(playerQuery, [email_id,auction_id,players_name]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'given details or wrong' });

        }
        res.json(result.rows)

    } catch (err) {
        res.status(500).json({ error: "An error occured while user details is not found" })
    }
}
module.exports = {
    register,
    login,
    createAuction,
    userdata,
    currentauction,
    upcomingauction,
    historyauction,
    searchPlayers,
    teamauction,
    playerdetails,
    teamjoinsplayers,
    topfiveplayers,
    usereditprofile,
    teamButton,
    playeraddteam,
    teamdetails,
    auctionpoints,
    teams,
    updateteambalanceSold,
    updateteambalanceUnsold,
    teamdetails,
    teamseditsettings,
    teamsdelete,
    players,
    searchplayer
}