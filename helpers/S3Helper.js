const { S3 } = require("aws-sdk");
const { format } = require("date-fns");
const fs = require("fs");

class S3Helper {
  constructor(config) {
    this.s3Client = new S3({
      endpoint: config.url,
      region: config.region,
      s3ForcePathStyle: true
    });
    this.incomingMessageBucketName = config.incomingMessageBucketName;
  }

  async uploadIncomingMessage(messageId, uploadDate) {
    const s3FileName = `${format(uploadDate, "yyyy/MM/dd/HH/mm")}/${messageId}.xml`;
    const content = await fs.promises.readFile(`./fixtures/messages/${messageId}.xml`);

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

module.exports = S3Helper;
