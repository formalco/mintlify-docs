---
title: "Introduction"
---

<span className="page-description">How customers can deploy and manage the Formal Connector</span>

The Formal Connector is the protocol-aware proxy that provides visibility and control over the flow of data between your resources and users.

The Formal Connector is designed to be extremely easy to deploy and manage, thanks to two key features:

- **Smart-routing**: The Connector listens on a single port, automatically detects the wire protocol used by the client, and parses this protocol in real-time.
- **Zero-config**: The Connector automatically discovers resources in your cloud environment (Kubernetes clusters, RDS instances, EC2 instances, etc.) and connects to them without manual configuration.

## Deployment steps

Deploying a Connector consists of three main phases:

1. **Control Plane configuration**: Define the connector and its configuration in Formal.
2. **Infrastructure deployment**: Deploy the stateless Connector container in your infrastructure.
3. **Hostname and TLS configuration**: Add a DNS record for your Connector and configure its TLS settings.

The following pages explain each of these phases in detail.
