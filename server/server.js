const express = require('express');
const cors = require('cors');
const pool=require('./db/database')
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.post('/register', async (req, res) => {
    const { email_id, password_user } = req.body;
  
    try {
      await pool.query(
        'INSERT INTO users (email_id, password_user) VALUES ($1, $2)',
        [email_id, password_user]
      );
      res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while registering the user.' });
    }
  });
  
  app.post('/login', async (req, res) => {
    const { email_id, password_user } = req.body;
  
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email_id = $1',
        [email_id]
      );
  
      if (result.rows.length === 0){
       return res.status(401).json({ error: 'Email does not exist' });
        
      }
      if( result.rows[0].password_user !== password_user) {
        res.status(401).json({ error: 'wrong password.' });
        return;
      }   
      res.status(200).json({ message: 'Login successful!' });
    } catch (err) {
      res.status(500).json({ error: 'An error occurred while logging in.' });
    }
  });
  
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
  