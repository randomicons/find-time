#!/bin/bash
#create table
aws dynamodb create-table \
    --table-name find-time-users \
    --attribute-definitions \
       AttributeName=userId,AttributeType=S \
       AttributeName=dateCreated,AttributeType=S \
    --key-schema \
       AttributeName=userId,KeyType=HASH \
       AttributeName=dateCreated,KeyType=RANGE \
    --provisioned-throughput \
       ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

aws dynamodb create-table --table-name find-time-tasks \
--attribute-definitions \
   AttributeName=userId,AttributeType=S \
   AttributeName=taskId,AttributeType=S \
--key-schema \
   AttributeName=userId,KeyType=HASH \
   AttributeName=taskId,KeyType=RANGE \
--provisioned-throughput \
   ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

aws dynamodb list-tables --endpoint-url http://localhost:8000

aws dynamodb put-item \
--table-name find-time-users  \
--item \
    '{"userId": {"S": "test"}, "dataType": {"S": "ID"}, "password": {"S" : "expass"} }' --endpoint-url http://localhost:8000

aws dynamodb put-item \
--table-name find-time-users  \
--item \
    '{"userId": {"S": "test"}, "dataType": {"S": "TASK"}, "name": {"S" : "task2"}, "duration": {"S": "101"}}' --endpoint-url http://localhost:8000

aws dynamodb get-item  --table-name find-time-users \
--key '{"userId" : {"S": "test"}, "dataType" : {"S": "TASK"}}' --endpoint-url http://localhost:8000

aws dynamodb query --table-name find-time-users \
--key-condition-expression "userId = :id" \
--expression-attribute-values '{":id": {"S": "test"}}' --endpoint-url http://localhost:8000