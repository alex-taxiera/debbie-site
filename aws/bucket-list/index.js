const aws = require('aws-sdk')

exports.handler = async (event, context) => {
  const s3 = new aws.S3()
  const bucketName = event.pathParameters['bucket-name']
  const params = {
    Bucket: bucketName,
    MaxKeys: 2
  }
  try {
    const results = s3.listObjects(params).promise()
    return {
      statusCode: 200,
      body: JSON.stringify(results)
    }
  } catch (error) {
    throw error
  }
}
