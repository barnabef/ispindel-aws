import AWS from 'aws-sdk';
// const S3 = new AWS.S3();

const bucketName = process.env.BUCKET;

exports.main = async function(event: any, context: any) {
  try {
    var method = event.httpMethod;

    // if (method === "GET") {
    //   if (event.path === "/") {
    //     const data = await S3.listObjectsV2({ Bucket: bucketName }).promise();
    //     const body:any = {
    //       widgets: data.Contents.map((c: { Key: any; }) => c.Key)
    //     };
    //     return {
    //       statusCode: 200,
    //       headers: {},
    //       body: JSON.stringify(body)
    //     };
    //   }
    // }

    // We only accept GET for now
    return {
      statusCode: 400,
      headers: {},
      body: "We only accept GET /"
    };
  } catch(error) {
    const body = error.stack || JSON.stringify(error, null, 2);
    return {
      statusCode: 400,
        headers: {},
        body: JSON.stringify(body)
    }
  }
}