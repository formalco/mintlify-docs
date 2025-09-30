---
title: "Using the Formal Desktop CLI"
---

import { CardInfo } from '@site/src/components/card/card';

<span className="page-description">Commands available on Formal Desktop App installed outside of the App Store.</span>

## CLI Commands

Generally the commands will have this format
```sh
formal COMMAND SUBCOMMAND [--options and parameters]
```

## Get version
```sh
formal --v
```
## Get help

To list down the commands with the details
```sh
formal help
```

Get help for the command
```sh
formal COMMAND help
```

Get help for the subcommand
```sh
formal COMMAND SUBCOMMAND help
```

## Authentication

To do all authentication related operations like login, logout, get credentials, etc. Run this command:
```sh
formal auth login
```

## Retrieve your Formal Credentials

To retrieve your Formal credentials (username and password), run this command:
```sh
formal auth credentials
```

## App Status

To get Formal Desktop App status
```sh
formal status
```

## List Resources

To list all the Resources in your organization
```sh
formal ls
```

You can also interact with the result by these commands:
`↑/k up • ↓/j down • enter choose • / filter • q quit • ? more`

When pressing enter to the Resource, you will either create a localhost connection with the Resource (for MySQL, Postgres, Redshift, and MongoDB resources) or configure the relevant client (e.g., `~/.kube/config`, `~/.ssh/config`) to connect via a deployed Connector (for Kubernetes and SSH resources, including EC2 instances and ECS containers).

This UI will list ECS containers as long as:

* The ECS cluster has been configured or promoted as a first-class Formal Resource, and
* ECS autodiscovery is configured using [the CloudFormation stack integration](/integrations/cloud/aws) and the relevant cross-account IAM permissions have been granted to Formal.

## Connect to a Resource

To create a localhost connection with the Resource
```sh
formal connect [resource-name]
```

## Access a Resource

Once connected to a Resource, you can access it on localhost and the port returned by the 'formal connect' command.

For example, for Postgres, you can use
```sh
psql -h localhost -p 6432
```
to connect to the database. Formal will automatically inject your credentials.

Note: Use
```sh
psql -h localhost -p 6432 -U formal@<native-user>
```
to specify the native user you wish to use.


## Disconnect from a Resource

To remove a localhost connection with the Resource
```sh
formal disconnect [resource-name]
```

## SSH

To connect to a machine over SSH
```sh
formal ssh --sidecar-name [connector-name]
```

**Options:**
- sidecar-name
- sidecar-hostname
- command

## Interact with Formal Policy Engine

To interact with Formal's policy engine
<!-- cSpell:ignore gvly -->
```sh
formal policy evaluate \
--inputs "{\"user_id\":\"QWq4BHscECW3gbmX5gvlyJZHifU2\"}" \
-r session
```

## Decrypt data

To decrypt data that has been encrypted by Formal
```sh
formal decrypt --ciphertext [encrypted text]
```

Encrypted text is divided by semicolon (:), like the example below:

`formalencrypt:second:third:fourth:fifth`

## AWS S3

To interact with AWS S3
```sh
formal s3 [sidecar-name] [s3 command]
```

<CardInfo> [List of s3 commands](https://docs.aws.amazon.com/cli/latest/userguide/cli-services-s3-commands.html) available</CardInfo>
