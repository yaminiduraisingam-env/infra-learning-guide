# Phase 5: Kubernetes

Weeks 12-14 (Jan 18 - Feb 7) · 18 hours · [Back to contents](TOC.md)

**Why it matters:** the env0 self-hosted agent is installed with Helm on Kubernetes. Understanding pods, services and RBAC lets you debug customer installs.

**Resources**
- From your mentor (Pluralsight):
  - [Kubernetes learning path](https://app.pluralsight.com/learning-paths/dc7ecfd4-4685-40b7-a8b3-eae7a0940a7f) (66h 8m)
  - [Amazon EKS Quickstart](https://app.pluralsight.com/ilx/amazon-eks-quickstart/course-overview) (3h 12m)
- [Kubernetes Basics tutorials](https://kubernetes.io/docs/tutorials/kubernetes-basics/) (free)
- [Kubernetes Concepts docs](https://kubernetes.io/docs/concepts/)
- [Killercoda](https://killercoda.com) (free in-browser labs)
- [Pluralsight](https://www.pluralsight.com): search "Kubernetes fundamentals" or "Kubernetes for developers"
- [Kelsey Hightower, "Kubernetes the Hard Way"](https://github.com/kelseyhightower/kubernetes-the-hard-way) (optional, after week 14)
- [Helm docs](https://helm.sh/docs/)
- [kind](https://kind.sigs.k8s.io) for the local cluster

**Setup:** install `kubectl`, `kind` and `helm`. Create a cluster with `kind create cluster`.

## Week by week: what to open

Main course: **[Learn Kubernetes Basics](https://kubernetes.io/docs/tutorials/kubernetes-basics/)** (6 interactive modules, free) plus the **[Concepts](https://kubernetes.io/docs/concepts/)** section of the Kubernetes docs. Video: your mentor's [Kubernetes learning path](https://app.pluralsight.com/learning-paths/dc7ecfd4-4685-40b7-a8b3-eae7a0940a7f) on Pluralsight. It is 66 hours and this phase has 18, so take the first courses in order for about 5 hours a week and stop when you've covered the topics in the table. The rest is reference for later. Optional: [Linux Foundation "Introduction to Kubernetes"](https://training.linuxfoundation.org/training/introduction-to-kubernetes/) (edX, free). After week 14, or in the buffer week: [Amazon EKS Quickstart](https://app.pluralsight.com/ilx/amazon-eks-quickstart/course-overview) (3 hrs), since env0 customers often run on EKS.

| Week | Do this | Covers |
| --- | --- | --- |
| 12 | Pluralsight Kubernetes path: first ~5 hrs (architecture, Pods, Deployments). Basics modules 1-3 (create a cluster, deploy an app, explore). Concepts docs: Pods, ReplicaSets, Deployments, Namespaces | 5.1 |
| 13 | Pluralsight Kubernetes path: next ~5 hrs (Services, config, storage). Basics modules 4-6 (expose, scale, update). Concepts docs: Service, Ingress, ConfigMaps, Secrets, Volumes | 5.2, 5.3 |
| 14 | Pluralsight Kubernetes path: next ~5 hrs (RBAC, scheduling, Helm where covered). Docs: [Using RBAC Authorization](https://kubernetes.io/docs/reference/access-authn-authz/rbac/), resource requests and limits, taints and tolerations. [Helm docs](https://helm.sh/docs/): quickstart and "Using Helm". Then the env0 `agent/helm` lab | 5.4, 5.5 |

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
