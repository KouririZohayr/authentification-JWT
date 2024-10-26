const express = require('express');
const router = express.Router();
const httperrors = require('http-errors');
const User = require("../Models/User.model");
const {signAcesseToken} = require("../Helpers/jwt_token")
const validator = require('validator');


router.post('/register', async (req, res, next) => {

    const { email,password } = req.body;

    try {
        console.log(req.body);
        const {  email,password} = req.body;
        if (!validator.isEmail(email)  || !password) throw httperrors.BadRequest();
        const doesExist = await User.findOne({email});
        if (doesExist) throw httperrors.Conflict(`${email} is already registered`);
        const user = new User({ email, password});
        const sevedUser = await user.save();
        const accesseToken = await signAcesseToken(sevedUser.id)
        res.send(accesseToken)
        res.status(201).send({
            message: 'User registered successfully.'
        });
    } catch (error) {
        next(error);
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