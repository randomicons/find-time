import bcrypt = require('bcrypt');
import jwt = require("jsonwebtoken");
import {userModel} from '../constants';


type User = {
    userId: String, dateCreated: String, password: String
}

const saltRounds = 10

export async function createUser(user: User) {
    return await bcrypt.hash(user.password, saltRounds).then(async hash => {
        delete user.password
        await new userModel({...user, password: hash}).save({condition: "attribute_not_exists(userId)"}, (err) => {
            if (err) {
                return err
            }
        })
    })
}

export async function loginUser(userDetails: User): Promise<{ error?: any, out?: { token: string, expire: number } }> {
    const user: any = await userModel.get({userId: userDetails.userId})
    if (!user)
        return {error: "Account not found"}
    const match = await bcrypt.compare(userDetails.password, user.password)
    if (match) {
        const payload = {userId: userDetails.userId}
        const options = {expiresIn: 60 * 60 * 60 * 24}//'1d'
        return {out: {token: jwt.sign(payload, process.env.JWT_SECRET as string, options), expire: options.expiresIn}}
    } else {
        return {error: "Password incorrect"}
    }
}
