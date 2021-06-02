const { S3 } = require("aws-sdk");
const { format } = require("date-fns");
const fs = require("fs");

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
  }

  async upload(messageId, externalCorrelationId, receivedDate) {
    const s3FileName = `${format(receivedDate, "yyyy/MM/dd/HH/mm")}/${messageId}.xml`;
    const content = (await fs.promises.readFile(`./fixtures/messages/${messageId}.xml`))
      .toString()
      .replace("EXTERNAL_CORRELATION_ID", externalCorrelationId);

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
