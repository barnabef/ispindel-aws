// asset-input/resources/events.ts
var AWS = require("aws-sdk");
var S3 = new AWS.S3();
var bucketName = process.env.BUCKET;
exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;
    if (method === "GET") {
      if (event.path === "/") {
        const data = await S3.listObjectsV2({Bucket: bucketName}).promise();
        const body = {
          widgets: data.Contents.map((c) => c.Key)
        };
        return {
          statusCode: 200,
          headers: {},
          body: JSON.stringify(body)
        };
      }
    }
    return {
      statusCode: 400,
      headers: {},
      body: "We only accept GET /"
    };
  } catch (error) {
    const body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
      headers: {},
      body: JSON.stringify(body)
    };
  }
};
