---
title: "Desktop App Changelog"
---

# Changelog

## 0.2.1 (2025-08-14)

- Fixed a visual bug with the `formal ls` UI where a resource would not update its status after a connection request.

## 0.2.0 (2025-08-14)

- Added the ability to open an SSH session automatically when connecting to an SSH resource through `formal ls`.

## 0.1.4 (2025-08-01)

- Added support for Linux.

## 0.1.0 (2025-05-20)

- Add support for configuring the SSH client (i.e., `~/.ssh/config`) to more seamlessly connect to SSH, EC2, and ECS Fargate resources using the `formal ls` UI.

## 0.0.91 (2025-04-24)

- Fix versioning issue

## 0.0.90 (2025-03-27)

- Fix versioning issue

## 0.0.89 (2025-03-27)

- Add a link to download the latest version of the desktop app if an update is available.

## 0.0.88 (2025-03-27)

- Ensure errors are printed to `stderr` rather than `stdout` to provide a clean output stream to users.

## 0.0.87 (2025-03-24)

- Expose certain classes of connection errors between the local proxy and the Formal Connector to users.

## 0.0.86 (2025-02-25)

- Fixed authentication failures

## 0.0.85 (2025-01-30)

- Add support for using `formal@<native-user>` as the username to specify the native user.

## 0.0.84 (2025-01-22)

- Add support for `json` option to `formal auth credentials -o`

## 0.0.83 (2025-01-22)

- Add support for `json` option to `formal auth credentials -o`

## 0.0.82 (2025-01-08)

- Avoid crashing on EOF for `postgres`

## 0.0.81 (2025-01-08)

- Fix desktop app auth status

## 0.0.80 (2024-10-17)

- Fix desktop app auth status

## 0.0.79 (2024-10-16)

- Add support for mongodb smart routing

## 0.0.78 (2024-10-12)

- Fix typo in error message `missing S3 resource name`

## 0.0.77 (2024-10-09)

- Add support for TCP Proxy and Relays

## 0.0.75 (2024-10-01)

- Remove the use of aws profile

## 0.0.74 (2024-09-30)

- Remove the use of aws profile

## 0.0.73 (2024-09-30)

- Add more efficient routing

## 0.0.72 (2024-09-30)

- Fix support for `dynamodb`

## 0.0.71 (2024-09-26)

-  Add resource subdomain to Kubernetes resources for connectors

## 0.0.70 (2024-09-18)

- Add support for connectors

## 0.0.69 (2024-12-05)

- Add support for basic auth for `clickhouse`

## 0.0.68 (2024-09-16)

- Add resource to policy evaluation

## 0.0.67 (2024-09-14)

- Update desktop app to renew key every 18 hours

## 0.0.66 (2024-08-14)

- Add support for connector in policy evaluation

## 0.0.65 (2024-08-14)

- Update log message for fetchCABundle

## 0.0.64 (2024-08-14)

- Add more logs to the `dynamodb` command

## 0.0.63 (2024-11-06)

- Remove posthog

## 0.0.62 (2024-11-06)

- Fix aws CLI

## 0.0.61 (2024-08-09)

- Fix aws CLI

## 0.0.60 (2024-08-09)

- Add AWS CLI to building process

## 0.0.59 (2024-08-08)

- Add support for certificate bundle `dynamodb`

## 0.0.58 (2024-08-02)

- Add support for API Token expiration
