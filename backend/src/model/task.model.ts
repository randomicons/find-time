import {Schema, SchemaOptions} from 'dynamoose'

export function taskSchema(options?: SchemaOptions) {
    return new Schema({
        userId: {
            type: String,
            hashKey: true,
        },
        taskId: {
            type: String,
            rangeKey: true
        },
        duration: {
            type: String,
            required: true,
        },
        deadline: {
            type: String,
            required: false
        }
    }, options)
}