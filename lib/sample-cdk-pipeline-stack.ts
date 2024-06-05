import * as cdk from "aws-cdk-lib";
import { Code } from "aws-cdk-lib/aws-lambda";
import {
  CodePipelineSource,
  ShellStep,
  CodePipeline,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { pipeline } from "stream";

export class SampleCdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "SampleCdkPipeline",
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.connection(
          "andrewtdunn/sample-cdk-pipeline",
          "main",
          {
            connectionArn:
              "arn:aws:codestar-connections:us-east-1:637423577773:connection/78b54ada-1f46-4e0d-8b5c-572f1c8ee882",
          }
        ),
        commands: ["npm ci", "npm run build", "npx cdk synth"],
      }),
    });
  }
}
