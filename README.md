# Infrastructure Learning Guide

From the Linux kernel up to Terraform. 19 weeks, about 6 hours a week, two certifications on the way.

Start date: **Monday, Nov 2, 2026**. Finish: **Sunday, Mar 14, 2027**.

## Goal

Join design calls and understand the whole stack underneath env0: what a process and a container are, how packets travel, how AWS and Kubernetes work, and how Terraform manages it all.

Each phase ends with something you can explain out loud. If you can't explain it, repeat the quiz and lab.

## The plan

| Phase | Topic | Weeks | Dates | Hours | Milestone |
| --- | --- | --- | --- | --- | --- |
| 1 | [Linux and kernel](01-linux.md) | 1-3 | Nov 2 - Nov 22 | 18 | |
| 2 | [Networking](02-networking.md) | 4-6 | Nov 23 - Dec 13 | 18 | |
| 3 | [AWS](03-aws.md) | 7-9 | Dec 14 - Jan 3 | 18 | **Cloud Practitioner exam by Jan 3** |
| 4 | [Containers](04-containers.md) | 10-11 | Jan 4 - Jan 17 | 12 | |
| 5 | [Kubernetes](05-kubernetes.md) | 12-14 | Jan 18 - Feb 7 | 18 | |
| 6 | [Terraform / OpenTofu](06-terraform.md) | 15-18 | Feb 8 - Mar 7 | 24 | **Terraform Associate exam by Mar 7** |
| | Buffer: review, retakes, catch-up | 19 | Mar 8 - Mar 14 | 6 | |

Weeks 7-9 fall over the holidays. If you lose a week, use the buffer week at the end.

[Full table of contents](TOC.md)

## Weekly routine (6 hrs)

- **Two weekday sessions, 2 hrs each:** course videos or reading.
- **One weekend session, 1-2 hrs:** the lab, then the quiz.
- **End of week:** write 5 lines in your own words about what you learned. Keep them in a `notes/` folder in this repo.

Already know a topic? Take its quiz first. If you score 5/5, skim the study list and move on. The time you save goes to the buffer week.

## Quizzes

Every topic ends with a 5-question quiz. Questions and answer order are shuffled each time. After each answer you get a short explanation, and at the end a review of what you missed. Your best score is saved in your browser.

- Hub with all quizzes: [quiz.html](quiz.html)
- Direct link to one quiz: `quiz.html?t=1.1`

## Hosting on GitHub

1. Create a new repo and push this folder to it.
2. In the repo: **Settings > Pages > Build and deployment**. Choose **Deploy from a branch**, branch `main`, folder `/ (root)`.
3. After a minute the site is live at `https://<your-username>.github.io/<repo-name>/`. This README is the home page, and the quiz links work there.

Run it on your laptop without GitHub:

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000/quiz.html.

On github.com itself the quiz links open the HTML source. Use the Pages site to take the quizzes.

## Exams

| Exam | Target date | Prep |
| --- | --- | --- |
| AWS Certified Cloud Practitioner | by Jan 3 | Phase 3, then 2-3 full practice exams in the last 4 days |
| HashiCorp Terraform Associate | by Mar 7 | Phase 6, then 2-3 full practice exams in the last week |

Book both dates now. Check the official exam guides for the current objectives and prices before you book, as both exams get updated.

## Resources used throughout

- **Pluralsight:** search the topic name, pick a recent course with a lab or a skill assessment.
- **Coursera:** Google's "Bits and Bytes of Computer Networking"; AWS and HashiCorp courses.
- **Free and good:** AWS Skill Builder, HashiCorp Developer tutorials, kubernetes.io tutorials, Linux Foundation intro courses on edX, Julia Evans' zines (wizardzines.com), killercoda.com labs.

Course catalogs change, so each phase lists resources by name and topic.
