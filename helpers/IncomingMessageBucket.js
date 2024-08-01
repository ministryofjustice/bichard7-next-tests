const { S3 } = require("aws-sdk")
const { format } = require("date-fns")
const getUtcDate = require("../utils/getUtcDate")

class IncomingMessageBucket {
  constructor(config) {
    const options = {
      region: config.region,
      s3ForcePathStyle: true
    }

    if (config.url && config.url !== "none") {
      options.endpoint = config.url
      options.credentials = {
        accessKeyId: "test",
        secretAccessKey: "test"
      }
    }

    this.s3Client = new S3(options)
    this.incomingMessageBucketName = config.incomingMessageBucketName
    this.uploadedS3Files = []
  }

  upload(message, correlationId) {
    const receivedDateUtc = getUtcDate(new Date())
    const s3FileName = `${format(receivedDateUtc, "yyyy/MM/dd/HH/mm")}/${correlationId}.xml`
    this.uploadedS3Files.push(s3FileName)

    const params = {
      Bucket: this.incomingMessageBucketName,
      Key: s3FileName,
      Body: message
    }

    return this.s3Client
      .upload(params)
      .promise()
      .then(() => s3FileName)
      .catch((error) => error)
  }
}

module.exports = IncomingMessageBucket
