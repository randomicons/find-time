import bcrypt = require('bcrypt');
import jwt = require("jsonwebtoken");
import aws from "aws-sdk"
import * as userModel from "../model/user.model"

interface User {
    email: string,
    dateCreated: string,
    password: string
}

const saltRounds = 10
const jwtOptions = {expiresIn: 60 * 60 * 60 * 24}//'1d'
const docClient = new aws.DynamoDB.DocumentClient()

export async function createUser(user: User) {
    return bcrypt.hash(user.password, saltRounds).then(async hash => {
        delete user.password
        await docClient.put(userModel.createUser(user.email, user.password)).promise()

        const payload = {userId: user.email}
        return {
            out: {
                token: jwt.sign(payload, process.env.JWT_SECRET!, jwtOptions),
                maxAge: jwtOptions.expiresIn
            }
        }
    }).catch((err) => {
        return {err}
    })
}

export async function loginUser(userDetails: User): Promise<{ error?: any, out?: { token: string, maxAge: number } }> {
    const user: any = await userModel.get({userId: userDetails.userId})
    if (!user)
        return {error: "Account not found"}
    const match = await bcrypt.compare(userDetails.password, user.password)
    if (match) {
        const payload = {userId: userDetails.userId}
        return {out: {token: jwt.sign(payload, process.env.JWT_SECRET!, jwtOptions), maxAge: jwtOptions.expiresIn}}
    } else {
        return {error: "Password incorrect"}
    }
}
