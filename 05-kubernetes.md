# Phase 5: Kubernetes

Weeks 22-34 (Mar 29 - Jun 27) · 78 hours · [Back to contents](TOC.md)

**Why it matters:** the env0 self-hosted agent is installed with Helm on Kubernetes. Understanding pods, services and RBAC lets you debug customer installs.

**Resources**
- From your mentor (Pluralsight):
  - [Kubernetes learning path](https://app.pluralsight.com/learning-paths/dc7ecfd4-4685-40b7-a8b3-eae7a0940a7f) (66h 8m)
  - [Amazon EKS Quickstart](https://app.pluralsight.com/ilx/amazon-eks-quickstart/course-overview) (3h 12m)
- [Kubernetes Basics tutorials](https://kubernetes.io/docs/tutorials/kubernetes-basics/) (free)
- [Kubernetes Concepts docs](https://kubernetes.io/docs/concepts/)
- [Killercoda](https://killercoda.com) (free in-browser labs)
- [Pluralsight](https://www.pluralsight.com): search "Kubernetes fundamentals" or "Kubernetes for developers"
- [Kelsey Hightower, "Kubernetes the Hard Way"](https://github.com/kelseyhightower/kubernetes-the-hard-way) (extra, after week 34)
- [Helm docs](https://helm.sh/docs/)
- [kind](https://kind.sigs.k8s.io) for the local cluster

**Setup:** install `kubectl`, `kind` and `helm`. Create a cluster with `kind create cluster`.

## Week by week: what to open

Mandatory: your mentor's [Kubernetes learning path](https://app.pluralsight.com/learning-paths/dc7ecfd4-4685-40b7-a8b3-eae7a0940a7f) on Pluralsight (about 66 hours) and [Amazon EKS Quickstart](https://app.pluralsight.com/ilx/amazon-eks-quickstart/course-overview) (3 hours). Finish both. Add [Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/) and the [Concepts docs](https://kubernetes.io/docs/concepts/) for hands-on practice. Follow the path in order. The hours below are a pace target (about 5.5 hours a week), so you finish the path by week 33.

| Week | Do this | Covers |
| --- | --- | --- |
| 22 | Kubernetes path: hours 1-6. Basics modules 1-3 | 5.1 |
| 23 | Kubernetes path: hours 7-11. Concepts: Pods, ReplicaSets, Deployments | 5.1 |
| 24 | Kubernetes path: hours 12-17. Concepts: Namespaces, labels, Jobs, DaemonSets | 5.1 |
| 25 | Kubernetes path: hours 18-22. Lab and quiz 5.1 | 5.1 |
| 26 | Kubernetes path: hours 23-28. Basics modules 4-6 | 5.2 |
| 27 | Kubernetes path: hours 29-33. Concepts: Service, Ingress | 5.2 |
| 28 | Kubernetes path: hours 34-39. DNS, NetworkPolicies. Lab and quiz 5.2 | 5.2 |
| 29 | Kubernetes path: hours 40-44. ConfigMaps, Secrets | 5.3 |
| 30 | Kubernetes path: hours 45-50. Volumes, PV and PVC, StatefulSets. Lab and quiz 5.3 | 5.3 |
| 31 | Kubernetes path: hours 51-55. [RBAC](https://kubernetes.io/docs/reference/access-authn-authz/rbac/) | 5.4 |
| 32 | Kubernetes path: hours 56-61. Requests and limits, scheduling, probes. Lab and quiz 5.4 | 5.4 |
| 33 | Kubernetes path: hours 62-66 (finish the path). [Helm docs](https://helm.sh/docs/), then the env0 `agent/helm` lab | 5.5 |
| 34 | [Amazon EKS Quickstart](https://app.pluralsight.com/ilx/amazon-eks-quickstart/course-overview) (3 hrs). Troubleshooting practice. Quiz 5.5 | 5.5 |

## 5.1 Architecture and core objects

**Weeks 22-25 · 24 hrs** · [Take the quiz](quiz.html?t=5.1)

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

**Weeks 26-28 · 18 hrs** · [Take the quiz](quiz.html?t=5.2)

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

**Weeks 29-30 · 12 hrs** · [Take the quiz](quiz.html?t=5.3)

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

**Weeks 31-32 · 12 hrs** · [Take the quiz](quiz.html?t=5.4)

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

**Weeks 33-34 · 12 hrs** · [Take the quiz](quiz.html?t=5.5)

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
