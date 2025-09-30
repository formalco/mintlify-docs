---
title: "Control Plane Configuration"
---

import { CardInfo, CardWarning } from '@site/src/components/card/card';

<span className="page-description">How customers can configure their Formal Connector?</span>

The first step to deploy your Connector is to register the Connector itself on the Control Plane. Connectors are defined by a name, different listeners and their rules.

Connectors can be defined with the web interface directly ([app.joinformal.com](https://app.joinformal.com)), or with the Terraform provider.

## Listener

A listener monitors a specific port for incoming client connections to the Connector. You need to define one or more listeners when setting up your Connector.

<CardInfo>
Note that the Connector also runs an HTTP server listening on port 8080, which provides health check functionality. For this reason, you cannot define a listener on port 8080.
</CardInfo>

### Listener rules

Each listener uses a rule for routing requests. These rules direct requests to the appropriate resources.

There are three types of rules:

1. **Resource**: Directs requests to a specific Formal Resource.
2. **Technology**: Directs requests to all Formal Resources of a specific technology (e.g., PostgreSQL). **Only supported for PostgreSQL and HTTP**.
3. **Any**: Directs requests to any Formal Resource (Supported protocols: PostgreSQL, MongoDB, HTTP, S3, SSH).

#### Technology rules

When using "Technology" rules, if more than one resource is reachable by the connector, [smart routing](/using-formal-connector/smart-routing) will be enabled to select the correct resource.

#### Any rules

When using an "Any" rule, [_deep packet inspection_](https://en.wikipedia.org/wiki/Deep_packet_inspection) is used to select the correct protocol.

<CardInfo>
A Listener can have an unlimited number of rules.
</CardInfo>

<CardWarning   Warning>
Rules defined for a Listener cannot filter resources based on specific criteria. Therefore, exercise caution when using the `technology` type, as it will include all resources of that technology. You may want to use a Space to filter resources.
</CardWarning>
