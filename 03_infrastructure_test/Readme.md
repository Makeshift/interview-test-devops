# Infrastructure
This sort of infrastructure is common both at previous positions and in freelance work I've done, so I've put together an example of deploying an ECS cluster in AWS, which would be ready to run task definitions.

It does NOT create a load balancer, as it does not assume that you want to run websites on it. However, it does open the security group in such a way to allow a load balancer to hit it if needed.

## Base stack
The `base-ecs-stack.yaml` assumes you already have:
* A VPC with subnets
* An EC2 key added in the region

It will create:
* A security group for the ECS hosts
* A host role for the ECS hosts
* A basic task execution role for services to use
* An autoscaling group for the ECS hosts, though this is just designed to keep a minimum number of healthy hosts
* A generic log group for services to use

### Deployment
The easiest deployment method would be to go to your AWS region of choice and use the UI to deploy the Cloudformation stack. This will prepopulate many of the parameters for you.