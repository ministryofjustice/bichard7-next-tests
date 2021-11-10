const { DynamoDB } = require("aws-sdk");
const isError = require("../utils/isError");

class DynamoDbHelper {
  constructor(config) {
    const { region, endpoint, tableName } = config;
    let dynamoDbOptions = { region };

    if (endpoint) {
      dynamoDbOptions = { ...dynamoDbOptions, endpoint };
    }

    const dynamoDb = new DynamoDB(dynamoDbOptions);

    this.client = new DynamoDB.DocumentClient({
      service: dynamoDb
    });

    this.tableName = tableName;
  }

  async getMessageByExternalCorrelationId(context, externalCorrelationId) {
    const queryOptions = {
      TableName: this.tableName,
      IndexName: "externalCorrelationIdIndex",
      KeyConditionExpression: "#keyName = :keyValue",
      ExpressionAttributeValues: {
        ":keyValue": externalCorrelationId
      },
      ExpressionAttributeNames: {
        "#keyName": "externalCorrelationId"
      },
      ScanIndexForward: true,
      Limit: 1
    };

    const result = await this.client
      .query(queryOptions)
      .promise()
      .catch((error) => error);

    if (isError(result)) {
      throw result;
    }

    return result.Items[0];
  }
}

module.exports = DynamoDbHelper;
