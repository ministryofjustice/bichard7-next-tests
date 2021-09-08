const { S3 } = require("aws-sdk");
const { format } = require("date-fns");
const getUtcDate = require("../utils/getUtcDate");

class IncomingMessageBucket {
  constructor(config) {
    const options = {
      region: config.region,
      s3ForcePathStyle: true
    };

    if (config.url) {
      options.endpoint = config.url;
      options.credentials = {
        accessKeyId: "test",
        secretAccessKey: "test"
      };
    }

    this.s3Client = new S3(options);
    this.incomingMessageBucketName = config.incomingMessageBucketName;
    this.uploadedS3Files = [];
  }

  async upload(message, externalCorrelationId, receivedDate) {
    const receivedDateUtc = getUtcDate(receivedDate);
    const s3FileName = `${format(receivedDateUtc, "yyyy/MM/dd/HH/mm")}/${externalCorrelationId}.xml`;
    this.uploadedS3Files.push(s3FileName);

    const content = message.replace("EXTERNAL_CORRELATION_ID", externalCorrelationId);

    const params = {
      Bucket: this.incomingMessageBucketName,
      Key: s3FileName,
      Body: content
    };

    return this.s3Client
      .upload(params)
      .promise()
      .then(() => s3FileName)
      .catch((error) => error);
  }
}

module.exports = IncomingMessageBucket;
