# Phase 3: AWS (Cloud Practitioner)

Weeks 7-9 (Dec 14 - Jan 3) · 18 hours · [Back to contents](TOC.md)

**Exam: AWS Certified Cloud Practitioner, by Jan 3.** The four exam areas are cloud concepts, security and compliance, cloud technology and services, and billing and pricing. Check the current exam guide when you book.

**Why it matters:** env0's services run on AWS, and customers connect their AWS accounts through roles and credentials.

**Resources**
- AWS Skill Builder: "AWS Cloud Practitioner Essentials" (free) and the official practice question set
- Pluralsight or Coursera: a Cloud Practitioner exam prep course
- Tutorials Dojo practice exams (for the last 4 days)
- AWS Free Tier account for the labs. Set a budget alert first.

## Week by week: what to open

Main course: **AWS Skill Builder, "AWS Cloud Practitioner Essentials"** (free, about 6 hours of video). Then one exam-prep course from Pluralsight or Coursera, and practice exams in the last days.

| Week | Do this | Covers |
| --- | --- | --- |
| 7 | Essentials: intro to AWS, global infrastructure, security. Start your exam-prep course | 3.1, 3.2 |
| 8 | Essentials: compute, storage and databases. Exam-prep course: same topics | 3.3, 3.4 |
| 9 | Essentials: networking, monitoring, pricing and support, migration. Then 2-3 full practice exams (Skill Builder official set, Tutorials Dojo) | 3.5, 3.6, exam |

Module names are from memory. Follow the order Skill Builder shows.

## 3.1 Cloud concepts and global infrastructure

**Week 7 · 3 hrs** · [Take the quiz](quiz.html?t=3.1)

**Study**
- Cloud models: IaaS, PaaS, SaaS. Public, private, hybrid
- Benefits: elasticity, agility, pay as you go, capex to opex
- Regions, Availability Zones, edge locations
- Well-Architected Framework: the six pillars
- Shared responsibility model

**Lab**
- Open the AWS console, switch Regions, find the list of AZs in one Region
- Draw the shared responsibility split for EC2 vs S3 vs Lambda

**Done when** you can explain why you'd deploy across two AZs.

## 3.2 IAM and security

**Week 7 · 4 hrs** · [Take the quiz](quiz.html?t=3.2)

**Study**
- Root user, IAM users, groups, roles, policies
- Policy JSON: effect, action, resource, condition
- Least privilege, explicit deny, MFA
- Roles and STS: temporary credentials, cross-account access
- KMS, Secrets Manager, Shield, WAF, GuardDuty, CloudTrail

**Lab**
- Create an IAM user with MFA and a read-only S3 policy, then test it
- Create a role that your user can assume, and call `aws sts get-caller-identity`
- Turn on CloudTrail and find your own console login event

**Done when** you can describe how a customer's AWS account can grant env0 access without sharing keys.

## 3.3 Compute and containers

**Week 8 · 3 hrs** · [Take the quiz](quiz.html?t=3.3)

**Study**
- EC2: instance types, AMIs, pricing (On-Demand, Reserved, Spot, Savings Plans)
- Auto Scaling and Elastic Load Balancing
- Lambda: triggers, limits, pay per use
- ECS, EKS, Fargate
- Elastic Beanstalk, Lightsail (just what they are)

**Lab**
- Launch a free-tier EC2 instance, SSH in, then terminate it
- Create a Lambda function with a console test event and read its logs

**Done when** you can pick between EC2, Lambda and Fargate for a given workload.

## 3.4 Storage and databases

**Week 8 · 3 hrs** · [Take the quiz](quiz.html?t=3.4)

**Study**
- S3: buckets, storage classes, versioning, lifecycle rules
- EBS, EFS, FSx: block vs file vs object
- RDS and Aurora, DynamoDB, ElastiCache, Redshift
- Backups: snapshots, AWS Backup

**Lab**
- Create an S3 bucket, upload a file, turn on versioning and overwrite the file
- Add a lifecycle rule that moves objects to Glacier after 30 days

**Done when** you can match a use case to S3, EBS, RDS or DynamoDB.

## 3.5 Networking and content delivery

**Week 9 · 2 hrs** · [Take the quiz](quiz.html?t=3.5)

**Study**
- VPC, subnets, route tables, internet gateway, NAT gateway
- Security groups vs network ACLs
- Route 53, CloudFront, VPN, Direct Connect
- Link back to Phase 2: CIDR, NAT, DNS

**Lab**
- Open the default VPC and read its subnets and route table
- Find the security group on your EC2 instance and read its rules

**Done when** you can explain what makes a subnet public.

## 3.6 Billing, pricing and exam review

**Week 9 · 3 hrs** · [Take the quiz](quiz.html?t=3.6)

**Study**
- Free tier, pricing models, Savings Plans
- Cost tools: Pricing Calculator, Cost Explorer, Budgets, Cost and Usage Report
- AWS Organizations and consolidated billing
- Trusted Advisor, Support plans (read the current names on the AWS site)
- Compliance: Artifact, shared responsibility for compliance

**Lab**
- Create a budget alert for $5
- Estimate a small web app in the Pricing Calculator

**Exam prep (last 4 days)**
- Take 2-3 full practice exams. For every wrong answer, read why.
- Re-take the quizzes for 3.1 to 3.5 and fix the ones below 5/5.
- Book the exam (online proctored or at a test center).

**Done when** you pass practice exams at 80% or higher.
