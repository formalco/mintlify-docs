---
title: "Hostname and TLS Configuration"
---

import { Steps, Step } from '@site/src/components/steps/steps';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<span className="page-description">How can you setup hostnames and TLS for your Connectors?</span>

The Formal Connector supports encrypted communication using TLS. You can secure connections from clients and ensure that communications with resources are encrypted.

The hostname you configure will be used to reach and use your Connector. It can be managed by Formal or by yourself.

- **Formal-Managed**: The hostname is a subdomain of a domain that belongs to Formal. Formal will create and renew the TLS certificate of your Connector.
- **Customer-Managed**: The hostname is in a DNS zone you control. You are responsible for configuring your DNS records and managing your TLS certificates.

Formal recommends using Formal-managed hostnames for simplified TLS certificate management and automatic renewal.

## Formal-Managed

Formal will automatically generate and renew the TLS certificate for your Connector if the hostname ends with \
`.[NAME_OF_YOUR_ORG].connectors.joinformal.com`.

Using our Terraform provider, you can create such a Connector Hostname and precise where it should point to:

```hcl
resource "formal_connector_hostname" "main" {
  connector_id = formal_connector.main.id
  hostname     = var.connector_hostname # e.g. "postgres.<org-name>.connectors.joinformal.com"
  dns_record   = var.dns_record # CNAME record value to point to
}
```

The DNS record you want to set here is the hostname of the load balancer you have deployed to target your Connector.

When creating the Connector hostname with the web interface, just select "Formal-Managed" and fill the form.

## Customer-Managed

For self-managed hostname and TLS, you must provide your TLS certificate to the Connector via its environment variables.

Set `TLS_CERT_PRIVATE_KEY` and `TLS_CERT_FULLCHAIN` to the content your TLS private key and certificate fullchain associated with the domain that points to the Formal Connector.

Alternatively, you can provide the path to the files containing the TLS private key and certificate fullchain using `TLS_CERT_PRIVATE_KEY_FILE` and `TLS_CERT_FULLCHAIN_FILE`.

## Enabling TLS

To enable TLS connections between the client and Connector, set the environment variable `CLIENT_LISTEN_TLS` to `true`.

TLS settings for connections between the Connector and Resources are configured per-resource either via the UI or Terraform. In Terraform, you can set the `tls_config` parameter in the `formal_resource_tls_configuration` resource to one of the following options: `disable`, `insecure-skip-verify`, `insecure-verify-ca-only` (verifies certificate chain but not hostname), or `verify-full`.
