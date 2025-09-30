---
title: "API Keys"
---

import { Steps, Step } from '@site/src/components/steps/steps';
import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">How can admins authenticate with Formal?</span>

## Authentication and Configuration

Authenticating with Formal requires an `api_key`. Admins can generate the API Key from within the Formal Console as follows:

<Steps>
  <Step title="First Step">
    Navigate to the [Api Keys Application](https://app.joinformal.com/api-keys).
  </Step>
  <Step title="Second Step">
    Create a new Api Key by clicking on `Create Api Key`.
  </Step>
  <Step title="Third Step">
    Provide a name for your Api key and generate the API key. You can then use this credential to authenticate your Terraform client with Formal.
  </Step>
</Steps>

<CardWarning>
  The API key is not to be confused with Formal Access Tokens which are specific to each user and responsible to authenticate users to Formal Connectors.
</CardWarning>
