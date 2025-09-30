---
title: "SIEM"
---

import { CardInfo, CardWarning } from '@site/src/components/card/card';
import { Steps, Step } from '@site/src/components/steps/steps';

<span className="page-description">How to export your Formal logs to your SIEM?</span>

You can integrate Formal with your SIEM to forward queries made to Formal Connectors. This allows you to streamline the flow of queries between Formal Connectors and your integrated application.

<CardInfo>By default, Formal will forward **queries made to all Connectors**.</CardInfo>
<img src="/img/supported_logs.png" />

## How to connect

<Steps>
  <Step title="Navigate to SIEM">
    Go to the [_Log Integrations application_](https://app.joinformal.com/log-integrations) in the Formal dashboard.
  </Step>
  <Step title="Add integration">
    Click the _Create Log Integration_ button.
  </Step>
  <Step title="Choose provider">
    Select your provider from our list of supported providers.
  </Step>
  <Step title="Configure connection">
    Fill in the relevant connection details according to your provider.
  </Step>
</Steps>

<CardWarning>
    If you're using AWS S3, you must first set up an [AWS Cloud Integration](/integrations/cloud/aws) with S3 access enabled. This integration will be used to connect to your S3 bucket.
</CardWarning>

## Using Terraform

Alternatively, you can configure your SIEM integration using Terraform.

### AWS S3

For AWS S3 log integrations, you must first set up an S3 bucket and an [AWS Cloud Integration](/integrations/cloud/aws) with S3 access enabled and the S3 bucket ARN configured so that the S3 bucket is accessible from the AWS Cloud Integration.

You can then forward Formal Connector logs to the S3 bucket:

```hcl
resource "formal_integration_log" "demo" {
  name = "${var.name}-demo-integration"
  s3 {
    s3_bucket_name       = aws_s3_bucket.demo.bucket
    cloud_integration_id = formal_integration_cloud.demo.id
  }
}
```

### Datadog

Datadog is a popular choice for log management. To forward Formal Connector logs to Datadog:

```hcl
resource "formal_integration_log" "demo" {
  name = "${var.name}-demo-integration"
  datadog {
    account_id = var.datadog_account_id
    api_key    = var.datadog_api_key
    site       = var.datadog_site
  }
}
```

### Splunk

We also have a Splunk log integration. Here is a Terraform example to forward your Connector logs to Splunk:

```hcl
resource "formal_integration_log" "demo" {
  name = "${var.name}-demo-integration"
  splunk {
    access_token = var.splunk_access_token
    host         = var.splunk_host
    port         = var.splunk_port
  }
}
```
