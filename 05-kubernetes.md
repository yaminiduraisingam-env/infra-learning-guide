# Phase 5: Kubernetes

Weeks 12-14 (Jan 18 - Feb 7) · 18 hours · [Back to contents](TOC.md)

**Why it matters:** the env0 self-hosted agent is installed with Helm on Kubernetes. Understanding pods, services and RBAC lets you debug customer installs.

**Resources**
- kubernetes.io "Kubernetes Basics" tutorials (free)
- killercoda.com (free in-browser labs)
- Pluralsight: search "Kubernetes fundamentals" or "Kubernetes for developers"
- Kelsey Hightower, "Kubernetes the Hard Way" (optional, after week 14)
- Helm docs (helm.sh)

**Setup:** install `kubectl`, `kind` and `helm`. Create a cluster with `kind create cluster`.

## Week by week: what to open

Main course: **kubernetes.io "Learn Kubernetes Basics"** (6 interactive modules, free) plus the **Concepts** section of the Kubernetes docs. Optional video: Linux Foundation "Introduction to Kubernetes" (edX, free) or a Pluralsight Kubernetes fundamentals course.

| Week | Do this | Covers |
| --- | --- | --- |
| 12 | Basics modules 1-3 (create a cluster, deploy an app, explore). Concepts docs: Pods, ReplicaSets, Deployments, Namespaces | 5.1 |
| 13 | Basics modules 4-6 (expose, scale, update). Concepts docs: Service, Ingress, ConfigMaps, Secrets, Volumes | 5.2, 5.3 |
| 14 | Docs: "Using RBAC Authorization", resource requests and limits, taints and tolerations. Helm docs: quickstart and "Using Helm". Then the env0 `agent/helm` lab | 5.4, 5.5 |

## 5.1 Architecture and core objects

**Week 12 · 6 hrs** · [Take the quiz](quiz.html?t=5.1)

**Study**
- Control plane: API server, etcd, scheduler, controller manager
- Nodes: kubelet, kube-proxy, container runtime
- Pods, ReplicaSets, Deployments, Jobs, CronJobs, DaemonSets
- Namespaces, labels and selectors
- Declarative YAML and `kubectl apply`

**Lab**
- Deploy nginx with 3 replicas, delete a pod, and watch it come back
- Do a rolling update by changing the image tag, then roll back
- `kubectl get -o yaml` on a Deployment and read its fields

**Done when** you can explain what happens between `kubectl apply` and a running pod.

## 5.2 Services, ingress and DNS

**Week 13 · 4 hrs** · [Take the quiz](quiz.html?t=5.2)

**Study**
- Service types: ClusterIP, NodePort, LoadBalancer
- Endpoints and label selectors
- Ingress and ingress controllers
- Cluster DNS (CoreDNS), service names and search domains
- NetworkPolicies (just the idea)
- Link back to Phase 2: DNS, NAT, L7 routing

**Lab**
- Expose your Deployment with a ClusterIP Service, call it from another pod with `curl`
- Install ingress-nginx on `kind` and route two paths to two Services
- `kubectl exec` into a pod and run `nslookup <service>`

**Done when** you can trace a request from outside the cluster to a pod.

## 5.3 Config, secrets and storage

**Week 13 · 3 hrs** · [Take the quiz](quiz.html?t=5.3)

**Study**
- ConfigMaps and Secrets as env vars and files
- Why Secrets are only base64 by default
- Volumes, PersistentVolumes, PersistentVolumeClaims, StorageClasses
- StatefulSets

**Lab**
- Mount a ConfigMap as a file, change it and watch the file update
- Create a PVC, mount it in a pod, delete the pod, confirm the data survives

**Done when** you can explain how a pod gets a persistent disk.

## 5.4 RBAC, scheduling and resources

**Week 14 · 3 hrs** · [Take the quiz](quiz.html?t=5.4)

**Study**
- ServiceAccounts, Roles, ClusterRoles, RoleBindings
- Requests and limits, QoS classes, OOMKilled
- Node selectors, affinity, taints and tolerations
- Probes: liveness, readiness, startup
- Link back to Phase 1: cgroups enforce limits

**Lab**
- Create a ServiceAccount that can only list pods, test with `kubectl auth can-i`
- Set a memory limit lower than the app needs and watch the pod get OOMKilled
- Taint a node and see a pod stay Pending

**Done when** you can read a Pending or OOMKilled pod and say why.

## 5.5 Helm and troubleshooting

**Week 14 · 2 hrs** · [Take the quiz](quiz.html?t=5.5)

**Study**
- Charts, values, releases, `helm install/upgrade/rollback/uninstall`
- `helm template` and `helm get values`
- Troubleshooting flow: `get`, `describe`, `logs`, `logs --previous`, `events`
- Common states: Pending, CrashLoopBackOff, ImagePullBackOff, Evicted

**Lab**
- Install a public chart (for example nginx or podinfo) with a custom values file
- Break it on purpose (bad image tag, bad probe) and fix it using only `describe` and `logs`
- **env0 tie-in:** in the repo, read `agent/helm`, run `helm template` on it with sample values, and list the resources it creates

**Done when** you can walk through a debug of a pod that will not start.
