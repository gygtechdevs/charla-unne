import * as cdk from "aws-cdk-lib";
import * as ec2 from "aws-cdk-lib/aws-ec2";
import { Construct } from "constructs";

export class CharlaUnneStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const vpc = new ec2.Vpc(this, "WebVpc", {
      maxAzs: 1,
      natGateways: 0,
      subnetConfiguration: [
        {
          name: "Public",
          subnetType: ec2.SubnetType.PUBLIC,
          cidrMask: 24,
        },
      ],
    });

    const webSecurityGroup = new ec2.SecurityGroup(this, "WebSecurityGroup", {
      vpc,
      description: "Allow public HTTP traffic",
      allowAllOutbound: true,
    });
    webSecurityGroup.addIngressRule(
      ec2.Peer.anyIpv4(),
      ec2.Port.tcp(80),
      "Allow HTTP",
    );

    const webServer = new ec2.Instance(this, "WebServer", {
      vpc,
      vpcSubnets: { subnetType: ec2.SubnetType.PUBLIC },
      instanceType: ec2.InstanceType.of(
        ec2.InstanceClass.T3,
        ec2.InstanceSize.MICRO,
      ),
      machineImage: ec2.MachineImage.latestAmazonLinux2023(),
      securityGroup: webSecurityGroup,
      associatePublicIpAddress: true,
    });

    webServer.userData.addCommands(
      "dnf update -y",
      "dnf install -y httpd",
      "systemctl enable --now httpd",
      "printf '%s\\n' '<h1>Servidor HTTP UNNE</h1>' > /var/www/html/index.html",
    );

    new cdk.CfnOutput(this, "WebServerPublicIp", {
      value: webServer.instancePublicIp,
    });
    new cdk.CfnOutput(this, "WebServerUrl", {
      value: `http://${webServer.instancePublicDnsName}`,
    });
  }
}