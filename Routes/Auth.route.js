const express = require('express');
const router = express.Router();
const httperrors = require('http-errors');
const User = require("../Models/User.model");

router.post('/register', async (req, res, next) => {
    console.log(req.body);
    const {
        email,
        password
    } = req.body;
    try {
        if (!email || !password) throw httperrors.BadRequest();
        const doesExist = await User.find();
        console.log(res.json(todos));
        if(!doesExist) throw httperrors.Conflict(`${email} is already been registred`);
        const user = new User({email , password});
        const userSeved = user.seve();
    } catch (error) {
        next(error)
    }
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