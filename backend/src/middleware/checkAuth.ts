import jwt from 'express-jwt';
import {Request} from 'express'


const getTokenFromHeader = (req: Request) => {
    return req.cookies.token
    // if (
    //     (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Token') ||
    //     (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer')
    // ) {
    //     return req.headers.authorization.split(' ')[1];
    // }
    // return null;
};

export const isAuth = jwt({
    secret: process.env.jwtSecret as string, // The _secret_ to sign the JWTs
    userProperty: 'token', // Use req.token to store the JWT
    getToken: getTokenFromHeader, // How to extract the JWT from the request
});

