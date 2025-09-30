---
title: "How to encrypt data with a custom encryption key?"
---

<span className="page-description">Formal allows you to use your own encryption key for data encryption.</span>

## Requirements
1. Ensure that you have registered an encryption key. For guidance on this process, please refer to [our documentation on registering an encryption key](/integrations/encryption-keys)

## Supported key management services
Formal supports the following key management services:

1. AWS KMS
2. Azure Key Vault
3. GCP CKM
4. Hashicorp Vault

## Encryption algorithm

Formal offers two encryption algorithm options:
1. AES-256 Deterministic: This option allows for searchability over encrypted data but offers relatively less security.
2. AES-256 Random: This method offers enhanced security and is considered the most secure option.

## Data Key Storage
Field Encryptions use an envelope encryption model. First, a Data Key is generated to encrypt the data. This Data Key is then stored, itself encrypted by the Encryption Key.

There are two options for the storage of the encrypted Data Key:
1. In the control plane and alongside data (recommended): this option stores the encrypted Data Key in the Formal Control Plane and also appends the encrypted Data Key alongside the encrypted data. 
    When a User with decrypt access to this Field Encryption makes a query, the retrieved Encryption Key is used to decrypt the Data Key. The Data Key is then used to decrypt the underlying data. 
    This storage method is recommended because as long as you can access your database and encrypted data, you can access your Encrypted Data Key. Maintaining access to the original data then rests upon maintaining access to your Field Encryption Key.

2. In the control plane only: this option results in the encrypted Data Key being stored in the Formal control plane only. When a User with decrypt access to this Field Encryption makes a query, the encrypted Data Key is retrieved, and then the retrieved Encryption Key is used to decrypt the Data Key. The Data Key is then used to decrypt the underlying data. 

## Encrypting Data with Your Custom Key

To encrypt data using your custom key, define a policy as follows:
```rego
package formal.v2

import future.keywords.if
import future.keywords.in

pre_request := { "action": "encrypt", "columns": columns, "kms_key": kmsKey } if {
    columns := [col | col := input.file.columns[_]; col["name"] == "email"]
	count(columns) > 0
	kmsKey := {
		"type": "PROVIDER", 
		"id": "KEY-ID", 
		"region": "YOUR REGION",
		"algorithm": "ALGORITHM",
		"storage": "STORAGE"
	}
}
```

**Configurable values:**
- type: The provider type (`aws`, `azure`, `gcp` or `hashicorp`)
- id: The ID of your key with the provider
- region: The region where your key is stored
- algorithm: Choose between `aes_random` or `aes_deterministic`
- storage: Choose between `control_plane_and_with_data` or `control_plane` 

## Decrypting an encrypted field
To grant access for decrypting a user must have a decryption policy applied to their user or group that matches the encrypted column.

Here's an example of a decrypt policy applied to the group USAnalyst, using the column's name `email`:

```rego
package formal.v2

import future.keywords.if
import future.keywords.in

post_request := { "action": "decrypt", "columns": columns } if {
    columns := [col | col := input.row[_]; col["name"] == "email"]
    "USAnalyst" in input.user.groups
}
```