import {Schema} from 'dynamoose'

export const userSchema = () => {
    return new Schema({
        userId: {
            type: String,
            trim: true,
            hashKey: true
        },
        dateCreated: {
            type: String,
            trim: true,
            required: true
        },
        password: {
            type: String,
            required: true
        }
    })
}
