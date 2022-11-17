const { DynamoDB } = require("aws-sdk");
const isError = require("../utils/isError");

class AuditLogDynamoDbHelper {
  constructor(config) {
    const { region, endpoint, tableName, eventsTableName } = config;
    let dynamoDbOptions = { region };

    if (endpoint) {
      dynamoDbOptions = { ...dynamoDbOptions, endpoint };
    }

    const dynamoDb = new DynamoDB(dynamoDbOptions);

    this.client = new DynamoDB.DocumentClient({
      service: dynamoDb
    });

    this.tableName = tableName;
    this.eventsTableName = eventsTableName;
  }

  async getMessageByExternalCorrelationId(externalCorrelationId) {
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

    const record = result.Items[0];
    if (record && record.messageId) {
      const events = await this.getEventsByMessageId(record.messageId);
      record.events = events;
    }
    return record;
  }

  async getEventsByMessageId(messageId) {
    const queryOptions = {
      TableName: this.eventsTableName,
      IndexName: "messageIdIndex",
      KeyConditionExpression: "#keyName = :keyValue",
      ExpressionAttributeValues: {
        ":keyValue": messageId
      },
      ExpressionAttributeNames: {
        "#keyName": "_messageId"
      },
      ScanIndexForward: true
    };

    const result = await this.client
      .query(queryOptions)
      .promise()
      .catch((error) => error);

    if (isError(result)) {
      throw result;
    }

    return result.Items;
  }
}

module.exports = AuditLogDynamoDbHelper;
