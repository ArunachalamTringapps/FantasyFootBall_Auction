const insertRegisterDetails='INSERT INTO users (email_id, password_user,username) VALUES ($1, $2,$3)';

const checkLoginDetails='SELECT * FROM users WHERE email_id = $1';

module.exports={
    insertRegisterDetails,
    checkLoginDetails
}