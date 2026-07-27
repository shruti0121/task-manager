# AWS Three Tier Web Architecture 


## Architecture Overview
![Architecture Diagram](https://github.com/aws-samples/aws-three-tier-web-architecture-workshop/blob/main/application-code/web-tier/src/assets/3TierArch.png)

In this architecture, a public-facing Application Load Balancer forwards client traffic to our app tier EC2 instances. 


- VPC - Network isolation
- Public and Private Subnets - Security separation
- Internet Gateway - Internet access for public resources
- NAT Gateway - Outbound internet access for private instances
- Application Load Balancer - Traffic distribution
- Auto Scaling Groups -
- EC2 - Application servers
- RDS MySQL - Managed relational database
- Security Groups - Firewall rules
- IAM - Access management
- CloudWatch - Monitoring

## Architecture Explanation 
The application follows a three-tier architecture:

1. Presentation Tier/Web Tier
   - Users access the application through the Application Load Balancer.
   - ALB distributes incoming requests across multiple EC2 instances.
   - NAT Gateway allows private instances to access the internet for updates without exposing them publicly.

2. Application Tier
   - EC2 instances run the backend application.
   - Instances are placed in private subnets for security.

3. Database Tier
   - MySQL database runs on Amazon RDS.
   - Database is isolated in private subnets.
   - Only application servers can communicate with the database.


## Security Design

- ALB is the only public entry point.
- EC2 instances do not have public IP addresses.
- Database is not publicly accessible.
- Security groups restrict traffic

  
## Future Improvements

- Replace manual infrastructure with Terraform/CDK
- Create internal ALB in private subnet for better security
- Add CI/CD pipeline
- Add HTTPS using ACM certificates
- Add monitoring and alarms
