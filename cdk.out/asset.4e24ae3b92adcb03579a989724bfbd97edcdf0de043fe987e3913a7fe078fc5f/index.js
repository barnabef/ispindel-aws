// asset-input/resources/events.ts
var bucketName = process.env.BUCKET;
exports.main = async function(event, context) {
  try {
    var method = event.httpMethod;
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
