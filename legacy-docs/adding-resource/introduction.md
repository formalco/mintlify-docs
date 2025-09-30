---
title: "Introduction"
---

import { CardInfo } from '@site/src/components/card/card';

<span className="page-description">Adding a Formal Resource</span>

## Add a new Resource

The first thing when deploying Formal is to create a Resource in the console.

1. Navigate to the Resources app in the menu and click the `New Resource` button.
2. Fill in the relevant connection details according to the desired Resource type.

For PostgreSQL, MySQL, Redshift, MariaDB, MongoDB, HTTP, & SSH, you'll need: - Database host URL - Database port

For Snowflake, S3, you'll need: - Database host URL

You'll also be able to select a Space. A Space is a collection of Connectors, Satellites, and Resources that can access each other. This is useful if you want to segment access or create a logical grouping that replicates your internal connectivity patterns.

<CardInfo>
When you create anything in Formal, you can enable *Termination Protection* to prevent accidental deletions. Enable it if you want to ensure that the Resource is not deleted by mistake.
</CardInfo>
