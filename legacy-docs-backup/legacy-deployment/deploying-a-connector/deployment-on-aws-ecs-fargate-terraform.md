---
title: "Deployment on AWS ECS Fargate (Terraform)"
---

import { CardWarning } from '@site/src/components/card/card';

<span className="page-description">How to deploy the Connector on AWS ECS Fargate using Terraform?</span>

## Prerequisites

- AWS account with appropriate permissions
- Terraform CLI installed (version 1.0 or later)
- Network access to the Formal Control Plane
- The Connector API token from the Formal Control Plane
- Access to Formal ECR repositories

## Infrastructure Setup

To deploy the Formal Connector on AWS ECS Fargate, we recommend you to setup the following infrastructure components with Terraform:

- **ECS cluster** to orchestrate container deployment
- **ECS Fargate service** running the Connector container
- **VPC networking** with proper subnet configuration for public/private resources
- **CloudWatch logging** for monitoring and troubleshooting
- **IAM roles** with permissions for ECS task execution and Secrets Manager access
- **Secrets storage** for secure API key management

For high availability, the Connector should be deployed across multiple availability zones. This ensures the Connector is resilient and ready to proxy connections to your production databases without downtime.

## Demo Deployment

To help you get started quickly, we provide an example Terraform configuration that sets up the Connector on AWS ECS Fargate. It demonstrates a complete deployment that creates all necessary infrastructure from scratch, including the configuration of Formal resources on the Formal Control Plane.

<CardWarning>
This demo creates its own VPC and networking components for demonstration purposes. In production, Formal clients integrate the Connector within their own infrastructure.
</CardWarning>

To deploy the demo, follow these steps:

1. Clone the Formal Terraform provider repository to access the example configurations:

```bash
git clone https://github.com/formalco/terraform-provider-formal.git
cd terraform-provider-formal/examples/deployments/aws/connector
```

2. Review and customize the Terraform configuration files:

   - `main.tf`: Contains the main infrastructure configuration
   - `variables.tf`: Defines the required variables

3. Create a `terraform.tfvars` file with your specific values:

```hcl
# Required variables
region             = "us-west-2"
availability_zones = ["us-west-2a", "us-west-2b"]
formal_api_key     = "your-formal-api-key"      # Provided by Formal
formal_org_name    = "your-org-name"            # Provided by Formal

# Optional: customize networking (defaults provided)
# vpc_cidr              = "172.0.0.0/16"
# private_subnet_cidrs  = ["172.0.1.0/24", "172.0.2.0/24"]
# public_subnet_cidrs   = ["172.0.101.0/24", "172.0.102.0/24"]

# Optional: customize resources (defaults provided)
# name            = "demo-env"
# environment     = "demo-formal-env"
# container_cpu   = 1024
# container_memory = 2048
```

4. Initialize Terraform and apply the configuration:

```bash
terraform init
terraform apply
```

For more details about this demo deployment, see the [README](https://github.com/formalco/terraform-provider-formal/tree/main/examples/deployments/aws/connector) in the example directory.

## Troubleshooting

If you encounter issues with the Connector on AWS ECS:

1. Check the ECS service events in the AWS Console
2. Verify the Connector logs in CloudWatch
3. Ensure the API token is valid and properly configured
4. Confirm network connectivity to the Formal Control Plane

If you need additional help, please contact the Formal team, we are always happy to help.
