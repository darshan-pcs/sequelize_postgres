const jwt = require("jsonwebtoken")
// const model = require("../models/registers")

const auth = async (req, res, next) => {
    try {
        // console.log("auth token...",req.headers.token);
        const token = req.headers.token
        console.log("token...", token);
        const verifyUser = await jwt.verify(token, process.env.SECRET_KEY)
        console.log("verifyUser...", verifyUser);
        req.body.email = verifyUser.email

        next();
    } catch (error) {
        res.send({status:false,statusCode:403, msg: "invalid URL", data: error})
        console.log("error form auth side...", error);
    }
}
module.exports = auth;
