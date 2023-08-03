const express = require('express');
const router = express.Router();
const pool = require('../db/database')
const register = router.post('/register', async (req, res) => {
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
const login = router.post('/login', async (req, res) => {
    const { email_id, password_user } = req.body;

    try {
        const result = await pool.query(
            'SELECT * FROM users WHERE email_id = $1',
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
});
module.exports = { register, login }