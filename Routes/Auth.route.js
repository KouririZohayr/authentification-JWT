const express = require('express');
const router = express.Router();

router.post('/register', async (req, res) => {
    res.send('register route');
    console.log(req.body)
});

router.post('/login', async (req, res) => {
    res.send('login route');
});

router.post('/refresh-token', async (req, res) => {
    res.send('refresh-token route');
});

router.delete('/logout', async (req, res) => {
    res.send('logout route');
});

module.exports = router;
