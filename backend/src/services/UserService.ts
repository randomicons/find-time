import bcrypt = require('bcrypt');
import jwt = require("jsonwebtoken");
import * as userModel from "../model/user.model"
import {docClient} from "../constants";
import {User} from "../types/"


const saltRounds = 10
const jwtOptions = {expiresIn: 60 * 60 * 60 * 24}//'1d'

export async function createUser(user: User) {
    return bcrypt.hash(user.password, saltRounds).then(async hash => {
        delete user.password
        await docClient.put(userModel.createUser(user.email, hash)).promise()

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

export async function loginUser(userDetails: User): Promise<{ err?: any, out?: { token: string, maxAge: number } }> {
    const user = await docClient.get(userModel.getUser(userDetails.email)).promise()
    if (!user.Item)
        return {err: "Account not found"}
    const match = await bcrypt.compare(userDetails.password, user.Item.password)
    if (match) {
        const payload = {userId: userDetails.email}
        return {out: {token: jwt.sign(payload, process.env.JWT_SECRET!, jwtOptions), maxAge: jwtOptions.expiresIn}}
    } else {
        return {err: "Password incorrect"}
    }
}
