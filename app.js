const express = require("express");
const morgan = require("morgan");
const createHttpError = require("http-errors");
const AuthRoute = require("./Routes/Auth.route"); // Your router for auth routes
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get("/", (req, res) => {
    res.send("test");
});

// Use the Auth router with /Auth prefix
app.use("/Auth", AuthRoute);

app.use((req, res, next) => {
    next(createHttpError.NotFound());
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
        error: {
            status: err.status || 500,
            message: err.message,
        },
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});