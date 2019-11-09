import aws = require('aws-sdk');

export default function createTable() {

    const db = new aws.DynamoDB()
    const params = {
        TableName: "find-time",
        KeySchema: [
            {AttributeName: "userEmail", KeyType: "HASH"},  //Partition key
            {AttributeName: "type", KeyType: "RANGE"}  //Sort key
        ],
        AttributeDefinitions: [
            //Dates should be stored in UTC
            {AttributeName: "userEmail", AttributeType: "S"},
            {AttributeName: "type", AttributeType: "S"},//for userinfo -> prefix "user", task -> "task_+taskname"
            // {AttributeName: "password", AttributeType: "S"},
            // {AttributeName: "dateCreated", AttributeType: "N"},
            // {AttributeName: "taskName", AttributeType: "S"},
            // {AttributeName: "duration", AttributeType: "N"},
            // {AttributeName: "deadline", AttributeType: "N"},
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 2,
            WriteCapacityUnits: 2
        },
        // GlobalSecondaryIndexes: [
        //     {
        //         IndexName: '',
        //         KeySchema: [
        //             {
        //                 AttributeName: 'publisherId',
        //                 KeyType: 'HASH',
        //             }
        //         ]
        //     }
        // ]

    };
    db.createTable(params, function (err, data) {
        if (err && err.code !== "ResourceInUseException") {
            console.error("Unable to create table. Error JSON:", JSON.stringify(err, null, 2))
        } else {
            console.log("Created table. Table description JSON:", JSON.stringify(data, null, 2))
        }
    });
}