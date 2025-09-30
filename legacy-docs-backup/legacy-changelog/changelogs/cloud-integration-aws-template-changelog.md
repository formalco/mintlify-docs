---
title: "Cloud Integration AWS Template Changelog"
---
import { CardInfo } from '@site/src/components/card/card';

# Changelog

<CardInfo>
Any version of our CloudFormation stack for AWS Cloud Integrations can be downloaded and reviewed using the following URL template, replacing `{{VERSION}}` with the actual version number: `https://formal-cloudintegration.s3.eu-west-1.amazonaws.com/{{VERSION}}.yml`
</CardInfo>

## 1.3.0

**New**
- The CloudFormation stack now supports the following feature flags as parameters. Each feature flag will add (when `true`) or remove (when `false`) the necessary IAM policies for the Cloud Integration role to access the corresponding AWS resources.
  - `EnableEC2Autodiscovery` toggles EC2 instance autodiscovery.
  - `EnableECSAutodiscovery` toggles ECS cluster autodiscovery.

## 1.2.0

**New**
- The CloudFormation stack now supports the following feature flags as parameters. Each feature flag will add (when `true`) or remove (when `false`) the necessary IAM policies for the Cloud Integration role to access the corresponding AWS resources.
  - `EnableEKSAutodiscovery` toggles EKS clusters autodiscovery.
  - `EnableRDSAutodiscovery` toggles RDS instances (PostgreSQL, MySQL, MongoDB) autodiscovery.
  - `EnableRedshiftAutodiscovery` toggles Redshift clusters autodiscovery.
  - `AllowS3Access` allows Formal to send logs to S3 buckets in your AWS account through Log Integrations.

## 1.1.0

**New**
- You can now control which S3 buckets the Cloud Integration can access with the `S3BucketARN` parameter. If empty, no S3 permission will be given to the Cloud Integration.

## 1.0.0

Initial implementation of our AWS CloudFormation stack for Formal Cloud Integrations.
