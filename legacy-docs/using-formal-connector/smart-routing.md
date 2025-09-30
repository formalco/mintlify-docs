---
title: "Smart Routing"
---

import { CardInfo, CardWarning } from '@site/src/components/card/card';

<span className="page-description">How to use smart routing to connect to multiple resources through a single port.</span>

Smart routing is a feature that allows you to connect to multiple resources through a single port, e.g. when a "Technology" listener is configured for the Connector.

This is particularly useful when you want to simplify your connection management and reduce the number of ports you need to open.

#### PostgreSQL

For PostgreSQL, use `<db_name>@<resource-name>` as database name to specify the resource.

Example:

```bash
psql -h HOSTNAME_OF_CONNECTOR -p 5432 -d DATABASE_NAME@RESOURCE_NAME -U idp:formal:human:john@joinformal.com
```

#### MongoDB

For MongoDB, use `formal_resource_name=<resource-name>` as appName name to specify the resource.

Example:

```bash
mongosh "mongodb://HOSTNAME_OF_CONNECTOR:27017/?appName=formal_resource_name=RESOURCE_NAME"
```

#### HTTP or S3

For HTTP or S3 use `<resource-name>.<host>:<port>` to specify the resource.

<CardWarning>
Make sure your DNS entries are properly configured to handle the subdomain routing, i.e. that `*.<host>` targets your Connector.
</CardWarning>

Example:

```bash
curl https://RESOURCE_NAME.HOSTNAME_OF_CONNECTOR:443/api/endpoint
```

<CardInfo>
If a single S3 resource is available, `<host>:<port>` can be used instead of `<resource-name>.<host>:<port>` for simplicity.
</CardInfo>
