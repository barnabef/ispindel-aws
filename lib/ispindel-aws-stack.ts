import * as cdk from "@aws-cdk/core";
import * as apigateway from "@aws-cdk/aws-apigateway";
import * as lambda from "@aws-cdk/aws-lambda";
import * as lambdaNodejs from "@aws-cdk/aws-lambda-nodejs";
import * as dynamodb from "@aws-cdk/aws-dynamodb";
import * as cloudfront from '@aws-cdk/aws-cloudfront';
import * as origins from '@aws-cdk/aws-cloudfront-origins';

export class ISpindelAwsStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    const table = new dynamodb.Table(this, 'iSpindel', {
      partitionKey: { name: 'pkey0', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'skey0', type: dynamodb.AttributeType.STRING },
      billingMode: dynamodb.BillingMode.PAY_PER_REQUEST
    });
    
    table.addGlobalSecondaryIndex({
      indexName: "index1",
      partitionKey: { name: 'pkey1', type: dynamodb.AttributeType.STRING },
      sortKey: { name: 'skey1', type: dynamodb.AttributeType.STRING },
      
    })

    const handler = new lambdaNodejs.NodejsFunction(this, "AddEventsHandler", {
      runtime: lambda.Runtime.NODEJS_14_X, // So we can use async in widget.js
      entry: "resources/events.ts",
      handler: "main",
      environment: {
        TABLE: table.tableName
      }
    });

    table.grantReadWriteData(handler); // was: handler.role);

    const api = new apigateway.RestApi(this, "ispindel-api", {
      restApiName: "iSpindel Service",
      description: "This service supports the iSpindel."
    });
    
    api.root.addResource("events").addMethod("PUT", new apigateway.LambdaIntegration(handler, {
      requestTemplates: { "application/json": '{ "statusCode": "200" }' }
    }))
    
    new cloudfront.Distribution(this, 'iSpindelDistribution', {
      defaultBehavior: { origin: new origins.HttpOrigin(domainName: string, props?: HttpOriginProps) },
    });

  }
}
