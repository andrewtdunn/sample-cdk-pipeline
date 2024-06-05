import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { DeploymentService } from "./deployment-service";

export class DeployReactAppStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    new DeploymentService(this, "deployment");
  }
}
