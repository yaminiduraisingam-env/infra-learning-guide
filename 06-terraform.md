# Phase 6: Terraform / OpenTofu

Weeks 35-38 (Jul 5 - Aug 1) · 24 hours · [Back to contents](TOC.md)

**Exam: HashiCorp Terraform Associate, by Aug 1.** Read the current exam objectives on the HashiCorp site first, and tick them off as you go.

**Why it matters:** this is what env0 runs. OpenTofu is a compatible fork, so everything here applies. The exam covers Terraform, so learn the few differences as you go.

**Resources**
- [HashiCorp Developer Terraform tutorials](https://developer.hashicorp.com/terraform/tutorials) (free): "Get started" and exam prep
- [Terraform docs](https://developer.hashicorp.com/terraform/docs)
- [Official Terraform Associate exam page](https://developer.hashicorp.com/certifications/infrastructure-automation)
- From your mentor: [Terraform learning path](https://app.pluralsight.com/learning-paths/abe5a7d9-d031-4fe3-8bef-15a2fa79c34d) on Pluralsight (15h 57m)
- [OpenTofu docs](https://opentofu.org/docs/)
- Practice exams (Bryan Krausen's on Udemy are popular) for the last week

**Setup:** install `terraform` and `tofu`. Use the AWS free tier or the `local` and `random` providers so labs cost nothing.

## Week by week: what to open

Mandatory: your mentor's [Terraform learning path](https://app.pluralsight.com/learning-paths/abe5a7d9-d031-4fe3-8bef-15a2fa79c34d) on Pluralsight (about 16 hours, 4 a week). Finish it. Add the free [HashiCorp Get Started tutorials](https://developer.hashicorp.com/terraform/tutorials) for hands-on practice, and keep the official exam objectives open and tick them off.

| Week | Do this | Covers |
| --- | --- | --- |
| 35 | Terraform path: hours 1-4. Get Started: install, build, change and destroy infrastructure, input variables, outputs | 6.1, start of 6.2 |
| 36 | Terraform path: hours 5-8. Docs: expressions, `count` and `for_each`, providers, data sources, lifecycle | rest of 6.2, 6.3, start of 6.4 |
| 37 | Terraform path: hours 9-12. Tutorials: remote state, import, state commands, modules | rest of 6.4, 6.5 |
| 38 | Terraform path: hours 13-16 (finish the path). Docs: workspaces, sensitive data. Review every exam objective. 2-3 full practice exams | 6.6, exam |

## 6.1 IaC concepts and the core workflow

**Week 35 · 4 hrs** · [Take the quiz](quiz.html?t=6.1)

**Study**
- What IaC is, declarative vs imperative
- `init`, `validate`, `fmt`, `plan`, `apply`, `destroy`
- Saved plans: `plan -out`, `apply plan.tfplan`
- Files: `main.tf`, `variables.tf`, `outputs.tf`, `.terraform.lock.hcl`

**Lab**
- Using only the `local` provider, create a file with `local_file`, change it, plan and apply
- Run `terraform plan` twice and confirm the second says "No changes"

**Done when** you can explain what each core command does and when to run it.

## 6.2 HCL: variables, outputs and expressions

**Weeks 35-36 · 5 hrs** · [Take the quiz](quiz.html?t=6.2)

**Study**
- Input variables: types, defaults, validation, `sensitive`
- Setting variables: `-var`, `tfvars`, `TF_VAR_`, precedence
- Locals and outputs
- `count`, `for_each`, `for` expressions, conditionals
- Common functions: `merge`, `lookup`, `join`, `format`, `toset`
- Dynamic blocks

**Lab**
- Create 3 files with `for_each` over a map, then remove one entry and read the plan
- Do the same with `count` and see the difference
- Add a variable validation rule and trigger it

**Done when** you can explain why `for_each` is safer than `count` for most cases.

## 6.3 Providers, resources and data sources

**Week 36 · 4 hrs** · [Take the quiz](quiz.html?t=6.3)

**Study**
- Provider blocks, `required_providers`, version constraints
- Resources vs data sources
- Implicit and explicit dependencies (`depends_on`)
- Lifecycle: `create_before_destroy`, `prevent_destroy`, `ignore_changes`
- Provisioners (and why they are a last resort)

**Lab**
- Create an S3 bucket and a policy that references it, then view the dependency graph with `terraform graph`
- Use a data source to look up the latest Amazon Linux AMI
- Add `prevent_destroy` and try to destroy

**Done when** you can explain what Terraform does when two resources reference each other.

## 6.4 State, backends and drift

**Weeks 36-37 · 5 hrs** · [Take the quiz](quiz.html?t=6.4)

**Study**
- What state holds, and why it can contain secrets
- Remote backends (S3 with locking, HCP Terraform) and state locking
- `terraform state list/show/mv/rm`
- `import` blocks and `terraform import`
- Drift, `plan -refresh-only`, `taint`/`-replace`
- OpenTofu: state encryption

**Lab**
- Move your local state to an S3 backend (or a local backend with another path)
- Create a bucket in the console, import it into state, and write the config for it
- Change a tag in the console, run `plan` and see the drift

**Done when** you can recover from a lost or corrupted state.

## 6.5 Modules

**Week 37 · 3 hrs** · [Take the quiz](quiz.html?t=6.5)

**Study**
- Root and child modules, inputs and outputs
- Module sources: local, registry, git, and version pinning
- Structure of a good module: variables, outputs, README
- Public Registry modules, and when not to use them

**Lab**
- Turn your bucket config into a local module and call it twice with different names
- Use a registry module (for example the AWS VPC module) and read its inputs and outputs

**Done when** you can design a module with a clean interface.

## 6.6 Workspaces, secrets and exam review

**Week 38 · 3 hrs** · [Take the quiz](quiz.html?t=6.6)

**Study**
- Workspaces: what they do and their limits
- Handling secrets: variables, secrets managers, never in git
- HCP Terraform features (for the exam) and how env0 covers the same ground
- Terraform vs OpenTofu differences
- Exam topics list: tick each one off

**Lab**
- Create two workspaces and see separate state files
- **env0 tie-in:** create a small template in your own env0 test project, deploy it, then change a value and watch the plan

**Exam prep (last week)**
- Take 2-3 full practice exams, and read the reason for every wrong answer.
- Retake quizzes 6.1 to 6.5 until each is 5/5.
- Book the exam (online proctored or at a test center).

**Done when** you pass practice exams at 80% or higher.
