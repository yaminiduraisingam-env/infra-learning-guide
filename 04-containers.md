# Phase 4: Containers

Weeks 13-21 (Jan 25 - Mar 28) · 54 hours · [Back to contents](TOC.md)

**Why it matters:** the env0 agent and every deployment run in containers. Kubernetes in Phase 5 builds directly on this.

**Resources**
- From your mentor (Pluralsight):
  - [Docker Fundamentals for Developers](https://app.pluralsight.com/learning-paths/1398903d-e314-4744-98c3-94bb86d1c1da) (43h 48m learning path)
  - [Hypervisor Types, Architecture, and Selection](https://app.pluralsight.com/ilx/video-courses/8a253bae-f92e-456c-95a9-09591254c033/course-overview) (1h)
- [Docker "Get started" docs](https://docs.docker.com/get-started/) (free)
- [Pluralsight](https://www.pluralsight.com): search "Docker fundamentals" or "Docker deep dive"
- [Liz Rice, "Containers from scratch"](https://www.youtube.com/results?search_query=liz+rice+containers+from+scratch), if you skipped it in Phase 1
- [Trivy docs](https://trivy.dev) for scanning

**Setup:** install Docker Desktop or Colima. Check with `docker run hello-world`.

## Week by week: what to open

Mandatory: your mentor's [Docker Fundamentals for Developers](https://app.pluralsight.com/learning-paths/1398903d-e314-4744-98c3-94bb86d1c1da) path on Pluralsight (about 44 hours) and the [Hypervisor Types](https://app.pluralsight.com/ilx/video-courses/8a253bae-f92e-456c-95a9-09591254c033/course-overview) course (1 hour). Finish both. Add the free [Docker "Get started" guide](https://docs.docker.com/get-started/) for hands-on practice. Follow the path in order. The hours below are a pace target (about 5 hours a week), so you finish the path by week 21.

| Week | Do this | Covers |
| --- | --- | --- |
| 13 | [Hypervisor Types](https://app.pluralsight.com/ilx/video-courses/8a253bae-f92e-456c-95a9-09591254c033/course-overview) (1 hr, VMs vs containers). Docker path: hours 1-4. Get started: containerize an app | 4.1 |
| 14 | Docker path: hours 5-9. Docs: Dockerfile and image-building best practices (layers, cache) | 4.1 |
| 15 | Docker path: hours 10-14. Docs: multi-stage builds, `.dockerignore`. Lab and quiz 4.1 | 4.1 |
| 16 | Docker path: hours 15-19. Get started: running containers, volumes | 4.2 |
| 17 | Docker path: hours 20-24. Docker networking | 4.2 |
| 18 | Docker path: hours 25-29. Docker Compose. Lab and quiz 4.2 | 4.2 |
| 19 | Docker path: hours 30-34. Registries, pushing an image | 4.3 |
| 20 | Docker path: hours 35-39. Container security: non-root, minimal base images | 4.3 |
| 21 | Docker path: hours 40-44 (finish the path). Scanning with [Trivy](https://trivy.dev). Lab and quiz 4.3 | 4.3 |

## 4.1 Images, layers and Dockerfiles

**Weeks 13-15 · 17 hrs** · [Take the quiz](quiz.html?t=4.1)

**Study**
- Image vs container, layers and the union filesystem
- Dockerfile instructions: FROM, RUN, COPY, ENV, WORKDIR, USER, ENTRYPOINT, CMD
- Layer caching and instruction order
- Multi-stage builds
- `.dockerignore`

**Lab**
- Write a Dockerfile for a small web app (Node or Python)
- Build it, change one line of code, and watch which layers rebuild
- Convert it to a multi-stage build and compare image sizes with `docker images`

**Done when** you can explain why the order of Dockerfile lines changes build time.

## 4.2 Running containers, networking and volumes

**Weeks 16-18 · 17 hrs** · [Take the quiz](quiz.html?t=4.2)

**Study**
- `docker run` flags: `-d`, `-p`, `-e`, `-v`, `--rm`, `--memory`
- Bridge networks, container DNS, port mapping
- Volumes vs bind mounts, and where data lives
- Logs and debugging: `docker logs`, `exec`, `inspect`, `stats`
- Docker Compose for multi-container apps

**Lab**
- Run Postgres with a named volume, remove the container, start a new one, and confirm the data is still there
- Write a `compose.yaml` with an app and a database talking by service name
- Start a container with `--memory 64m` and cause an OOM kill (exit code 137)

**Done when** you can debug a container that starts and immediately exits.

## 4.3 Registries and container security

**Weeks 19-21 · 17 hrs** · [Take the quiz](quiz.html?t=4.3)

**Study**
- Registries: Docker Hub, ECR, GHCR. Tags vs digests
- Pushing and pulling, authentication
- Non-root users, read-only filesystems, dropping capabilities
- Minimal base images (alpine, distroless)
- Scanning with Trivy or Docker Scout, and fixing CVEs by updating the base

**Lab**
- Push your image to GitHub Container Registry or ECR (free tier)
- Run `trivy image <your-image>` and read the report
- Rebuild on a newer base image and compare the vulnerability count

**Done when** you can explain why `:latest` and root users are risky.
