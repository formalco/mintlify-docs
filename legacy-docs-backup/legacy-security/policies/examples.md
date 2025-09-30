---
title: "Examples"
---

import { CardInfo, CardWarning } from '@site/src/components/card/card';

<span className="page-description">Common policy examples and use cases</span>

This page provides examples of common policy scenarios you might want to implement in Formal. Each example includes the policy code and an explanation of how it works.

## Scenario – Redact emails on Snowflake

Let's say we want to redact all email columns that come back from our Snowflake database. As you will see, we are going to do this with multiple policies. The main reason is that a single policy can only return one `pre_request` or `post_request` stage at a time. Additionally, using separate policies allows for customized notification settings per policy.

### Policy 1 – Mask emails

Let's start by writing our first policy that will mask email columns.

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

# Helper function to check if column is in a function
in_function(column) {
  column.in_functions != null
}

# Mask emails
post_request := {
  "action": "mask",
  "type": "redact.partial",
  "sub_type": "email_mask_username",
  "columns": columns,
  "typesafe": "fallback_to_default"
} if {
  columns := [column |
    column := input.columns[_];
    column.data_label == "email_address"
    not in_function(column)
  ]
  columns != []
}
```

But there's a catch: we don't want to try redacting email addresses that went through functions (e.g., `CONCAT`), because we can't guarantee the output format. Let's write a second policy to handle this.

### Policy 2 – Hash function outputs

Here is a policy that will hash email columns that have been through a function, unless that function was an aggregate.

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

# Helper function to check if column is in a function
in_function(column) {
  column.in_functions != null
}

# Helper function to check if any function has the "aggregate" category
# and does not have the "semi_structured" category
in_aggregate(column) {
  some func in column.in_functions
  "aggregate" in func.categories
  not "semi_structured" in func.categories
}

# Hash emails that went through a function, unless it was an aggregate
post_request := {
  "action": "mask",
  "type": "hash.no_salt",
  "columns": columns,
  "typesafe": "fallback_to_default"
} if {
  columns := [column |
    column := input.columns[_];
    column.data_label == "email_address"
    in_function(column)
    not in_aggregate(column)
  ]
  columns != []
}
```

We're excluding "semi_structured" functions (functions for semi-structured and structured data) here because something like `ARRAY_AGG` in Snowflake would allow someone to view the emails.

### Policy 3 – Block queries that may try to escape our masking

What if an attacker tries to bypass our masking policy with advanced Snowflake features? Let's block the query if we detect them.

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

# Block queries that may try to escape our masking
pre_request := {
  "action": "block",
  "type": "block_with_formal_message",
} if {
  forbidden_substrings = [
    "CREATE", "SYSTEM$", "IDENTIFIER", "RESULT_SCAN", "PROCEDURE",
    "CLONE", "LATERAL", "REPLACE", "RENAME", "PIVOT", "RECURSIVE"
  ]
  some substring in forbidden_substrings
  contains(input.sql_query.query, substring)
}
```

Note that we're not using `post_request` anymore, but `pre_request`: we want the request to be blocked before it's executed.

<CardInfo>Alternatively, we could have blocked `CREATE` queries by using `input.sql_query.statement_type` in another policy.</CardInfo>

## Best Practices

As you can see with this example, policies can quickly get quite extensive. When creating policies, keep these best practices in mind:

1. Use the correct package name (`formal.v2` for data policies, `formal.app` for permissions).
2. Import required keywords (`future.keywords.if`, `future.keywords.in`).
3. Use `session`, `pre_request`, and `post_request` stages accordingly.
4. Test policies before deploying to production by using the **Dry-run** status.
5. Inspect the `policies_evaluation` field of your logs to understand what's happening under the hood!

For more information about policy evaluation and available input objects, see the [Policy Evaluation](./policy-evaluation.md) page.

<CardInfo>We recommend that you write and version your policies in git, and deploy them with Terraform using our provider.</CardInfo>
