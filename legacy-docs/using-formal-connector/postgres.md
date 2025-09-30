---
title: "Postgres"
---

import { CardInfo } from '@site/src/components/card/card';

<span className="page-description">The Formal Connector can streamline access and control of Postgres databases.</span>

## Requirements


### Networking

Certain ports must be accessible to connect to Formal Resources. You can listen on multiple ports simultaneously for various Resources.

For accessing Postgres, you may assign any port except 8080 (Connector's health check port). Ensure your security groups are configured to allow traffic on the designated port.

### Database Health Check

Formal periodically assesses the health of the database. Specify the database to use for the health check by entering its name.

If no database health check is configured (see [Database Health Check Configuration](/settings/resources#health-check)), the system will default to using the postgres database.

## Connect to Postgres

### PSQL

To connect using psql, execute the following command:

```
psql -h HOSTNAME_OF_THE_CONNECTOR -p PORT -d DATABASE_NAME -U FORMAL_USERNAME
```

Make sure to replace HOSTNAME_OF_THE_CONNECTOR, PORT, DATABASE_NAME, AND FORMAL_USERNAME with the right values. To learn more about users, check out [Native Users](/adding-resource/native-users).

<CardInfo>You can access your Formal Credentials in [Formal Console](/security/access).</CardInfo>
<CardInfo>You are free to use any preferred client.</CardInfo>

## Smart Routing

Formal Postgres features Smart Routing, allowing the linkage of an unlimited number of Resources over the same port (e.g. 5432).

There are two methods to specify the resource you wish to connect to:

1. Specify it in the JDBC params via the following option: `options=formal_resource_name=[name of the datastore]`
2. Provide the name of the resource following the database name:

```
psql -h HOSTNAME_OF_CONNECTOR -p 5432 -d DATABASE_NAME@RESOURCE_NAME -U idp:formal:human:john@joinformal.com
```

It is possible to attach multiple hostnames to a single resource.
To specify the hostname of the resource you wish to connect to, you can use the following format:

```
psql -h HOSTNAME_OF_CONNECTOR -p 5432 -d DATABASE_NAME@RESOURCE_NAME@HOSTNAME_NAME_OF_RESOURCE -U idp:formal:human:john@joinformal.com
```

Replace HOSTNAME_OF_CONNECTOR, DATABASE_NAME, RESOURCE_NAME, and HOSTNAME_NAME_OF_RESOURCE with the right values.
