---
title: "How to extract user identity from BI applications?"
---

import { Card, CardLink } from '@site/src/components/card/card';

<span className="page-description">Formal gives security and data teams end-to-end visibility on data consumption on BI applications and internal dashboards.</span>

## Overview

Formal ensures accurate user identification by extracting identity information from requests made through BI tools and applications.

 ## How does end-user identity propagation work?
<iframe
  width="100%"
  height="350"
  src="https://www.loom.com/embed/689264c119624711a33dce13a5c4dac7?sid=ae0b71f8-f2eb-4830-84c5-9a8324252662" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
</iframe>

## 2 Different Methods

Formal employs two primary methods for sharing end-user identity:

- **JDBC params**: For tools like Looker or Retool, which open a new SQL connection for each user, Formal configures these tools to pass custom JDBC parameters. The Formal Connector then extracts these parameters when establishing the connection.
- **Extracted comments in SQL queries**:  In tools like Hex or Metabase, queries are augmented with SQL comments. The Formal Connector extracts these comments for use in identity propagation.

## Configuration

<CardLink href="../integrations/BI-apps">
<Card
    title="Configuring BI Applications"
>
    For more information on how to configure your BI applications with Formal, read this documentation.
</Card>
</CardLink>