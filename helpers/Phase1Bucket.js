const { S3 } = require("aws-sdk");

class Phase1Bucket {
  constructor(config) {
    const options = {
      region: config.region,
      s3ForcePathStyle: true
    };

    if (config.url) {
      options.endpoint = config.url;
      options.credentials = {
        accessKeyId: "S3RVER",
        secretAccessKey: "S3RVER"
      };
    }

    this.s3Client = new S3(options);
    this.phase1BucketName = config.phase1BucketName;
    this.uploadedS3Files = [];
  }

  async upload(message, correlationId) {
    const now = new Date();
    const year = now.getFullYear();
    const month = `${now.getMonth() + 1}`.padStart(2, "0");
    const day = `${now.getDate()}`.padStart(2, "0");
    const hour = `${now.getHours()}`.padStart(2, "0");
    const minute = `${now.getMinutes()}`.padStart(2, "0");
    const s3FileName = `${year}/${month}/${day}/${hour}/${minute}/${correlationId}.xml`;

    const params = {
      Bucket: this.phase1BucketName,
      Key: s3FileName,
      Body: message
    };

    return this.s3Client
      .upload(params)
      .promise()
      .then(() => s3FileName)
      .catch((error) => error);
  }
}

module.exports = Phase1Bucket;
