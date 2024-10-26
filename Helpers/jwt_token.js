const JWT = require("jsonwebtoken");
const creatError = require('http-errors');

module.exports = {
    signAcesseToken : (userId)=>{
        return new Promise((resolve, reject)=>{
            const payload = {
                name : 'zohayr'
            }
            const secret = 'some super secret'
            const options = {

            }
            JWT.sign(payload , secret , options , (err , token)=>{
                if (err) reject(err)
                    resolve(token)
                console.log(token)
            })
        })
    }
}