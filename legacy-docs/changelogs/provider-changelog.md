---
title: "Terraform Provider Changelog"
---
import { CardInfo } from '@site/src/components/card/card';

# Changelog

## 4.5.0 (2025-03-11)

**New**
- We added support for the [version 1.2.0](./cloud-integration-aws-template-changelog#120) of our CloudFormation template, with new Cloud Integration fields in the `aws` configuration block of `formal_integration_cloud` resources:
  - `enable_eks_autodiscovery` toggles EKS clusters autodiscovery.
  - `enable_rds_autodiscovery` toggles RDS instances (PostgreSQL, MySQL, MongoDB) autodiscovery.
  - `enable_redshift_autodiscovery` toggles Redshift clusters autodiscovery.
  - `allow_s3_access` allows Formal to send logs to S3 buckets in your AWS account through Log Integrations.
- Read-only fields have been added to the root level of `formal_integration_cloud` resources so that they can be passed directly to the CloudFormation stack as parameters:
  - `aws_enable_eks_autodiscovery` provides the value for the `EnableEKSAutodiscovery` parameter.
  - `aws_enable_rds_autodiscovery` provides the value for the `EnableRDSAutodiscovery` parameter.
  - `aws_enable_redshift_autodiscovery` provides the value for the `EnableRedshiftAutodiscovery` parameter.
  - `aws_allow_s3_access` provides the value for the `AllowS3Access` parameter.
  - `aws_s3_bucket_arn` provides the value for the `S3BucketARN` parameter.

<CardInfo>
Check out the updated [AWS integrations example](https://github.com/formalco/terraform-provider-formal/blob/495681fb7559634d29a7a86b75cc2d8eee2eb492/examples/deployments/aws/integrations/main.tf) in the provider’s GitHub repository to see a complete configuration that incorporates these new fields.
</CardInfo>

## 4.4.1 (2025-03-05)

**Changed**
- Bump Formal Go SDK from 2.8.1 to 2.8.2.

**Fixed**
- Bring back the `type` field of `formal_integration_cloud` resources, which was mistakenly removed in version 4.4.0 rather than marked optional and deprecated.

## 4.4.0 (2025-02-26)

**New**
- An `aws` configuration block got added to `formal_integration_cloud` resources so that the AWS CloudFormation template version and the S3 bucket ARN can be configured for AWS Cloud Integrations.

**Changed**
- The provider now uses version 2.8.1 version of the Formal Go SDK and version 2025-02-24 of the API.
- The `type` field of `formal_integration_cloud` resources got deprecated in favor of `aws`.

## 4.3.2 (2025-02-02)

**Changed**

- Bump to the version 2.7.0 of the Formal SDK

## 4.3.1 (2025-01-24)

**New**

- Add encryption keys and log configurations resources

**Changed**

- Add deprecated notification for `managed_tls` field in `formal_connector_hostname`
- Deprecate `managed_tls` field in `formal_connector_hostname`

**Fixed**

- Fix the list of update-able resource fields for formal resources

## 4.3.0 (2024-12-20)

**New**

- Add `dns_record` to formal_connector_hostname

**Changed**

- Remove ForceNew for `formal_resource_hostname.hostname`

## 4.2.2 (2024-12-08)

**New**

- Add `resource_hostname` as supported identity type for native_user_link

## 4.2.1 (2024-12-05)

**New**
- Add `formal_resource_hostname` resource

## 4.2.0 (2024-12-04)

**New**
- Support new form cloud integrations and log integrations


