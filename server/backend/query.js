const insertRegisterDetails = 'INSERT INTO users (email_id, password_user,username) VALUES ($1, $2,$3)';
const checkLoginDetails = 'SELECT * FROM users WHERE email_id = $1';
const insert_auctionquery = `insert into auctions (auction_name,auction_date,points_per_team,players_per_team,email_id) VALUES ($1, $2,$3,$4,$5)`
const userdataquery = `Select * from users where email_id=$1`
const currentauctionquery = `Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date=$2`
const upcomingauctionquery = `Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date>$2`
const historyauctionquery = `Select auction_id,auction_name,auction_date::text,points_per_team,players_per_team,email_id from auctions where email_id=$1 and auction_date<$2`
const teamauctionquery = 'SELECT t.team_image,t.team_id,t.team_name,t.team_owner_name,t.team_owner_email_id,t.auction_id,t.email_id,COUNT(p.player_id) AS player_count FROM teams t JOIN players p ON t.team_id = p.team_id WHERE t.auction_id = $1 and p.email_id=$2 GROUP BY t.team_image,t.team_id,t.team_name,t.team_owner_name,t.team_owner_email_id,t.auction_id,t.email_id;'
// const searchPlayersquery = `Select * from players where email_id=$1 and player_name ILIKE $2 || '%' limit 1 `
const searchPlayersquery=`select * from players  p join auctionplayers a using(player_id) where p.email_id=$1 and a.auction_id=$2 and p.player_name ILIKE $3 || '%' limit 1`
const playerdetailsquery = `Select * from players p join teams t on p.team_id=t.team_id where p.email_id=$1 order by p.minimum_bid desc `
const teamjoinsplayersquery = `Select * from players p join teams t on t.team_id=p.team_id where t.team_id=$1 and p.email_id=$2 `
const topfiveplayersquery = `Select * from players where email_id=$1 order by minimum_bid desc limit 5`
const userExistsQuery = 'SELECT * FROM users WHERE email_id = $1';
const updateuserQuery = 'update users set  password_user = $1,username=$2,phone_no=$3,user_image=$4 where email_id = $5;';
const teamButtonQuery=`select team_name,team_id,balance_amount from teams where email_id=$1 and auction_id=$2`
const insertTeamQuery = 'INSERT INTO teams (team_image, team_name, team_owner_name, team_owner_email_id,auction_id,email_id,balance_amount) VALUES ($1, $2, $3, $4,$5,$6,$7)';
module.exports = {
    insertRegisterDetails,
    checkLoginDetails,
    insert_auctionquery,
    userdataquery,
    currentauctionquery,
    upcomingauctionquery,
    historyauctionquery,
    teamauctionquery,
    searchPlayersquery,
    playerdetailsquery,
    teamjoinsplayersquery,
    topfiveplayersquery,
    userExistsQuery,
    updateuserQuery,
    teamButtonQuery,
    insertTeamQuery
}