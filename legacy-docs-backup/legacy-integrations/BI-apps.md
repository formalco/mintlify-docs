---
title: "BI Applications"
---

import { CardInfo, Card, CardLink } from '@site/src/components/card/card';
import { Steps, Step } from '@site/src/components/steps/steps';

<span className="page-description">How does Formal integrate with BI applications?</span>

Formal's integration with BI apps allows you to enforce Formal's policies and controls within your BI applications.

## How it works

When you set up a BI integration, Formal Control Plane automatically synchronizes with your BI application to fetch user identities. The corresponding External IDs are assigned to your users, enabling them to be recognized when queries from your BI application pass through the Connector.

<CardInfo>
Since the Connector fetches all user information from the Control Plane, your users are properly authenticated and authorized without requiring additional configuration in your deployment.
</CardInfo>

## Supported BI applications

<img src="/img/supported_bis.png" />

## Network configuration

For our workers to reach your Metahub instance, you will need to allow-list the following ip addresses:

- 52.18.34.8
- 52.51.88.92
- 54.72.150.112

## Add BI application via UI

<Steps>
  <Step title="First Step">
    Navigate to the BI application.
  </Step>
  <Step title="Second Step">
    Click on `Add New App` button.
  </Step>
  <Step title="Third Step">
    Select the BI application of your choice.
  </Step>
  <Step title="Fourth Step">
    Fill in the relevant connection details according to the selected BI application.
        - For **Metabase** you'll need:
            1. The server hostname
            2. Metabase admin username
            3. Metabase admin password
        - For **Looker**:
            Looker supports end-user identity propagation by sending additional parameters via JDBC connections. To enable this feature:
                1. Go to the database connection interface in Looker (Admin > Connections > [Your DB])
                2. Edit the connection settings, and add the following parameter in the "Additional Params" section: `options=formal_enduser={{ _user_attributes['email'] }}`
  </Step>
</Steps>

<CardInfo>
When connecting Metabase the user will receive a "We've Noticed a New Metabase Login" email alert from a location in Ireland.
</CardInfo>

## Add BI Application via Terraform

Example of creating a Metabase BI application using Formal:

```hcl
resource "formal_integration_bi" "name" {
  name              = "terraform-test-integration-app"
  metabase {
    hostname = "metabase.com"
    password = "metabasepassword"
    username = "metabaseusername"
  }
}
```

More information available [here](https://registry.terraform.io/providers/formalco/formal/latest/docs/resources/integration_bi).

<CardLink href="../guides/how-to-enable-end-user-identity-propagation">
<Card
    title="End-user identity propagation"
>
    For more information on how end user identity propagation works, read this documentation.
</Card>
</CardLink>
