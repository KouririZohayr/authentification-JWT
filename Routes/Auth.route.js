const express = require('express');
const router = express.Router();
const httperrors = require('http-errors');
const User = require("../Models/User.model");
const {signAccessToken} = require("../Helpers/jwt_token")
const {authSchema} = require('../Helpers/validation_schema');


// Define a POST route for '/register' to handle user registration
router.post('/register', async (req, res, next) => {

    try {
        console.log(req.body); // Log the request body to inspect incoming data

        // Validate request data against the authSchema
        const { error } = authSchema.validate(req.body);
        
        // If validation fails, throw a 400 Bad Request error with the validation message
        if (error) throw httperrors.BadRequest(error.message);
        
        // Destructure email and password from the validated request body
        const { email, password } = req.body;

        // Check if a user with this email already exists in the database
        const doesExist = await User.findOne({ email });
        
        // If user exists, throw a 409 Conflict error
        if (doesExist) throw httperrors.Conflict(`${email} is already registered`);

        // Create a new User instance with the provided email and password
        const user = new User({ email, password });
        
        // Save the new user to the database
        const savedUser = await user.save();

        // Generate an access token for the newly registered user
        const accessToken = await signAccessToken(savedUser.id);
        
        // Respond with the generated access token
        res.send(accessToken);
        
        // Additionally, send a success response with a 201 status code
        res.status(201).send({
            message: 'User registered successfully.'
        });

    } catch (error) {
        // Pass any caught errors to the error handler middleware
        next(error);
    }
});


// Define a POST route for '/login' to handle user login
router.post('/login', async (req, res, next) => {
    try {
        // Validate incoming request data (req.body) against the authSchema
        const { error } = authSchema.validate(req.body);
        
        // If validation fails, throw a 400 Bad Request error with a generic message
        if (error) throw httperrors.BadRequest("Invalid email or password");

        // Destructure email and password from the validated request body
        const { email, password } = req.body;

        // Attempt to find a user with the provided email in the database
        const user = await User.findOne({ email });
        
        // If user is not found, throw a 400 Bad Request error with a custom message
        if (!user) throw httperrors.BadRequest("User not registered");

        // Verify the provided password with the stored hashed password using the `isValidPassword` method
        const isPasswordValid = await user.isValidPassword(password);
        
        // If password is incorrect, throw a 401 Unauthorized error with a custom message
        if (!isPasswordValid) throw httperrors.Unauthorized("Email or password error");

        // Generate an access token for the authenticated user
        const accessToken = await signAccessToken(user.id);
        
        // Send the access token as the response
        res.send(accessToken);

    } catch (error) {
        // Pass any caught errors to the error handler middleware
        next(error);
    }
});

router.post('/refresh-token', async (req, res) => {
    res.send('refresh-token route');
});

router.delete('/logout', async (req, res) => {
    res.send('logout route');
});

module.exports = router;