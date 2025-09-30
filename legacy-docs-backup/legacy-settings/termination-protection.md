---
title: "Termination Protection"
---

Termination protection is a critical feature in Formal that prevents the accidental deletion of essential resources such as Connectors, Resources, Users, etc. This feature ensures that your Formal infrastructure remains intact and operational, safeguarding against inadvertent modifications that could disrupt your data access and security.

## Enabling Termination Protection
Termination protection can be enabled for various Formal resources to add an extra layer of security. Once enabled, the resource cannot be deleted without first disabling termination protection. This two-step process ensures that deletions are intentional and authorized.

### How Termination Protection works?

Termination protection is enforced at three layers:
- **Terraform SDK**: When defining your resources in Terraform, you can specify termination protection as part of the resource configuration.
- **Formal API**: The Formal API checks for termination protection on delete routes, preventing deletion if termination protection is enabled.
- **Database Function**: A database function in Formal's control plane database triggers on deletion attempts, ensuring that resources with termination protection enabled are not deleted.

## Disabling Termination Protection
To delete a resource that has termination protection enabled, you must first disable the termination protection parameter. This action ensures that the deletion process is deliberate and reduces the risk of accidental data loss.

### How to Disable Termination Protection
- **Terraform**: Update your Terraform configuration to set the `termination_protection` parameter to false for the resource you wish to delete.
- **Formal Console**: Navigate to the resource settings in the Formal console and manually disable termination protection.