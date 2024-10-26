const JWT = require("jsonwebtoken");
const createError = require('http-errors');

module.exports = {
    signAcesseToken : (userId) => {
        return new Promise((resolve, reject) => {
            const payload = {};  // removed `aud` from here
            const secret = 'some super secret';
            const options = {
                expiresIn: '1h',
                audience: userId  // define audience here
            };
            JWT.sign(payload, secret, options, (err, token) => {
                if (err) {
                    reject(err);
                }
                resolve(token);
                console.log(token);
            });
        });
    }
};
