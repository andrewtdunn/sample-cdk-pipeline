import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { SampleCdkPipelineStackLambdaStack } from "./sample-cdk-pipeline-lambda-stack";
import { DeployReactAppStack } from "./deploy-react-app-stack";

export class SampleCdkPipelineStage extends cdk.Stage {
  constructor(scope: Construct, id: string, props?: cdk.StageProps) {
    super(scope, id, props);

    const lambdaStack = new SampleCdkPipelineStackLambdaStack(
      this,
      "SampleCdkPipelineStackLambdaStack"
    );

    const reactStack = new DeployReactAppStack(this, "DeployReactAppStack");
  }
}
