const jwt = require('jsonwebtoken');
const {secretKey, tokenExpiryTime} = require('../constants/usersConstants');
const CustomError = require("../handlers/customError");


function authorize(roles = []) {
    if (!Array.isArray(roles)) roles = [roles];

    return (req, res, next) => {
        const token = req.headers["Authorization"] || req.headers["authorization"];

        if (!token) throw new CustomError(401,"Access denied");
        if (token.indexOf("Bearer") !== 0) throw new CustomError(401, "Error: Token format invalid");

        const tokenString = token.split(" ")[1];
        jwt.verify(tokenString, secretKey, (err, decodedToken) => {
            if (err) {
                throw new CustomError(401, "Error: Broken Or Expired Token");
            }

            if (!decodedToken.role) throw new CustomError(402, "Error: Role missing");
            const userRole = decodedToken.role;
            if (roles.indexOf(userRole) === -1)
                throw new CustomError(403, "Error: User not authorized");

            req.user = decodedToken;
            next();
        });
    }
}

function issueToken (user) {
    return jwt.sign({...user, iss: "Node-Auth"}, secretKey, {
        expiresIn: tokenExpiryTime,
    });
}

let Roles = {
    User: ["user"],
    Admin: ["admin"],
    All: ["user", "admin"],
};

module.exports = {authorize, issueToken, Roles};