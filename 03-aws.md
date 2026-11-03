# Phase 3: AWS (Cloud Practitioner)

Weeks 7-9 (Dec 14 - Jan 3) · 18 hours · [Back to contents](TOC.md)

**Exam: AWS Certified Cloud Practitioner, by Jan 3.** The four exam areas are cloud concepts, security and compliance, cloud technology and services, and billing and pricing. Check the current exam guide when you book.

**Why it matters:** env0's services run on AWS, and customers connect their AWS accounts through roles and credentials.

**Resources**
- From your mentor (Pluralsight):
  - [AWS Certified Cloud Practitioner (CLF-C02): Cloud Foundations and Compute](https://app.pluralsight.com/library/courses/97bc79ee-8145-4aa7-8085-af58378da5f0) (1h 33m)
  - [AWS Core Compute](https://app.pluralsight.com/learning-paths/9e860671-6e3b-4ad1-8bac-4a4ff53447ce) (5h 6m)
  - [AWS Networking and Traffic Management](https://app.pluralsight.com/learning-paths/3e0cfd70-d397-4357-9808-c663bcbd5f64) (3h 38m)
  - [AWS Storage Fundamentals](https://app.pluralsight.com/ilx/video-courses/9382c46e-27d4-452a-9969-f1f24c46395f/course-overview) (1h)
  - [AWS Certified Solutions Architect - Associate (SAA-C03): Scaling and Decoupling Architectures](https://app.pluralsight.com/ilx/video-courses/f4cdefa6-83dc-4aef-9efe-da42f72f6ba1/course-overview) (13h 41m). This is the next certification up, so save it for after the Cloud Practitioner exam.
- [AWS Skill Builder](https://skillbuilder.aws): "AWS Cloud Practitioner Essentials" (free) and the official practice question set. Search the course name after signing in.
- [Pluralsight](https://www.pluralsight.com) or [Coursera](https://www.coursera.org): a Cloud Practitioner exam prep course
- [Tutorials Dojo](https://tutorialsdojo.com) practice exams (for the last 4 days)
- [AWS Free Tier](https://aws.amazon.com/free/) account for the labs. Set a budget alert first.
- [Official exam page and guide](https://aws.amazon.com/certification/certified-cloud-practitioner/)

## Week by week: what to open

Main courses: your mentor's four Pluralsight courses (about 11 hours in total), starting with the CLF-C02 one, which matches the exam. Use **[AWS Skill Builder, "AWS Cloud Practitioner Essentials"](https://skillbuilder.aws)** (free) for what they don't cover: security, billing and pricing. Finish with practice exams.

| Week | Do this | Covers |
| --- | --- | --- |
| 7 | Pluralsight: [CLF-C02 Cloud Foundations and Compute](https://app.pluralsight.com/library/courses/97bc79ee-8145-4aa7-8085-af58378da5f0) (1.5 hrs). Skill Builder Essentials: security module. Start [AWS Core Compute](https://app.pluralsight.com/learning-paths/9e860671-6e3b-4ad1-8bac-4a4ff53447ce) | 3.1, 3.2 |
| 8 | Pluralsight: finish AWS Core Compute (5 hrs total), then [AWS Storage Fundamentals](https://app.pluralsight.com/ilx/video-courses/9382c46e-27d4-452a-9969-f1f24c46395f/course-overview) (1 hr) | 3.3, 3.4 |
| 9 | Pluralsight: [AWS Networking and Traffic Management](https://app.pluralsight.com/learning-paths/3e0cfd70-d397-4357-9808-c663bcbd5f64) (3.6 hrs). Skill Builder Essentials: pricing and support module. Then 2-3 full practice exams (Skill Builder official set, Tutorials Dojo) | 3.5, 3.6, exam |

**After the exam:** [SAA-C03 Scaling and Decoupling Architectures](https://app.pluralsight.com/ilx/video-courses/f4cdefa6-83dc-4aef-9efe-da42f72f6ba1/course-overview) (13 hrs) is the Solutions Architect Associate level. It is more than the Cloud Practitioner exam needs.

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
