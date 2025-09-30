---
title: "Resources"
---

import { CardWarning, CardInfo } from '@site/src/components/card/card';

<span className="page-description">How to manage Formal Resources?</span>

## Overview
A Resources can be an API, database, or Kubernetes cluster or any other resource that you want to protect. The first step when installing Formal is to add a Resource.

## Native User

When consumers connect to your Resources, the connector uses native credentials of the database. You can specify which native user should be used:
- **by default**: for everyone across your organization
- **by users**: for specific users
- **by groups**: for every consumers in a specific group

<CardWarning>
Formal users and groups can only be assigned one Native User. As such, a Formal User's Native User assignment must be removed before assigning that user under a Formal Group that also has a Native User mapped. This is a safety measure to ensure purposeful intent when privileges are modified
</CardWarning>

### Specify a default native user
Select the native user used by default and hit the `Set default user` button.
<img src="/img/default_native_user.png" />

### Specify native user per user or group
To select a specific native user for a group or user, simply click on the `Select` button in the table.
<img src="/img/native_user4.png" />

## Health check

Formal periodically checks the healthiness of the database. You can specify which database should be used for the health check by typing the name and saving it.
<img src="/img/db_health_check.png" />

## Schema discovery

Formal discovers the schema of your data via a discovery job. For that job, you can specify:
1. **The frequency**: `none`, `every six hours`, `every twelve hours`, `every eighteen hours`, `every twenty-four hours` or a custom cron job
2. **The native user**: which native user should be used for the schema discovery
3. **The deletion policy**:
  - `mark for deletion`: mark the schema for deletion so that the deletion can be confirmed by a manual action
  - `delete`: automatically delete the schema

<img src="/img/schema_discovery.png" />

<CardInfo>
  The schema discovery job can also be triggered manually via the `Start new Discovery Job` button in the resource details.
</CardInfo>

## TLS

Formal can use TLS to encrypt the connection between the Formal Connector and your resource. You can specify the TLS mode, TLS version and the certificate truststore.

<img src="/img/resource_tls_configuration.png" />
