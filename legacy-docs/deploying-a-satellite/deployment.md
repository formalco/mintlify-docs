---
title: "Deployment"
---


import { CardWarning, CardInfo } from '@site/src/components/card/card';

<span className="page-description">Deploy Formal Satellites with the right environment</span>

Satellites are provided as Docker containers that you deploy. This can be achieved through your preferred container orchestration platform or deployment method.

**Recommended infrastructure**: For guidance on deploying the Satellite using Terraform via an ECS Cluster and ECS Fargate service, you can refer to the example provided by Formal [here](https://github.com/formalco/terraform-provider-formal/tree/main/examples/deployments/aws/satellites/data-discovery-satellite).

## Environment variables

When deploying the container, you need to configure it by setting its necessary environmental variables.

The following environment variable is essential for all Satellites:

* `FORMAL_CONTROL_PLANE_API_KEY`: This variable represents the satellite's API Key issued by Formal in order for the Satellite to authenticate itself with the Control Plane.

    You can find it in the detailed panel of your Satellite.
    <img src="/img/formal_control_plane_api_key.png" />

The different Satellites also expose Satellite-specific environment variables that you can find below.

<CardWarning>
Ensure that you replace `Your_Formal_Satellite_API_Key_Here`, `Your_Private_Key_Content_Here` and `Your_Satellite_Certificate_Content_Here` with the actual content of the respective certificates and keys in the configuration examples.
</CardWarning>

#### Data Classifier

* `PII_DETECTION`: This variable specifies the provider you choose for Personally Identifiable Information (PII) detection. The available options are:
    1. `formal`: In this mode, the Satellite uses a custom model built by Formal.
    2. `formal_llm`: In this mode, the Satellite uses LLM based classification in addition to the custom model built by Formal.
    3. `formal_llm_only`: In this mode, the Satellite uses only LLM based classification.

We recommend securing the connection between your Satellite instance and your Connectors by configuring TLS with this environment variable:

* `SATELLITE_TLS_CERT`: TLS certificate in a JSON object format. The JSON object should include the following fields:
    1. `private_key`: The private key of the satellite's TLS certificate.
    2. `certificate`: The public certificate of the satellite's TLS certificate.

Example configuration:

```hcl
FORMAL_CONTROL_PLANE_API=satellite_<Your_Formal_Satellite_API_Key_Here>
PII_DETECTION=formal
SATELLITE_TLS_CERT={
  "private_key": "-----BEGIN PRIVATE KEY-----\<Your_Private_Key_Content_Here>\n-----END PRIVATE KEY-----",
  "certificate": "-----BEGIN CERTIFICATE-----\n<Your_Satellite_Certificate_Content_Here>\n-----END CERTIFICATE-----"
}
```

#### Data Discovery

* `DATA_CLASSIFIER_SATELLITE_URI`: This variable should contain the URI of the data classifier satellite, including the port number where the service is running. For example: `localhost:50055`.
* `PII_SAMPLING_RATE` | **INT** | Rate at which the data should be analyzed for PII classification.
* `SERVER_CONNECT_TLS`: Enable (`true`) or disable (`false`) TLS communication between the Satellite and the Resource

We recommend securing the connection between your Satellite instance and your Connectors by configuring TLS with these environment variables:

* `SATELLITE_TLS_CERT_PRIVATE_KEY`: The content of the private key of your TLS key pair.
* `SATELLITE_TLS_CERT_FULLCHAIN`: The content of your TLS certificate chain.

Example configuration:

```hcl
FORMAL_CONTROL_PLANE_API=satellite_<Your_Formal_Satellite_API_Key_Here>
DATA_CLASSIFIER_SATELLITE_URI=localhost:50055
PII_SAMPLING_RATE=8
SERVER_CONNECT_TLS=true
SATELLITE_TLS_CERT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\<Your_Private_Key_Content_Here>\n-----END PRIVATE KEY-----"
SATELLITE_TLS_CERT_FULLCHAIN="-----BEGIN CERTIFICATE-----\n<Your_Satellite_Certificate_Content_Here>\n-----END CERTIFICATE-----"
```

#### Policy Data Loader

We recommend securing the connection between your Satellite instance and your Connectors by configuring TLS with these environment variables:

* `SATELLITE_TLS_CERT_PRIVATE_KEY`: The content of the private key of your TLS key pair.
* `SATELLITE_TLS_CERT_FULLCHAIN`: The content of your TLS certificate chain.

<CardInfo>
The Policy Data Loader Satellite passes its environment to its workers, meaning that you can use environment variables in the code of your Policy Data Loaders if you deploy the Satellite with those.
</CardInfo>

Example configuration:

```hcl
FORMAL_CONTROL_PLANE_API=satellite_<Your_Formal_Satellite_API_Key_Here>
SATELLITE_TLS_CERT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\<Your_Private_Key_Content_Here>\n-----END PRIVATE KEY-----"
SATELLITE_TLS_CERT_FULLCHAIN="-----BEGIN CERTIFICATE-----\n<Your_Satellite_Certificate_Content_Here>\n-----END CERTIFICATE-----"
```
