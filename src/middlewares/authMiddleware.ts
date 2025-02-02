import jwt = require('jsonwebtoken');
import { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../handlers/customError';
import dotenv from 'dotenv';
import { RequestHandler } from 'express-serve-static-core';

dotenv.config();

function authorize(roles: string[] = []): RequestHandler {
    if (!Array.isArray(roles)) roles = [roles];

    return (req: Request, res: Response, next: NextFunction) => {
        let token: string | string[] | undefined =
            req.headers['Authorization'] || req.headers['authorization'];

        if (Array.isArray(token)) {
            token = token[0];
        }

        if (!token) throw new CustomError(401, 'Access denied');
        if (token.indexOf('Bearer') !== 0)
            throw new CustomError(401, 'Error: Token format invalid');

        const tokenString = token.split(' ')[1];
        jwt.verify(
            tokenString,
            process.env.SECRET_KEY!,
            (err, decodedToken) => {
                if (err) {
                    throw new CustomError(
                        401,
                        'Error: Broken Or Expired Token',
                    );
                }

                if (isPayload(decodedToken!)) {
                    if (!decodedToken!.role)
                        throw new CustomError(402, 'Error: Role missing');
                    const userRole = decodedToken.role;
                    if (roles.indexOf(userRole) === -1)
                        throw new CustomError(
                            403,
                            'Error: User not authorized',
                        );

                    req.user = {
                        login: decodedToken['login'],
                        role: decodedToken['role'],
                    };
                }
                next();
            },
        );
    };
}

function isPayload(token: string | JwtPayload): token is JwtPayload {
    return typeof token !== 'string';
}

export { authorize };
