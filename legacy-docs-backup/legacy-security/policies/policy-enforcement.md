---
title: "Policy Enforcement"
---

import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">What kind of enforcement does policies support?</span>

## Enforcement actions

Multiple enforcement actions are available with Formal, `block`, `allow`, `filter`, `decrypt` and `mask`.

To enforce an action you need to assign an action object to each rule.

Some parameters of the action objects are common to each rule others are specific to some actions.

### Common parameters

| Value           | Type       | Description                                                                                                                                                                                                                                                    |
| --------------- | ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| action          | **STRING** | This is the action enforced. It can be either `allow`, `block`, `filter`, `decrypt`, `rewrite`, `mask`, or `mfa`.                                                                                                                                              |
| reason          | **STRING** | You can return a `reason`, this is useful for compliance as the reason will be included in the audit in logs if the policy is triggered.                                                                                                                       |
| contextual_data | **STRING** | You have the ability to return contextual data that was instrumental in the policy decision, such as open Zendesk tickets. This feature is particularly valuable for compliance purposes, as it ensures that the relevant information is included in the logs. |

### Block Action

#### Returned parameters

| Value   | Type       | Description                                                                                              |
| ------- | ---------- | -------------------------------------------------------------------------------------------------------- |
| type    | **ENUM**   | There are three possible values `block_with_formal_message`, `block_with_fake_error` or `block_silently` |
| message | **STRING** | Message to send back to the user.                                                                        |

#### Example

```rego
package formal.v2

default session := {
    "action": "block",
    "type": "block_with_formal_message",
    "reason": "we block every connections"
}
```

### Allow Action

Allow action is useful to explicitly allow a user to do a certain type of action. Allow action is the negation of the block and filter action. It can be used in combination with a default rule.

#### Returned parameters

The allow action does not require returning specific parameters.

#### Example

```rego
package formal.v2

default session := {
    "action": "allow",
    "reason": "we allow every connections",
    "contextual_data": "some data"
}
```

### Filter Action

You can use the filter action to filter data sent back to the client.

#### Returned parameters

The allow action does not require returning specific parameters.

#### Example (filtering if no Zendesk ticket open for given row)

```rego
package formal.v2

import future.keywords.if

default post_request := {"action": "filter", "reason": "No tickets are open for the given row"}

post_request := {"action": "allow", "contextual_data": filteredTickets, "reason": "At least one ticket is open for the given row"} if {
    col := input.row[_]; col["path"] == "main.public.pii.email"
    filteredTickets := [obj | obj := data.tickets[_]; obj.requester_email == col.value]
    count(filteredTickets) > 0
}
```

### Masking Action

#### Returned parameters

| Value             | Type         | Description                                                                                                                                         |
| ----------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| type              | **STRING**   | Type of masking. (e.g.: `redact.partial`).                                                                                                          |
| sub_type          | **STRING**   | The subtype. (e.g.: `email_mask_username` or `phone_mask_with_fake`).                                                                               |
| typesafe          | **BOOLEAN**  | Sometimes masking can alter the type of the returned column. When set to `true`, masking will maintain the same type. The default value is `false`. |
| typesafe_fallback | **STRING**   | Value can be `fallback_to_null` or `fallback_to_default`.                                                                                           |
| redact            | **STRING**   | Value to use for redaction.                                                                                                                         |
| columns           | **[]COLUMN** | List of columns to be masked.                                                                                                                       |
| characters_count  | **INTEGER**  | Number of characters to mask.                                                                                                                       |

#### Masking types available

Various masking capabilities are available, each offering a different level of obfuscation. The levels of privacy vary, with 0 representing the lowest and 4 representing the highest level of privacy.

| Type                       | Level | Description                                                         |
| -------------------------- | ----- | ------------------------------------------------------------------- |
| nullify                    | **4** | Set the value to null.                                              |
| hash.with_salt             | **4** | Hash with a random salt.                                            |
| fake                       | **3** | Generate fake data; this works in combination with a `sub_type`.    |
| redact.constant_characters | **3** | Redact with a suite of constant characters.                         |
| hash.no_salt               | **2** | Hash without salt.                                                  |
| redact.partial             | **1** | Redact data partially; this works in combination with a `sub_type`. |
| none                       | **0** | Does not mask the value.                                            |

#### Masking subtypes available

| Subtype                                   | Description                                                                                           |
| ----------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| encrypt                                   | Encrypt the value                                                                                     |
| hash.with_salt                            | Hash the value with a random salt                                                                     |
| redact.constant_characters                | Replace the value with the content of the `redact` field                                              |
| hash.no_salt                              | Hash the value without salt                                                                           |
| replace_characters_with                   | Replace characters with character from the the `redact` field                                         |
| mask_everything_except_last               | Mask everything except the last characters using the content of the `redact` field                    |
| email_mask_username                       | Mask the username of an email address using the content of the `redact` field                         |
| email_mask_domain_name                    | Mask the domain name of an email address using the content of the `redact` field                      |
| email_mask_while_preserving               | Mask the email address while preserving the format using the content of the `redact` field            |
| email_mask_with_fake                      | Mask the email address with fake data                                                                 |
| person_full_name_mask_with_fake           | Mask the full name with fake data                                                                     |
| person_first_name_mask_with_fake          | Mask the first name with fake data                                                                    |
| person_last_name_mask_with_fake           | Mask the last name with fake data                                                                     |
| person_gender_mask_with_fake              | Mask the gender with fake data                                                                        |
| person_ssn_mask_with_fake                 | Mask the SSN with fake data                                                                           |
| phone_mask_with_fake                      | Mask the phone number with fake data                                                                  |
| postal_address_mask_with_fake             | Mask the postal address with fake data                                                                |
| city_mask_with_fake                       | Mask the city with fake data                                                                          |
| state_mask_with_fake                      | Mask the state with fake data                                                                         |
| country_mask_with_fake                    | Mask the country with fake data                                                                       |
| zip_mask_with_fake                        | Mask the zip code with fake data                                                                      |
| location_mask_except_state_country        | Mask the location except the state and country                                                        |
| network_url_mask_with_fake                | Mask the network URL with fake data                                                                   |
| network_domain_mask_with_fake             | Mask the network domain with fake data                                                                |
| network_ipv4_mask_with_fake               | Mask the IPv4 address with fake data                                                                  |
| network_ipv6_mask_with_fake               | Mask the IPv6 address with fake data                                                                  |
| network_mac_mask_with_fake                | Mask the MAC address with fake data                                                                   |
| payment_credit_card_cvv_mask_with_fake    | Mask the CVV of a credit card with fake data                                                          |
| payment_credit_card_exp_mask_with_fake    | Mask the expiration date of a credit card with fake data                                              |
| payment_credit_card_number_mask_with_fake | Mask the number of a credit card with fake data                                                       |
| payment_credit_card_type_mask_with_fake   | Mask the type of a credit card with fake data                                                         |
| payment_currency_with_fake                | Mask the currency with fake data                                                                      |
| payment_ach_routing_with_fake             | Mask the routing number of an ACH transaction with fake data                                          |
| payment_ach_account_with_fake             | Mask the account number of an ACH transaction with fake data                                          |
| payment_bitcoin_address_with_fake         | Mask the Bitcoin address with fake data                                                               |
| payment_bitcoin_private_key_with_fake     | Mask the Bitcoin private key with fake data                                                           |
| company_name_with_fake                    | Mask the company name with fake data                                                                  |
| redact.first_n_characters                 | Redact the first n (from `characters_count` field) characters using the content of the `redact` field |
| redact.last_n_characters                  | Redact the last n (from `characters_count` field) characters using the content of the `redact` field  |
| reduce_decimal_precision                  | Reduce the precision of a decimal to a number of digits specified by the `precision` field            |

#### Example

```rego
package formal.v2

import future.keywords.if

post_request := {
    "action": "mask",
    "type": "redact.partial",
    "subType": "email_mask_username",
    "columns": columns } if {
    columns := [col | col := input.row[_]; col["data_label"] == "email_address"; col["name"] == "email"; col["value"] == "gravida.aliquam.tincidunt@aol.net"]
}
```

```rego
package formal.v2

import future.keywords.if

pre_request := {
    "action": "mask",
    "type": "redact.constant_characters",
    "sub_type": "redact.constant_characters",
    "redact": "[location is redacted]",
    "columns": columns } if {
    columns := [col | col := input.row[_]; col["data_label"] == "location"]
}
```

```rego
package formal.v2

import future.keywords.if

pre_request := {
    "action": "mask",
    "type": "fake",
    "sub_type": "person_full_name_mask_with_fake",
    "columns": columns } if {
    columns := [col | col := input.row[_]; col["data_label"] == "name"]
}
```

```rego
package formal.v2

import future.keywords.if

pre_request := {
    "action": "mask",
    "type": "redact.partial",
    "sub_type": "redact.first_n_characters",
    "characters_count": 3,
    "columns": columns } if {
    columns := [col | col := input.row[_]; col["data_label"] == "name"]
}
```

### Decrypt Action

#### Returned parameters

The decrypt action requires returning a list of columns. These columns are provided in the policy engine. You can further refine the list by utilizing parameters of the column, such as the name, data_label, tags, value, usage, and more.

#### Example

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

post_request := { "action": "decrypt", "columns": columns } if {
    columns := [col | col := input.row[_]; col["name"] == "name"]
}
```

### Handling rule of conflicts

The policy evaluation process commences by collecting all relevant rules from various policies. This determination is based on the user's identity and the accessed data in the query. It is important to note that multiple rules may apply to the same data location, as rules can reference the location through data labels or any of its associated tags. Additionally, since a query can involve multiple data locations, it is possible for multiple rules to be applicable.

In such cases, each applicable rule may yield a different outcome, imposing unique policy enforcement actions on the query execution, for instance, two rules may match a query, each specifying its own distinct row limit. Formal resolves these rule conflicts using the principle of least privilege, as follows:

- **Filter action**: The final row limit for the query is determined by selecting the smallest row limit among all the applied rules.
- **Masking action**: If different rules require the same attribute to be masked in various ways, the method that reveals the least amount of information will be chosen. The order of precedence, from highest to lowest, is as follows: null mask, constant mask, random (format-preserving) mask. It is important to note that if there are two rules both suggest a constant mask but with different constant values, one of them will be arbitrarily selected.
- **Rewrite action**: If different rules require the same query to be rewritten differently, an arbitrary substitution will be chosen from the available options.
- **Block/Allow action**: In cases where a data location has conflicting block and allow actions, the block action takes precedence and will be enforced.

### Rego default keyword

The Rego `default` keyword is very useful because it enables users to write policies and rules with the OR logic in Rego.

Formal applies policies to every Resource and Connector which can lead to conflicts between policies using the `default` keyword.

To prevent that problem users can write policies that either include Connectors or exclude Connectors.

You can exclude Connectors via a list of names thanks to the rego rule: `excluded_connectors`
You can include only select Connector via a list of names thanks to the rego rule: `included_connectors`
Here's an example so a policy _only_ applies to `the test-ssh-prod` Connector:

```rego
package formal.v2

import future.keywords.if

included_connectors := ["test-ssh-prod"]

session := { "action": "block", "type": "block_with_formal_message" } if {
  input.resource.technology == "ssh"
}
```

<CardWarning>
A single policy cannot use at the same time `included_connectors` and `excluded_connectors`
</CardWarning>

Similarly, users can write policies that either include resources or exclude resources.

You can exclude resources via a list of names thanks to the rego rule: `excluded_resources`
You can include only select resources via a list of names thanks to the rego rule: `included_resources`
Here's an example so the policy does not apply to the `prod-db` resource:

```rego
package formal.v2

import future.keywords.if

excluded_resources := ["prod-db"]

session := { "action": "block", "type": "block_with_formal_message" } if {
  columns := [col | col := input.row[_]; col["name"] == "email"]
}
```

<CardWarning>
A single policy cannot use at the same time `included_resources` and `excluded_resources`
</CardWarning>
