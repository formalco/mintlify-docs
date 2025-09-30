---
title: "Connector Changelog"
toc_min_heading_level: 2
toc_max_heading_level: 2
---

# Changelog

## 1.25.x

### 1.25.7 (2025-08-18)

**Fixed**
- Fixed a bug in the TLS certificate renewal process.

### 1.25.6 (2025-08-16)

**Changed**
- Streamline TLS certificate handling at connector startup.

### 1.25.5 (2025-08-16)
    
**Fixed**
- Fixed a bug that would prevent connector TLS certificates from being updated on renewal unless the connector is restarted.

### 1.25.4 (2025-08-14)

**New** 
- Enabling satellite hostnames linked to a Connector to be configured from the Control Plane and read by the Connector.
- Add 'ConnectorName' attribute for better tracking and logging during telemetry operations.

### 1.25.3 (2025-08-14)

**Changed**
- Remove a specific MongoDB configuration created for a legacy client, streamlining the process for connecting to DocDB with client-side options.
    
### 1.25.1 (2025-08-13)

**New**
- Introduce metrics to monitor opened, closed, and currently active connections, enhancing visibility into connection management for performance optimization and troubleshooting.
- Implement new metrics to monitor the number of received control plane pings, increasing observability of system interactions and aiding in performance monitoring and debugging.

**Fixed**
- Fix some errors with S3 authentication.

### 1.25.0 (2025-08-13)

**New**

- Regularly send connector instance heartbeat as a gauge metric via OpenTelemetry, bolstering real-time monitoring capabilities.
- Default to starting up etcd without failing if the etcd cluster doesn't come up.

**Changed**

- Cleaned up configuration and feature flag storage.

## 1.24.x

### 1.24.12 (2025-08-05)

**Changed**
- Remove unnecessary quotes from table names when parsing SQL queries to make policies easier to write.

## 1.24.x

### 1.24.11 (2025-08-02)

**Changed**
- Move classifier-related environment variables into the new `formal_resource_classifier_configuration` Control Plane objects.

### 1.24.10 (2025-08-01)

**Fixed**
- Fix column detection issues with parsing UNION statements with wildcards within Common Table Expressions (CTEs).

### 1.24.9 (2025-07-30)

**Changed**
- Enhance logging to include connector ID, improving traceability for debugging and monitoring purposes.

### 1.24.8 (2025-07-29)

**Fixed**
- Resolve connection issues in the MySQL proxy that were caused by handshake problems with MariaDB.

### 1.24.7 (2025-07-28)

**New**
- Enable automatic connection to the first task's first container within a specified ECS service when no specific task or container is selected, streamlining the connection process and reducing errors.

**Changed**
- Simplify S3 connection establishment.

### 1.24.6 (2025-07-25)

**Fixed**
- Resolve issue with Snowflake private key authentication for enhanced connection security.

**Changed**
- Remove unused PII_SAMPLING_RATE ensuring cleaner code base and improved performance.

**New**
- Include desktop app device trust keys in critical data load process for strengthened data security.

### 1.24.5 (2025-07-25)

**Fixed**
- Improved robustness of desktop app device trust keys.

### 1.24.4 (2025-07-25)

**Changed**
- Improve logging around device trust signature verification errors.

### 1.24.3 (2025-07-25)

**New**
- Add stateless authentication support for Clickhouse.

**Fixed**
- Fix the parsing of device info to ensure accurate timestamping in UTC.

### 1.24.2 (2025-07-24)

**Changed**
- Reduce wait time for PROXY protocol headers from 10 seconds to 200 milliseconds, enhancing performance and speeding up the handling of new connections that don't use PROXY.

**Fixed**
- Fix MySQL column detection and data label matching for policies.

### 1.24.1 (2025-07-23)

**New**
- Implement stateless authentication for Snowflake.

### 1.24.0 (2025-07-22)

**New**
- Introduce stateless JWT authentication for Kubernetes, PostgreSQL, HTTP, and SSH, enhancing security and streamlining user verification process.


## 1.23.x

### 1.23.6 (2025-07-22)

**Fixed**
- Improve reliability for MySQL resources.

### 1.23.2 (2025-07-22)

**Changed**
- Enhance MySQL error messages for better readability, making it easier to diagnose issues during the handshake process.

### 1.23.1 (2025-07-21)

**New**
- Add support for hashed token authentication for Postgres proxy, providing a new option for users facing length restrictions on database passwords.


### 1.23.0 (2025-07-21)

**New**
- Add support for SSH private key authentication to upstream, enhancing secure connection options.

**Changed**
- Update MySQL to utilize our unified SQL semantic analyzer, ensuring consistent behavior across both databases.
- Enable port fields in resources to be updated for more flexible configurations.


## 1.22.x

### 1.22.2 (2025-07-18)

**New**
- Introduce a readiness endpoint for the connector (on health check port 8080 `/ready`), allowing it to signify when all listeners are initialized and ready to receive traffic.

**Changed**
- Achieve consistency in logging and assertion libraries across the system, improving reliability of error logging and assertions.

### 1.22.1 (2025-07-16)

**New**
- Add support for handling Snowflake positional reference syntax in SQL queries
- Introduce capability to resolve Snowflake positional arguments based on actual column names from inventory
- Extend support for LATERAL queries, enabling more complex SQL queries that depend on preceding tables’ columns.

**Fixed**
- Resolve possible crash when retrieving outbound IP in telemetry, improving stability.

**Changed**
- Streamline MySQL TLS environment variables into a centralized TLS config, enhancing setup simplicity.
- Dropped ability of the connector to exit if a health check fails, boosting connector resilience.

### 1.22.0 (2025-07-02)

**New**

- Refactor log encryption configuration and improve encryption of exec streams (i.e., SSH, SSM, Kubernetes). This version also removes the ability to configure log encryption and encryption keys via environment variables (**breaking change**); such configuration will need to be done on the control plane via the frontend or Terraform provider.


## 1.21.x

### 1.21.7 (2025-06-30)

**Fixed**
- Fix support for binary operations in SQL queries.

### 1.21.6 (2025-06-26)

**Fixed**
- Improve log handling for HTTP request/response encryption.

### 1.21.3 (2025-06-24)

**Changed**
- Improves reliability of connector resource access updates.

### 1.21.2 (2025-06-23)

**Fixed**
- Ensure connector is always properly initialized to prevent potential runtime errors and improve stability.

### 1.21.1 (2025-06-23)

**Fixed**
- Address an issue in our observability stack that could cause the connector to crash, enhancing system stability.

### 1.21.0 (2025-06-23)

**New**
- Implement key pair authentication for Snowflake connections.

**Changed**
- Connector healthcheck always runs on port 8080, simplifying network configuration requirements for users.


## 1.19.x

### 1.19.1 (2025-06-11)

**Changed**
- Allow specifying KMS log encryption keys as ARNs rather than key IDs, allowing keys in other accounts to be used.

### 1.19.0 (2025-06-10)

**Changed**
- Enhance secure connections with centralized TLS configuration across multiple resources including Postgres, MongoDB, S3, Kubernetes, HTTP, gRPC, Clickhouse, and Salesforce. This update improves security by standardizing the TLS configuration and making it easier to establish secure sessions.


## 1.18.x

### 1.18.8 (2025-06-09)

**Fixed**

- Log handling improvements.

### 1.18.7 (2025-06-09)

**New**
- Enable control plane-configured TLS settings for gRPC and Snowflake connectors. Per-resource TLS configuration is now available for all connector technologies and the `SERVER_CONNECT_TLS` environment variable is treated as a fallback.

**Fixed**
- Fixed a bug where HTTP policy evaluation logs were not getting sent if the result of the policy evaluation was to block the request.

### 1.18.6 (2025-06-02)

**New**
- Add support for SHA256 authentication in MySQL, enhancing data security through stronger encryption.

### 1.18.5 (2025-06-02)

**Fixed**
- Fixed an issue with HTTP request policy evaluation.

### 1.18.4 (2025-06-02)

**Fixed**
- Resolved a parsing error with nested SQL "set operations", improving support for complex queries.
- Fixed an issue with JSON handling in the Snowflake connector.

### 1.18.3 (2025-06-02)

**Changed**
- Enhanced NLP performance through improved parallelism, resulting in faster data classification and analytics.

### 1.18.2 (2025-05-29)

**Fixed**
- Fix issue causing improper logs within the MongoDB connector, leading to improved troubleshooting and clearer log information.

### 1.18.1 (2025-05-29)

**Changed**
- Increase HTTP blob size limit to 16MB for sending to the data classifier satellite.

### 1.18.0 (2025-05-29)

**New**
- Implement Snowflake query rewriting.

**Fixed**
- Enhance SQL parser capabilities regarding query-masking with better management of complex SQL statements.

**Changed**
- Improve password redaction logic, ensuring the return of the exact original query when no password is found.


## 1.17.x

### 1.17.2 (2025-05-24)

**Changed**
- Adjusted some log statements to debug level to reduce verbosity in the default log output.

### 1.17.1 (2025-05-23)

**Fixed**
- Resolve issue of interrupted sessions not closing properly, ensuring more consistent session behavior.

### 1.17.0 (2025-05-20)

**Changed**
- AWS autodiscovery is now [performed](/integrations/cloud/aws) by the control plane and the SSH resource selection UI has been [moved](../desktop-app/usage) to the desktop app.


## 1.16.x

### 1.16.4 (2025-05-20)

**Changed**
- Update Snowflake sessions to default to 'PUBLIC' schema when no schema is presented, allowing for smoother query execution especially for new sessions or during periods of inactivity. The error response in such situations has been removed.

### 1.16.3 (2025-05-19)

**Changed**
- Simplify requirements for ECS command, enhancing ease of use and reducing complexity.

### 1.16.2 (2025-05-16)

**Fixed**
- Provide more informative error message when querying without a current schema, but only for queries including source tables. This prevents confusion and improves user interactions during database operations.

### 1.16.1 (2025-05-16)

**Fixed**
- Update Snowflake schema detection so Metabase can connect through Formal.

### 1.16.0 (2025-05-16)

**New**
- Enable discovery of ECS containers from the control plane, enhancing user configuration experience for connections via SSH/SSM to ECS containers.

**Changed**
- Upgrade SQL semantic analyzer capabilities, improving overall data processing performance and capability.
- Enhance Snowflake support and integrate the upgraded SQL semantic analyzer.


## 1.15.x

### 1.15.9 (2025-05-15)

**Fixed**
- Ensure Formal-specific Postgres connection options don't get sent to the resource, which fixes some connection errors.

### 1.15.8 (2025-05-14)

**Fixed**
- Ensure control plane data loading does not exit prematurely, guaranteeing that the connector has the latest state for critical data like group membership and policies every 3 seconds.

### 1.15.7 (2025-05-06)

**New**
- Add 'Reduce Decimal Precision' masking option, allowing users to specify the precision level of decimal values, further enhancing data masking capabilities.

### 1.15.6 (2025-05-05)

**New**
- Add support for end user identity propagation in HTTP requests, enhancing system's session management and logging capabilities.

### 1.15.5 (2025-04-23)

**New**
- Add the ability to collect EC2 instance tags even when auto-discovery is not enabled, providing more comprehensive and flexible log and monitoring features.

**Changed**
- Enable Stateless Auth for HTTP, simplifying overall authentication process, enhancing ease of access, and speed of data retrieval.

### 1.15.4 (2025-04-17)

**Fixed**
- Modify handling of tag retrieval errors to prevent the entire connection from failing, enhancing the robustness and resilience of the application. Errors are now logged and an empty set of tags is returned, allowing the application to continue functioning while providing informative error report.

### 1.15.3 (2025-04-09)

**Fixed**
- Improve authorization handling for human users.
- Update ECS task logs to include task tags, enhancing traceability and debugging capabilities.
- Adjust the ECS command to dynamically set the region in the configuration, optimizing task management efficiency.


## 1.14.x

### 1.14.9 (2025-04-07)

**Changed**
- Extend the timeout period for inventory operations, enhancing operational stability and handling of large inventories.

**New**
- Introduce support for API keys for machine users, enhancing security and facilitating automated workflows.

### 1.14.8 (2025-04-01)

**Fixed**
- Improve reliability of the SSH Connector's dry-run policies for consistent policy enforcement.

### 1.14.7 (2025-03-29)

**New**
- Add a feature to pull critical latency data, enhancing real-time performance monitoring.
- Introduce the ability to pass ECS task tags as input to the policy engine, enabling more refined access control based on specific ECS task tags.

**Changed**
- Enable log level to be overridden using an environment variable, providing more flexibility in controlling the verbosity of logs.

### 1.14.6 (2025-03-26)

**New**
- Add capability to use ECS task tags as input for the policy engine, allowing more granular control over access policies. This feature enhances the security by enabling new policy conditions based on ECS task attributes.


### 1.14.5 (2025-03-24)

**New**

- Add support for fluentd


### 1.14.4 (2025-03-20)

**New**

- Remove sensitive headers from the logs sent to the Control Plane.


### 1.14.3 (2025-03-17)

**New**

- Remove sensitive headers from the logs sent to the Control Plane.

### 1.14.2 (2025-03-14)

**New**

- Upgrade go runtime to latest version

### 1.14.1 (2025-03-14)

**New**

- Log the updates received from the Control Plane.

### 1.14.0 (2025-03-13)

**New**

- Add evaluation logs for SSH policy checks, allowing for better tracking of policy enforcement decisions.


## 1.13.x

### 1.13.13 (2025-03-12)

**Fixed**

- Do not distribute state that can be cached locally to improve reliability.

### 1.13.12 (2025-03-11)

**Fixed**

- Fix the connector health check.

### 1.13.11 (2025-03-11)

**Fixed**

- Resolve an issue with alias masking when the same column is queried twice.

### 1.13.10 (2025-03-11)

**Fixed**

- Fix our SQL parser, that could cause errors for BigQuery queries on table names that contain both hyphens and numbers.

### 1.13.9 (2025-03-08)

**Fixed**

- Make sure the EKS IAM tokens are always valid and refreshed on time.

### 1.13.8 (2025-03-07)

**Changed**

- Make PII classifier headers more granular. Changes `X-Formal-Pii-Classifier` to `X-Formal-Request-Pii-Classifier` and `X-Formal-Response-Pii-Classifier` that dictate classifier behavior for requests and responses, respectively.

### 1.13.7 (2025-03-06)

**Fixed**

- Fix a bug with the `X-Formal-PII-Classifier` header when trying to mask responses.

### 1.13.6 (2025-03-06)

**Fixed**

- Fix response messages for incorrect NLP/LLM header selection.

### 1.13.5 (2025-03-05)

**Fixed**

- Make sure we log the satellite version and id when handling its responses.

### 1.13.4 (2025-02-28)

**Fixed**

- Fix edge case with GCP IAM authentication on PostgreSQL.

### 1.13.3 (2025-02-27)

**New**

- Add a warning log when Kubernetes Resources are not using the expected protocol (HTTP vs HTTPS).

**Fixed**

- Make sure the Connector can start without a remote configuration.
- Address an issue regarding BigQuery sessions that could stay alive.

### 1.13.2 (2025-02-27)

**Fixed**

- Fix a panic in the Policy engine when parsing results.

### 1.13.1 (2025-02-20)

**New**

- Allow HTTP proxy clients to select PII classifier type with the `X-Formal-PII-Classifier` header.

### 1.13.0 (2025-02-20)

**New**

- Enable connection shutdown directly from the Formal Control Plane.

**Fixed**

- Fix encryption with random keys in the masking process.


## 1.12.x

### 1.12.44 (2025-02-20)

**Fixed**

- Fix response start time in HTTP logs.

### 1.12.41 (2025-02-12)

**Fixed**

- Handle query alias original column names in the Connector SQL parser.
- Remove unneeded logs from the analyzer.

### 1.12.40 (2025-02-12)

**New**

- Enable direct connections to EC2 instances when autodiscovery is disabled, enhancing flexibility when interacting with EC2 resources.

### 1.12.39 (2025-02-06)

**Changed**

- Begin the process of deprecating SSH auto discovery, anticipating future updates to the platform's security.
- Enhance the reliability of DSPM workflows, promoting increased stability and accuracy in data discoveries.

### 1.12.38 (2025-02-07)

**Changed**

- Lower OAuth scope required for BigQuery operations, enhancing security by granting only necessary permissions.
- Update logging behavior to reduce frequency of connection-related error reports, making critical issues easier to identify in logs.

**Fixed**

- Address issue where EOF errors were not being properly handled, improving overall error management.

### 1.12.37 (2025-02-06)

**New**

- Add support for masking policies on columns that share the same path in Snowflake.

**Changed**

- Remove on-the-fly discovery for PostgreSQL.

### 1.12.35 (2025-02-04)

**Fixed**

- Resolve an issue causing the server to crash when a connector lacks a hostname. This adjustment enhances the system robustness, allowing for the handling of connector instances without specified hostnames without incurring errors.

### 1.12.34 (2025-02-01)

**New**

- Enable TCP/IP forwarding over SSH using SSM remotes, introducing a new command-line flag in the ECS command for more connectivity options. Users can now connect to remote services securely using TCP/IP port forwarding via SSM. Additionally, the ECS command allows for greater configurability through new flags and .

- Enhancements to the logging mechanism within the AWS RDS authentication process. Debug-level logs now capture successful AWS RDS auth token generation, and unnecessary info-level logs are reduced for a cleaner logging environment.

- Error handling functionality enhanced for HTTP requests querying non-existing resources. An HTTP 500 status response is now returned when an HTTP resource isn't found, along with a descriptive error message in the response body.

**Fixed**

- Several silent failures solved within the handling of SSH connections and port forwarding. The modifications guarantee more robust logging mechanisms which offer better visibility into connection states and errors and ensure that required command-line arguments in the ECS command are validated correctly.

- Addressed the issue of excessive logging within the AWS RDS authentication process. The revision ensures that only essential information is logged at the info level, with non-critical messages now logged at debug level.

- Improved handling of errors when querying non-existing HTTP resources. Logging has been enhanced to better capture errors encountered during data retrieval, ensuring appropriate HTTP responses are returned to the client.

**Changed**

- Updated the to include the arguments for runtime ID and shell. Enhanced the handling of direct TCP/IP connections by differentiating between SSM connectables and remote SSH clients, allowing for a more robust connection process.

- Modified logging levels for specific messages during the AWS RDS auth token generation process, enhancing the overall logging strategy with the information related to token generation now logged at the debug level.

- The HTTP response mechanism now returns a specific 500 Internal Server Error, instead of a generic error when a resource isn't found. The error message has been enhanced to provide specific feedback regarding the missing resource.

### 1.12.18 (2025-01-12)

- Increase retry time window for `ssh`

### 1.12.17 (2025-01-07)

- Add support for snowflake-python-connector
- Various improvements for `postgres` smart routing

### 1.12.15 (2024-12-27)

- Support `SCRAM-SHA-256` with stateless auth

### 1.12.14 (2024-12-26)

- Enable stateless auth without tls
- Add `EXIT_IF_DISTRIBUTED_STATE_INIT_FAILED`

### 1.12.13 (2024-12-18)

- Add `--healthcheck` to be able to run healthcheck from within the docker image

### 1.12.12 (2024-12-17)

- Enable stateless auth for AWS IAM

### 1.12.11 (2024-12-14)

- Handle gss correctly for psql

### 1.12.10 (2024-12-13)

- Improve parsing of column's aliases for `snowflake`

### 1.12.9 (2024-12-12)

- Improve query parsing for `snowflake`

### 1.12.8 (2024-12-11)

- Redact passwords in `postgres` and `redshift` queries

### 1.12.7 (2024-12-11)

- Add support for resource hostname

### 1.12.6 (2024-12-09)

- Add support for env vars to native users' username

### 1.12.5 (2024-12-08)

- Allow native to be linked to a resource_hostname

### 1.12.4 (2024-12-05)

- Add process PID from PG to log object
- Fix arrow conversion rounding for `snowflake`

### 1.12.2 (2024-12-05)

- Add support for basic auth for `clickhouse`

### 1.12.1 (2024-12-05)

- Add support for `dbname@resource_name@extra-hostname` for `postgres`
- Add basic `redis` support

### 1.12.0 (2024-11-20)

- Implement RDS autodiscovery for `postgres`


## 1.11.x

### 1.11.10 (2024-11-13)

- Improve logging
- Fix SSO for `snowflake`

### 1.11.7 (2024-11-08)

- Support nested JSON for `snowflake`

### 1.11.6 (2024-11-07)

- Ensure proper JSON structure in rowset of account for `snowflake`

### 1.11.5 (2024-11-06)

- Add support for assuming AWS IAM Role with AWS RDS IAM

### 1.11.4 (2024-11-06)

- Add support for JSON in `snowflake`

### 1.11.3 (2024-11-05)

- Support query with more than 1 statement in `snowflake`

### 1.11.2 (2024-11-01)

- Various reliability improvements related to the distributes state

### 1.11.1 (2024-10-31)

- Add support for `DISABLE_DISTRIBUTED_STATE`

### 1.11.0 (2024-10-30)

- Add `STRICT_DATA_CLASSIFIER_SATELLITE_RESULTS` for http
- Add distributed state
