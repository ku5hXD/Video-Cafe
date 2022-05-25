const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const Auth = async (req, res, next) => {
    try {
        // const token = req.header("Authorization").replace("Bearer ", ""); // getting token from header
        const token = req.cookies.token;
        const decoded = jwt.verify(token, "thisismyjwt"); // check if token is valid or not
        // console.log(decoded);

        // find user by id and token
        const user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token,
        });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user;

        next(); //used to run router from here
    } catch (e) {
        res.status(401).send({ error: " please Authenticate" });
    }
};

module.exports = Auth;