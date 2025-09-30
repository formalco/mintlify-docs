---
title: "Duo"
---

import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">How to enforce MFA on Formal Connectors?</span>

Formal integrates with Duo to enforce MFA when users attempt to connect to Formal Connectors.

## Add Duo integration to Formal

To add Duo to Formal Connectors, you need to add the following environment variables to the Connector:

<!-- cSpell:ignore IKEY, SKEY -->
```
export DUO_IKEY=<IKEY>
export DUO_SKEY=<SKEY>
export DUO_HOST=<HOST>
```

<CardWarning><p>Replace `DUO_IKEY` (integration key), `DUO_SKEY` (secret key), `DUO_HOST` (hostname) with the values specific to your Duo account.</p></CardWarning>

## Enforce Duo MFA to Connectors

A very basic policy to enforce MFA to all users and Connectors is the following:
```rego
package formal.v2

import future.keywords.if

session := { "action": "mfa" } if {}
```

This policy will be enforced across all your Connectors and users.

## Example

When connecting to a Connector, the user will be prompted on Duo to approve or reject the authentication.
<img height="50" src="/img/duo_mfa.JPG" />