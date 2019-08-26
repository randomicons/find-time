#!/bin/bash
#create table
aws dynamodb create-table \                                                                                                                                      (base)
    --table-name find-time-users \
    --attribute-definitions \
       AttributeName=userId,AttributeType=S \
       AttributeName=dataType,AttributeType=S \
    --key-schema \
       AttributeName=userId,KeyType=HASH \
       AttributeName=dataType,KeyType=RANGE \
    --provisioned-throughput \
       ReadCapacityUnits=1,WriteCapacityUnits=1 --endpoint-url http://localhost:8000

aws dynamodb list-tables --table-name find-time-users --endpoint-url http://localhost:8000

aws dynamodb put-item \
--table-name find-time-users  \
--item \
    '{"userId": {"S": "test"}, "dataType": {"S": "id"}, "password": {"S" : "expass"} }' --endpoint-url http://localhost:8000
