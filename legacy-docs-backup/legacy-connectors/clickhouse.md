---
title: "Clickhouse"
---

<span className="page-description">How to connect to Clickhouse using the Formal Connector.</span>

import { CardInfo, CardWarning } from '@site/src/components/card/card';
import { Steps, Step } from '@site/src/components/steps/steps';

## Limitations

Clickhouse native TCP protocol is not supported. Formal only supports Clickhouse over HTTP.

## Create a Clickhouse Resource

To create a Clickhouse Resource, follow these steps:
1. Navigate to the Resources page.
2. Click on the "Create Resource" button.
3. Select `Clickhouse` from the list of resources.
4. Fill in the required fields.
    - The **hostname** and **port**: typically, the port is 8443 when using TLS or 8123 when not using TLS.
    - The **database name**: out of the box, there is a database named `default`, use the name of the database that you want to connect to.
5. Click on the `Create` button.
6. Once the resource is created, you need to create a native user.
    - The **username** and **password**: out of the box, the username is `default`. Use the username appropriate for your use case.

<CardInfo>
The details for your ClickHouse Cloud service are available in the ClickHouse Cloud console. Select the service that you will connect to and click Connect:
</CardInfo>

## Connect to a Clickhouse Resource

Here is an example of how to connect to a Clickhouse Resource using [Clickhouse Connect](https://clickhouse.com/docs/en/integrations/python):
```python
import clickhouse_connect

def connect_to_clickhouse():
    # Replace with your ClickHouse host, port, username, and password
    host = 'connector-hostname'
    port = 8444
    username = 'idp:formal:human:john@joinformal.com'
    password = 'your-formal-password'
    
    try:
        # Initialize the ClickHouse client
        client = clickhouse_connect.get_client(
            host=host,
            user=username,
            password=password,
            port=8444,
            database='default',
        )
        print("Connection to ClickHouse established successfully!")
        return client
    except Exception as e:
        print(f"Failed to connect to ClickHouse: {e}")
        return None

def main():
    client = connect_to_clickhouse()
    if client:
        # Example query to check connection
        try:
            print("Result:", client.query("SELECT 1").result_set[0][0])
        except Exception as e:
            print(f"Error executing query: {e}")

if __name__ == "__main__":
    main()
```