---
title: "Logs Configuration"
---

import { CardInfo } from '@site/src/components/card/card';

<span className="page-description">How to configure the audit logs sent by your Formal Connectors?</span>

For every query going through your Formal Connectors, an audit log is created. With our Terraform provider, you can define how these audit logs are handled.

The logging behavior can be configured at both the Connector and Resource level, with Resource-level configurations taking precedence over Connector-level ones. This allows you to set baseline logging at the Connector level and override specific settings at the Resource level where needed.

With log configurations, you can:

- Encrypt HTTP request and response payloads, SQL queries, and other sensitive data with your own encryption keys
- Limit the size of HTTP request and response payloads
- Strip sensitive values from SQL queries

## Logs Encryption

Before enabling encryption for logs, you need to configure encryption keys. These keys are used to protect sensitive data in payloads and SQL queries.

Encryption keys are managed through the `formal_encryption_key` resource. Currently, only AWS KMS is supported as a provider:

```hcl
provider "aws" {
  region = "eu-west-1"
}

resource "aws_kms_key" "formal_logs_key" {
  description = "KMS key for Formal logs encryption"
}

resource "formal_encryption_key" "logs_key" {
  key_provider = "aws"
  key_id       = aws_kms_key.formal_logs_key.id
  region       = "eu-west-1"
  algorithm    = "aes_deterministic"
}
```

When creating an encryption key, you can choose between two algorithms:

- **AES-256 Random** (`aes_random`): This option allows for searchability over encrypted data but offers relatively less security.
- **AES-256 Deterministic** (`aes_deterministic`): This method offers enhanced security and is considered the most secure option.

Once you have created an encryption key, you can use it to encrypt logs:

```hcl
resource "formal_log_configuration" "connector_logs" {
  connector_id                    = formal_connector.main.id

  # Encryption
  encrypt_request_payload         = true
  encrypt_response_payload        = true
  encrypt_values_from_sql_queries = true
  request_encryption_key_id       = formal_encryption_key.logs_key.id
  response_encryption_key_id      = formal_encryption_key.logs_key.id
  sql_queries_encryption_key_id   = formal_encryption_key.logs_key.id
}
```

## HTTP Payloads

For both HTTP request and response payloads, you can configure:

- Maximum size limits through `request_payload_max_size` and `response_payload_max_size`, in bytes
- Encryption using `encrypt_request_payload` and `encrypt_response_payload` (requires configured encryption keys)

```hcl
resource "formal_log_configuration" "http_logs_config" {
  resource_id               = formal_resource.http_api_resource.id

  # Size limits
  request_payload_max_size  = 32768
  response_payload_max_size = 32768

  # Encryption
  encrypt_request_payload    = true
  encrypt_response_payload   = true
  request_encryption_key_id  = formal_encryption_key.log_key.id
  response_encryption_key_id = formal_encryption_key.log_key.id
}
```

Choose appropriate size limits based on your storage capacity and compliance requirements.

<CardInfo>
The example here uses a `resource_id`, meaning that the log configuration will only apply to the referenced resource (i.e. `http_api_resource`). If you want to apply the log configuration to all resources, you can use `connector_id` instead. Resource-level configurations take precedence over Connector-level ones.
</CardInfo>

## SQL Queries

When working with database connections, Formal offers two ways to protect sensitive information in SQL queries:

1. **Query Stripping**: Redact sensitive values from SQL queries using `strip_values_from_sql_queries`
2. **Query Encryption**: Encrypt sensitive parts of SQL queries using `encrypt_values_from_sql_queries` (requires a configured encryption key)

```hcl
resource "formal_log_configuration" "sql_focused_config" {
  connector_id = formal_connector.main.id

  # Redaction
  strip_values_from_sql_queries = true

  # Encryption
  encrypt_values_from_sql_queries = true
  sql_queries_encryption_key_id   = formal_encryption_key.log_key.id
}
```

You can enable both stripping and encryption. The values will be redacted first, then encrypted.
