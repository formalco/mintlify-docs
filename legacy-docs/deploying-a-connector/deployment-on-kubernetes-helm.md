---
title: "Deployment on Kubernetes (Helm)"
---

<span className="page-description">How to deploy the Connector on Kubernetes with Helm?</span>

## Prerequisites

- A running Kubernetes cluster (version 1.19 or later)
- Helm CLI installed (version 3.0 or later)
- Network access to the Formal Control Plane
- The Connector API token from the Formal Control Plane
- Access to Formal ECR repositories

## Helm repository

Formal provides Helm charts to deploy the Connector on Kubernetes. The repository is [hosted on GitHub](https://github.com/formalco/helm-charts) and is usable through the Helm CLI directly with the following command:

```bash
helm repo add formal https://formalco.github.io/helm-charts
```

## Outside AWS

If you are not in an AWS environment, you need to deploy our `ecr-cred` Helm chart before you can deploy the Connector. It deploys a job that builds a Docker config from your ECR credentials, so that Formal Docker images can be pulled from your Kubernetes cluster.

1. Retrieve the default values and save them to a local file for customization:

```bash
helm show values formal/ecr-cred > values.yaml
```

2. Edit the `values.yaml` file to set your ECR credentials.

3. Deploy the job:

```bash
helm install formal-ecr-cred formal/ecr-cred \
  --namespace formal \
  --create-namespace \
  -f values.yaml
```

## Connector installation

1. Retrieve the default values and save them to a local file for customization:

```bash
helm show values formal/connector > values.yaml
```

2. Edit the `values.yaml` file:

   - Add your Connector API key.
   - Set at least one port, according to the listeners you have defined.
   - If your Kubernetes cluster is outside AWS, set `pullWithCredentials` to `true`.

3. Install the Connector:

```bash
helm install formal-connector formal/connector \
  --namespace formal \
  --create-namespace \
  -f values.yaml
```

## Troubleshooting

If you encounter issues with the deployment:

1. Describe the Connector pods to check their status and events:

```bash
kubectl describe pods -n formal -l app.kubernetes.io/name=formal-connector
```

2. Make sure the API token used by the Connector is set and valid.

3. If it ran at least once, check the Connector logs:

```bash
kubectl logs -n formal -l app.kubernetes.io/name=formal-connector
```

4. Ensure network connectivity to the Formal Control Plane

If you need additional help, please contact the Formal team, we are always happy to help.
