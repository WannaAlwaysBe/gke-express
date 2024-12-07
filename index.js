require('dotenv').config();

const express = require('express')

const PORT = process.env.PORT || 8080;

const app = express()

app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello, world!',
    });
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
