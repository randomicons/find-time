import {Schema, SchemaOptions} from 'dynamoose'

export const userSchema = (options?: SchemaOptions) => {
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
    }, options)
}
