import jwt = require('express-jwt');
import {Request} from 'express'
import {config} from 'dotenv'

config()
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

export const checkAuth = jwt({
    secret: process.env.JWT_SECRET!, // The _secret_ to sign the JWTs
    getToken: getTokenFromHeader, // How to extract the JWT from the request
});

