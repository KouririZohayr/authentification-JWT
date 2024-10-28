const JWT = require("jsonwebtoken");
const createError = require('http-errors');

module.exports = {
    signAccessToken : (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {/*   iss: "website"    */};  // removed `aud` from here
            const secret =  process.env.ACCESS_TOKEN_SECRET ;
            const options = {
                expiresIn: '1h',
                audience: userId  // define audience here
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(createError.InternalServerError());
                }
                resolve(token);
                console.log(token);
            });
        });
    }
};
