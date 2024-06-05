import * as cdk from "aws-cdk-lib";
import { Code } from "aws-cdk-lib/aws-lambda";
import {
  CodePipelineSource,
  ShellStep,
  CodePipeline,
  ManualApprovalStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { SampleCdkPipelineStage } from "./sample-cdk-pipeline-stage";
import { BuildSpec } from "aws-cdk-lib/aws-codebuild";

export class SampleCdkPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "SampleCdkPipelineTest4",
      crossAccountKeys: true,
      synth: new ShellStep("Synth", {
        input: CodePipelineSource.connection(
          "andrewtdunn/sample-cdk-pipeline",
          "main",
          {
            connectionArn:
              "arn:aws:codestar-connections:us-east-1:637423577773:connection/78b54ada-1f46-4e0d-8b5c-572f1c8ee882",
          }
        ),
        commands: [
          "cd reactapp",
          "npm ci",
          "npm run build",
          "cd ..",
          "npm ci",
          "npm run build",
          "npx cdk synth",
        ],
      }),
      synthCodeBuildDefaults: {
        partialBuildSpec: BuildSpec.fromObject({
          phases: {
            install: {
              "runtime-versions": {
                nodejs: "20",
              },
            },
          },
        }),
      },
    });

    pipeline.addStage(
      new SampleCdkPipelineStage(this, "test", {
        env: { account: "730335377532", region: "us-east-1" },
      })
    );

    const prodStage = new SampleCdkPipelineStage(this, "prod", {
      env: { account: "339713083299", region: "us-east-1" },
    });

    pipeline.addStage(prodStage, {
      pre: [new ManualApprovalStep("PromoteToProd")],
    });
  }
}
