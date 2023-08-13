const pool = require('../db/database')
const { insertRegisterDetails, checkLoginDetails, insert_auctionquery, userdataquery, currentauctionquery, upcomingauctionquery, historyauctionquery, teamauctionquery, searchPlayersquery, playerdetailsquery, teamjoinsplayersquery, topfiveplayersquery, userExistsQuery, updateuserQuery,teamButtonQuery } = require("./query")
const register = async (req, res) => {
    const { email_id, password_user, username } = req.body;

    try {
        await pool.query(
            insertRegisterDetails,
            [email_id, password_user, username]
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
    const { new_password, new_username } = req.body;
    try {
        // const userExistsQuery = 'SELECT * FROM users WHERE email_id = $1';
        const userExistsResult = await pool.query(userExistsQuery, [emailIduser]);
        if (userExistsResult.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }
        await pool.query(updateuserQuery, [new_password, new_username, emailIduser]);
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
    playeraddteam

}