require('dotenv').config();
const express = require('express');
const mysql = require('mysql2/promise');

const PORT = process.env.PORT || 8080;

const app = express();

const pool = mysql.createPool({
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
});

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello, world!',
    });
});

app.get('/connection', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        await connection.ping();
        connection.release();

        res.status(200).json({
            status: 'success',
            message: 'Database connection is established.',
        });
    } catch (err) {
        console.error(`[server] Error connecting to the database: ${err.message}`);
        res.status(500).json({
            status: 'error',
            message: 'Unable to connect to the database.',
            error: err.message,
        });
    }
});

(async () => {
    try {
        app.listen(PORT, () => {
            console.log(`[server] Server started on PORT ${PORT}`);
        });
    } catch (e) {
        console.error(e);
    }
})();
