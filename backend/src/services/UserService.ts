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

export async function loginUser(userDetails: User): Promise<{ error?: any, token?: string }> {
    let user: any
    try {
        const user: any = await userModel.get({userId: userDetails.userId})
        console.log(user)
    } catch (e) {
        return {error: "Account not found"}
    }
    const match = await bcrypt.compare(userDetails.password, user.password)
    if (match) {
        const payload = {userId: userDetails.userId}
        const options = {expiresIn: '1d'}
        return {token: jwt.sign(payload, process.env.JWT_SECRET as string, options)}
    } else {
        return {error: "Password incorrect"}
    }
}
