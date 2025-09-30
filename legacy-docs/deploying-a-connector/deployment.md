---
title: "Deployment"
---

<span className="page-description">How to deploy a Formal Connector?</span>

Customers provide their own infrastructure to run the Connector. It is packaged as a single stateless Docker container and uses a distroless image with a statically linked binary.

The Formal Connector is compatible with all major cloud providers (AWS, GCP, Azure) and can be deployed on-premises. It requires a Linux environment and supports both AMD64 and ARM64 architectures.

## Recommended deployment model

Depending on your current infrastructure, Formal recommends different deployment models.

### AWS

For organizations that use AWS, Formal recommends deploying the Connector as an ECS Fargate Service spawning in multiple availability zones, behind a Network Load Balancer.

### GCP

In a GCP infrastructure, Formal recommends deploying the Connector as a Cloud Run Service spawning in multiple regions with an internal Load Balancer in front of it.

### Kubernetes

Organizations running Kubernetes can deploy the Connector as any other Docker container. Formal provides [Helm charts](https://github.com/formalco/helm-charts) to easily deploy on Kubernetes, regardless of your cloud provider.

## Network requirements

When using the SaaS version of the Formal Control Plane with outbound firewall rules, you need to allow connections to the Control Plane domain. The Connector communicates with the Control Plane through an outbound gRPC connection to receive real-time configuration updates (policies, users, groups, etc.).

If your firewall uses a domain-based allow-list, add the following domain:

```bash
api.joinformal.com
```
