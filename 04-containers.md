# Phase 4: Containers

Weeks 10-11 (Jan 4 - Jan 17) · 12 hours · [Back to contents](TOC.md)

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

Main course: **[Docker "Get started" guide](https://docs.docker.com/get-started/)** (free, hands-on). Your mentor's [Docker Fundamentals for Developers](https://app.pluralsight.com/learning-paths/1398903d-e314-4744-98c3-94bb86d1c1da) path is the video version. It is 44 hours, and this phase has 12, so watch about 6 hours of video a week from the start of the path, in order. Skip ahead when you reach topics beyond images, containers, volumes, networking and Compose. Treat the rest as reference for later.

| Week | Do this | Covers |
| --- | --- | --- |
| 10 | [Hypervisor Types, Architecture, and Selection](https://app.pluralsight.com/ilx/video-courses/8a253bae-f92e-456c-95a9-09591254c033/course-overview) (1 hr, VMs vs containers). Pluralsight Docker path: first modules. Get started: containerize an app, then the Dockerfile and image-building best practices pages (layers, cache, multi-stage). Pluralsight: images and Dockerfile modules | 4.1, start of 4.2 |
| 11 | Pluralsight Docker path: next modules (volumes, networking, Compose). Get started: persisting data (volumes), networking, Docker Compose. Docs: push to a registry. Trivy "Getting started" | rest of 4.2, 4.3 |

## 4.1 Images, layers and Dockerfiles

**Week 10 · 4 hrs** · [Take the quiz](quiz.html?t=4.1)

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

**Weeks 10-11 · 4 hrs** · [Take the quiz](quiz.html?t=4.2)

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

**Week 11 · 4 hrs** · [Take the quiz](quiz.html?t=4.3)

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
