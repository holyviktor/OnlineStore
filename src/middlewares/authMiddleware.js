const jwt = require('jsonwebtoken');
require('dotenv').config();
const CustomError = require('../handlers/customError');

function authorize(roles = []) {
    if (!Array.isArray(roles)) roles = [roles];

    return (req, res, next) => {
        const token =
            req.headers['Authorization'] || req.headers['authorization'];

        if (!token) throw new CustomError(401, 'Access denied');
        if (token.indexOf('Bearer') !== 0)
            throw new CustomError(401, 'Error: Token format invalid');

        const tokenString = token.split(' ')[1];
        jwt.verify(tokenString, process.env.SECRET_KEY, (err, decodedToken) => {
            if (err) {
                throw new CustomError(401, 'Error: Broken Or Expired Token');
            }

            if (!decodedToken.role)
                throw new CustomError(402, 'Error: Role missing');
            const userRole = decodedToken.role;
            if (roles.indexOf(userRole) === -1)
                throw new CustomError(403, 'Error: User not authorized');

            req.user = decodedToken;
            next();
        });
    };
}

module.exports = { authorize };
