const pool = require('../db/database')
const {insertRegisterDetails,checkLoginDetails} =require("./query")
const moment = require('moment-timezone');
const register=async (req, res) => {
    const { email_id, password_user,username} = req.body;

    try {
        await pool.query(
            insertRegisterDetails,
            [email_id, password_user,username]
        );
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
}

const login= async (req, res) => {
    const { email_id, password_user} = req.body;

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
const createAuction=async(req,res)=>{

}


const userdata=async(req,res)=>{
    try{
        const emailId=req.params.email_id;
        console.log(emailId);
        const query=`Select * from users where email_id=$1`
        const result=await pool.query(query,[emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows[0])
        
    }
    catch(err){
        res.status(500).json({error: 'An error occured while user details is not found'})
    }
}


const currentauction=async(req,res)=>{
    const currentDate = new Date();

    try{
        const emailId=req.params.email_id;
        console.log(emailId);
        const query=`Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date=$2`
        const result=await pool.query(query,[emailId,currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}




const upcomingauction=async(req,res)=>{
    const currentDate=new Date()


    try{
        const emailId=req.params.email_id;
        console.log(emailId);
        const query=`Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date>$2`
        const result=await pool.query(query,[emailId,currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}




const historyauction=async(req,res)=>{
    // const currenttimestamp = new Date();
    // const currentDate=moment().tz('2023-07-31T18:30:00.000Z','America/New_York')
  
    // // const currentDate=currenttimestamp.toISOString().split('T')[0];
    const currentDate=new Date()
console.log(currentDate)
    try{
        const emailId=req.params.email_id;
        console.log(emailId);
        const query=`Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date<$2`
        const result=await pool.query(query,[emailId,currentDate]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}
const teamauction=async(req,res)=>{
    try{
        const auctionId=req.params.auction_id
        const query='SELECT t.team_image,t.team_id,t.team_name,t.team_owner_name,t.team_owner_email_id,t.auction_id,COUNT(p.player_id) AS player_count FROM teams t JOIN players p ON t.team_id = p.team_id WHERE t.auction_id = $1 GROUP BY t.team_image, t.team_id, t.team_name, t.team_owner_name, t.team_owner_email_id, t.auction_id;'
        const result=await pool.query(query,[auctionId])
        if (result.rows.length === 0) {
            res.status(404).json({ error: 'Team not found' });
            return;
          }
         res.send(result.rows);
    }
    catch(error){
        res.status(500).json({ error: 'Error retrieving team data' });
    }
}

const completeAuction=async(req,res)=>{
    try{
        const {emailid,auctionname}=req.params;

        const query=`Select * from auctions where email_id=$1 and auction_name ILIKE '%' || $2 || '%' `
        const result=await pool.query(query,[emailid,auctionname]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}


const playerdetails=async(req,res)=>{
    try{
        const emailId=req.params.email_id;
        console.log(emailId);
        const query=`Select * from players where email_id=$1 order by minimum_bid desc`
        const result=await pool.query(query,[emailId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}

const teamjoinsplayers=async(req,res)=>{
    try{
        const teamId=req.params.team_id;
        // console.log(emailId);
        const query=`Select * from players join teams using(team_id) where team_id=$1`
        const result=await pool.query(query,[teamId]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Email does not exist' });

        }
        res.json(result.rows)

    }catch(err){
        res.status(500).json({error:"An error occured while user details is not found"})
    }
}


module.exports={
    register,
    login,
    createAuction,
    userdata,
    currentauction,
    upcomingauction,
    historyauction,
    completeAuction,
    teamauction,
    playerdetails,
    teamjoinsplayers
}