#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { CharlaUnneStack } from "../lib/charla-unne-stack";

const app = new cdk.App();
new CharlaUnneStack(app, "CharlaUnneStack");