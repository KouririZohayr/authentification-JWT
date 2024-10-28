const express = require('express');
const router = express.Router();
const httperrors = require('http-errors');
const User = require("../Models/User.model");
const {signAcesseToken} = require("../Helpers/jwt_token")
const authSchema = require('../Helpers/validation_schema');


router.post('/register', async (req, res, next) => {


    try {
        console.log(req.body);
        const {  email,password} = req.body;
        const validate = await authSchema.validateAsync(req.body)
        if (!email  || !password) throw httperrors.BadRequest();
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

router.post('/login', async (req, res , next) => {
   
    try {
        const {email , password} = req.body;
        const validate = await authSchema(req.body)
        if(!email || !password ) next(httperrors.BadRequest("email or password is requierd"));
        const isExiste = await User.findOne({email});
        if(isExiste){
            res.send(isExiste)
        }

    } catch (error) {
        next(error)
    }
});

router.post('/refresh-token', async (req, res) => {
    res.send('refresh-token route');
});

router.delete('/logout', async (req, res) => {
    res.send('logout route');
});

module.exports = router;