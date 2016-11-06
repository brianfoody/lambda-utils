# lambda-utils
A utility library for Lambda and Node.js development.

This will be a growing collection of helper methods I encounter while using the serverless stack.


Methods
-----

### `convertAWSObjectToFlatObject`

This converts a DynamoDb image passed through an event to a flat object that we can use to send to other services

input:
{
  name: {
    S: "Lambda"
  }
}

output:
{
  name: "Lambda"
}

### `generateDynamoUpdateExpr`
This converts an object into an update expression for updating dynamo db. You can also pass in a list of columns to exclude from the update, for example hash or range keys.

input:
{
  name: {
    S: "Lambda"
  }
}

output:
{
  UpdateExpression: "set name = :a1",
  ExpressionAttributeValues: {
    ":a1": "Lambda"
  },
  Count: 1
}

