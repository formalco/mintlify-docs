---
title: "Getting Started with Formal"
slug: /
---

import { CardInfo } from '@site/src/components/card/card';
import { Card, CardList, CardLink } from '@site/src/components/card/card';
import { Diagram } from '@site/src/components/diagram/diagram';

<span className="page-description">What is Formal?</span>

## Introduction

Formal is an AI-powered Privileged Access Management (PAM) solution designed for modern, data-driven organizations. It provides a secure, transparent, and policy-driven way to control how identities (AI agents, users, and machines) interact with sensitive systems such as databases, SSH, Kubernetes clusters, and APIs.

At the heart of Formal is the [Formal Connector](/deploying-a-connector/introduction.md)—a protocol-aware proxy that you deploy within your own network. All requests flow through this Connector, which allows teams to enforce security and compliance policies directly in the data path. Clients talk through the Connector to [access resources](/adding-resource/introduction). Clients talk through the Connector to [access resources](/adding-resource/introduction). 

Using the Control Plane, you gain visibility into the [the requests, responses,](/security/logs.md) and [sessions](/security/sessions) going through the Connector. You can then write [policies](/security/policies/introduction.md) that are evaluated against the traffic going through the Connector to [perform actions](/security/policies/policy-enforcement) against requests, responses, and sessions.

# Examples

You can use Formal to restrict the kinds of SQL queries your engineers can make to your databases while masking and redacting the data as it leaves the DB:

<Diagram diagram={`
sequenceDiagram
    participant Engineer
    participant Formal Connector
    participant PostgreSQL Database

    Engineer->>Formal Connector: SELECT * FROM pii
    Formal Connector->>PostgreSQL Database: SELECT id, email FROM pii limit 5
    PostgreSQL Database-->>Formal Connector: {id: 123, email: "user@example.com"},{id: 456, email: "user2@example.com"}
    Formal Connector-->>Engineer: {id: 123, email: "****@******.com"}
`} />

You could enable local Github MCP servers to make some HTTP requests to the Github API but not others:

<Diagram diagram={`
sequenceDiagram
    participant GitHub MCP Server
    participant Formal Connector
    participant GitHub API

    GitHub MCP Server->>Formal Connector: POST /repos/pulls
    Formal Connector->>GitHub API: POST /repos/pulls
    GitHub API-->>Formal Connector: 201 Created
    Formal Connector-->>GitHub MCP Server: 201 Created

    GitHub MCP Server->>Formal Connector: PUT /repos/pulls/merge
    Formal Connector-->>GitHub MCP Server: 403 Forbidden
`} />

You can monitor SSH sessions to your bastions for anomalous behavior and have Formal automatically classify the risk level:

<Diagram diagram={`
sequenceDiagram
    participant Engineer
    participant Formal Connector
    participant EC2 SSH Bastion
    participant Formal Control Plane

    Engineer->>Formal Connector: Engineer to connect over SSH to "Bastion" EC2
    Formal Connector->>EC2 SSH Bastion: SSH connection allowed, forward connection
    EC2 SSH Bastion-->>Formal Connector: Connected
    Formal Connector-->>Engineer: Connected

    Engineer->>Formal Connector: rm -rf /var/log/*
    par
        Formal Connector->>Formal Control Plane: Session Risk Level: 5
    and
        Formal Connector->>EC2 SSH Bastion: rm -rf /var/log/*
    end
    EC2 SSH Bastion-->>Formal Connector: Command executed
    Formal Connector-->>Engineer: Command executed
`} />

## Get started

<CardList>
<CardLink href="/adding-resource/introduction">
<Card title="Add a Resource">
  Connect your first database to Formal in less than five minutes.
</Card>
</CardLink>
<CardLink href="/deploying-a-connector/introduction">
<Card title="Deploy a Connector">
  Deploy your first Connector and start streamlining access to your databases right away.
</Card>
</CardLink>
</CardList>

## Using this documentation

We’ve prepared these materials to help engineering, security, and data teams get started in 10 minutes with Formal. The different sections are here to guide you every step of the way and make your onboarding as smooth as possible.

If you have any questions or if anything appears unclear, don’t hesitate to reach out to Formal's support via email at support@joinformal.com.
