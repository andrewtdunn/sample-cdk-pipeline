#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { SampleCdkPipelineStack } from "../lib/sample-cdk-pipeline-stack";

const app = new cdk.App();
new SampleCdkPipelineStack(app, "SampleCdkPipelineStack", {
  env: { account: "637423577773", region: "us-east-1" },
});

app.synth();
