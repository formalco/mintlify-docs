---
title: "Policy Evaluation"
---

import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">What are the different evaluation stages and available inputs?</span>

Policies undergo evaluation at three distinct stages: firstly, during the connection time (`session`); secondly, prior to sending a query to the resource (`pre-request`); and finally, when the data is received from the resource (`post-request`). Each stage offers various potential actions and available inputs.

## Policy stages

### Session stage

#### Available inputs

| Name              | Type                 | Description                                                                                                                            |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| policy_id         | **STRING**           | ID of the policy evaluated.                                                                                                            |
| application       | **STRING**           | Name of the application.                                                                                                               |
| client_ip_address | **STRING**           | IP address of the client.                                                                                                              |
| tls               | **BOOLEAN**          | Tells if the connection between Proxy and client is encrypted with TLS.                                                                |
| db_name           | **STRING**           | Name of the database.                                                                                                                  |
| native_user       | **STRING**           | Native user making a connection to the database.                                                                                       |
| user              | **User Object**      | The user making a connection to the database. User object includes name, email and groups.                                             |
| end_user          | **User Object**      | If the user is a machine user, the end user is the user behind the application, otherwise the end user has the same value as the user. |
| device            | **Device Object**    | Device information.                                                                                                                    |
| resource          | **Resource Object**  | The Resource being queried.                                                                                                            |
| connector         | **Connector Object** | The current Connector.                                                                                                                 |
| aws               | **AWS Object**       | AWS resources **for SSH**.                                                                                                             |
| snowflake         | **Snowflake Object** | Snowflake specific information.                                                                                                        |
| space             | **Space Object**     | Space specific information.                                                                                                            |

#### Available actions

For this policy stage, two types of actions are possible: `allow` and `block`.

### Pre-request stage

Pre-request rules are evaluated by the proxy when it intercepts a request (query) just before sending it to the resource. This evaluation stage is especially useful in blocking write requests.

#### Available inputs

| Name              | Type                 | Description                                                                                                                            |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| policy_id         | **STRING**           | ID of the policy evaluated.                                                                                                            |
| application.name  | **STRING**           | Name of the application.                                                                                                               |
| client_ip_address | **STRING**           | IP address of the client.                                                                                                              |
| sql_query         | **SQL Query Object** | SQL query.                                                                                                                             |
| query             | **SQL Query Object** | SQL query. (alias)                                                                                                                     |
| db_name           | **STRING**           | Name of the database.                                                                                                                  |
| user_type         | **ENUM**             | Underlying type used by the user to connect to the database, can be `formal` or `native`.                                              |
| schema_paths      | **[]STRING**         | List of the schema paths that are accessed by a query.                                                                                 |
| table_paths       | **[]STRING**         | List of the table paths that are accessed by a query.                                                                                  |
| path              | **STRING**           | Path of the resource being queried.                                                                                                    |
| user              | **User Object**      | The user making a connection to the database. User object includes name, email and groups.                                             |
| end_user          | **User Object**      | If the user is a machine user, the end user is the user behind the application, otherwise the end user has the same value as the user. |
| device            | **Device Object**    | Device information.                                                                                                                    |
| space             | **Space Object**     | Space information.                                                                                                                     |
| row               | **[]Column Object**  | Rows of data being queried.                                                                                                            |
| resource          | **Resource Object**  | The Resource being queried.                                                                                                            |
| columns           | **[]Column Object**  | List of columns.                                                                                                                       |
| connector         | **Connector Object** | The current Connector.                                                                                                                 |
| snowflake         | **Snowflake Object** | Snowflake specific information.                                                                                                        |

#### Available actions

For this policy stage, three types of actions are possible: `allow`, `block`, and `rewrite`.

### Post-request stage

Post-request rules are evaluated by the proxy when it intercepts data received from the resource. This evaluation stage is particularly useful in the context of masking or filtering read requests.

#### Available inputs

| Name              | Type                 | Description                                                                                                                            |
| ----------------- | -------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| policy_id         | **STRING**           | ID of the policy evaluated.                                                                                                            |
| application       | **STRING**           | Name of the application.                                                                                                               |
| client_ip_address | **STRING**           | IP address of the client.                                                                                                              |
| sql_query         | **SQL Query Object** | SQL query.                                                                                                                             |
| query             | **SQL Query Object** | SQL query. (alias)                                                                                                                     |
| db_name           | **STRING**           | Name of the database.                                                                                                                  |
| schema_paths      | **[]STRING**         | List of the schema paths that are accessed by a query.                                                                                 |
| table_paths       | **[]STRING**         | List of the table paths that are accessed by a query.                                                                                  |
| table_names       | **[]STRING**         | List of the table names that are accessed by a query.                                                                                  |
| columns           | **[]Column Object**  | List of columns.                                                                                                                       |
| user              | **User Object**      | The user making a connection to the database. User object includes name, email and groups.                                             |
| end_user          | **User Object**      | If the user is a machine user, the end user is the user behind the application, otherwise the end user has the same value as the user. |
| device            | **Device Object**    | Device information.                                                                                                                    |
| resource          | **Resource Object**  | The Resource being queried.                                                                                                            |
| columns           | **[]Column Object**  | List of columns.                                                                                                                       |
| connector         | **Connector Object** | The current Connector.                                                                                                                 |
| snowflake         | **Snowflake Object** | Snowflake specific information.                                                                                                        |
| space             | **Space Object**     | Space specific information.                                                                                                            |

#### Available actions

For this policy stage, four types of actions are possible: `allow`, `filter`, `mask`, `decrypt`.

## Standard input data

Policies can access various data types, including user information, resource information, and SQL query information. The following sections describe the available data types.

### User object

| Value    | Type         | Description                                          |
| -------- | ------------ | ---------------------------------------------------- |
| username | **STRING**   | Username of the user                                 |
| email    | **STRING**   | If it's a human user, their email address            |
| groups   | **[]STRING** | Groups in which the user is included                 |
| type     | **STRING**   | Type of the user, can be either `human` or `machine` |

### Connector object

| Value | Type       | Description           |
| ----- | ---------- | --------------------- |
| id    | **STRING** | ID of the Connector   |
| name  | **STRING** | Name of the Connector |

### Resource object

| Value         | Type       | Description                          |
| ------------- | ---------- | ------------------------------------ |
| id            | **STRING** | ID of the Resource                   |
| name          | **STRING** | Name of the Resource                 |
| technology    | **STRING** | Technology of the Resource           |
| hostname      | **STRING** | Hostname of the Resource             |
| hostname_name | **STRING** | Name of the Hostname of the Resource |
| environment   | **STRING** | Environment of the Resource          |
| port          | **STRING** | Port of the Resource                 |

### Column object

| Value        | Type                  | Description                                  |
| ------------ | --------------------- | -------------------------------------------- |
| name         | **STRING**            | Name of the column                           |
| data_label   | **STRING**            | Label assigned to the column                 |
| json_path    | **STRING**            | JSON path of the column                      |
| data_type    | **STRING**            | Data type of the column                      |
| value        | **STRING**            | Value of the column                          |
| in_functions | **[]Function Object** | List of functions that the column is used in |

### Function object

| Value      | Type         | Description                                                 |
| ---------- | ------------ | ----------------------------------------------------------- |
| name       | **STRING**   | Name of the function (e.g. `MAX`)                           |
| categories | **[]STRING** | Categories of the function (e.g. `["aggregate", "window"]`) |

Function categories are used to group functions into different categories. The following categories are available: `aggregate`, `bitwise`, `conditional`, `context`, `conversion`, `data_generation`, `date_time`, `differential_privacy`, `encryption`, `file`, `geospatial`, `hash`, `metadata`, `notification`, `numeric`, `scalar`, `semi_structured`, `string_and_binary`, `system`, `table`, `vector_similarity`, `window`.

These categories are inspired by the [Snowflake documentation](https://docs.snowflake.com/en/sql-reference-functions).

### Space object

| Value | Type       | Description       |
| ----- | ---------- | ----------------- |
| name  | **STRING** | Name of the space |
| id    | **STRING** | ID of the space   |

## Native users

You can enforce policies on native users, the user used by the proxy to connect to the underlying resource. For example, here is a policy that allows the connection only if the native user is `reader`:

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

default session := { "action": "block", "type": "block_with_formal_message" }

session := { "action": "allow", "reason": "reader native user" } if {
	input.native_user == "reader"
}
```

## Snowflake resources

You can enforce policies on Snowflake resources based on the role used to connect to the resource.

### Snowflake object

| Value | Type       | Description                                    |
| ----- | ---------- | ---------------------------------------------- |
| role  | **STRING** | Role used to connect to the Snowflake resource |

## SQL resources

Formal can also enforce policies specific to SQL queries.

**SQL Query Object**
| Value | Type | Description |
|----------------|------------|---------------------------|
| query | **STRING** | SQL query |
| statement_type | **STRING** | Type of the SQL statement |
| command_type | **STRING** | Type of the SQL command |
| limit | **INT** | Limit of the SQL query |

## AWS resources

Formal can also enforce policies on specific AWS Resources. These policies can be actively used for the SSH or Kubernetes.

### AWS object

| Value   | Type               | Description                             |
| ------- | ------------------ | --------------------------------------- |
| account | **Account Object** | AWS account                             |
| ecs     | **ECS Object**     | Configuration details for ECS resources |
| ec2     | **EC2 Object**     | Configuration details for EC2 instances |
| eks     | **EKS Object**     | Configuration details for EKS resources |

### ECS object

| Value          | Type       | Description               |
| -------------- | ---------- | ------------------------- |
| cluster_name   | **STRING** | Name of the ECS cluster   |
| service_name   | **STRING** | Name of the ECS service   |
| task_id        | **STRING** | ID of the ECS task        |
| container_name | **STRING** | Name of the ECS container |

### EC2 object

| Value       | Type         | Description                    |
| ----------- | ------------ | ------------------------------ |
| tags        | **[]STRING** | Tags of the EC2 instance       |
| instance_id | **STRING**   | Identifier of the EC2 instance |

### EKS object

| Value         | Type       | Description                                   |
| ------------- | ---------- | --------------------------------------------- |
| cluster\_ arn | **STRING** | Amazon Resource Name (ARN) of the EKS cluster |
| cluster_name  | **STRING** | Name of the EKS cluster                       |

## Device

Formal can also enforce policies on specific device attributes.

<CardWarning>
This feature is only available for devices using the Formal Desktop App.
</CardWarning>

### Device info object

| Value    | Type                     | Description                        |
| -------- | ------------------------ | ---------------------------------- |
| hardware | **Hardware Info Object** | Hardware information of the device |
| software | **Software Info Object** | Software information of the device |

### Hardware info object

| Value                   | Type       | Description                           |
| ----------------------- | ---------- | ------------------------------------- |
| model_name              | **STRING** | Model name of the device              |
| model_identifier        | **STRING** | Model identifier of the device        |
| model_number            | **STRING** | Model number of the device            |
| system_firmware_version | **STRING** | System firmware version of the device |
| os_loader_version       | **STRING** | OS loader version of the device       |
| serial_number           | **STRING** | Serial number of the device           |
| hardware_uuid           | **STRING** | Hardware UUID of the device           |
| provisioning_udid       | **STRING** | Provisioning UDID of the device       |
| activation_lock_status  | **STRING** | Activation lock status of the device  |

### Software info object

| Value                       | Type       | Description                               |
| --------------------------- | ---------- | ----------------------------------------- |
| system_version              | **STRING** | System version of the device              |
| kernel_version              | **STRING** | Kernel version of the device              |
| boot_volume                 | **STRING** | Boot volume of the device                 |
| boot_mode                   | **STRING** | Boot mode of the device                   |
| computer_name               | **STRING** | Computer name of the device               |
| user_name                   | **STRING** | User name of the device                   |
| secure_virtual_memory       | **STRING** | Secure virtual memory of the device       |
| system_integrity_protection | **STRING** | System integrity protection of the device |
| time_since_boot             | **STRING** | Time since boot of the device             |

## Extending policies data

You can extend policies with custom data fetched by your Policy Data Loaders. The data is loaded into the Policy engine resource, accessible with `data`.

Each Policy Data Loader has a _Key_ that you can use to fetch the data in your policies. For example, if you have a Policy Data Loader with the key `my_custom_data`, you can access the data in your policies using `data.my_custom_data`.

Read more about Policy Data Loaders in the [Policy Data Loaders](/settings/policy-data-loaders) documentation.
