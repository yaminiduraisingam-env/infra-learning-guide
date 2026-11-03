// Each question: [question, correct answer, wrong1, wrong2, wrong3, explanation].
// The correct answer is always first here; quiz.html shuffles the options.
window.PHASES = [
  { id: 1, name: "Linux and kernel" },
  { id: 2, name: "Networking" },
  { id: 3, name: "AWS (Cloud Practitioner)" },
  { id: 4, name: "Containers" },
  { id: 5, name: "Kubernetes" },
  { id: 6, name: "Terraform / OpenTofu" },
];

window.QUIZZES = {
  // ---------- Phase 1: Linux and kernel ----------
  "1.1": {
    phase: 1,
    title: "Processes and signals",
    q: [
      ["Which system call creates a new process by duplicating the calling process?", "fork()", "exec()", "wait()", "kill()", "fork() copies the process. exec() replaces the current program with a new one, which is why shells call fork() then exec()."],
      ["A process has exited, but its parent has not yet read its exit status. What is it called?", "A zombie", "An orphan", "A daemon", "A thread", "A zombie keeps only its process table entry until the parent calls wait(). An orphan is a live process whose parent died."],
      ["Which signal cannot be caught, blocked or ignored?", "SIGKILL", "SIGTERM", "SIGINT", "SIGHUP", "SIGKILL (and SIGSTOP) are handled by the kernel directly. SIGTERM can be caught so a program can clean up."],
      ["What does 'kill -15 1234' do?", "Sends SIGTERM, asking process 1234 to exit gracefully", "Sends SIGKILL to process 1234", "Pauses process 1234", "Restarts process 1234", "Signal 15 is SIGTERM. Signal 9 is SIGKILL."],
      ["Why does PID 1 in a container matter?", "It must reap zombie children and handle signals like SIGTERM", "It manages the container's network", "It schedules CPU time for the other processes", "It mounts the container's volumes", "If PID 1 ignores SIGTERM, 'docker stop' or a pod shutdown waits for the timeout and then force-kills it."],
    ],
  },
  "1.2": {
    phase: 1,
    title: "Memory and CPU",
    q: [
      ["A 4-core machine shows a load average of 4.0. What does that roughly mean?", "About 4 tasks are running or waiting to run, so the cores are about fully used", "CPU usage is 4 percent", "4 processes have crashed", "Memory is 400 percent used", "Load average counts runnable tasks (and on Linux, tasks in uninterruptible I/O). Compare it to the core count."],
      ["What does the OOM killer do?", "Kills a process when the system or cgroup runs out of memory", "Compresses memory pages", "Adds swap space automatically", "Restarts the kernel", "The kernel picks a victim by an 'oom score' and sends SIGKILL."],
      ["What does virtual memory give each process?", "Its own private address space, mapped to physical RAM by page tables", "Direct access to physical RAM", "A copy of the whole disk", "Unlimited memory", "Isolation is the main point. Pages are mapped to RAM on demand."],
      ["What is swap used for?", "Moving rarely used memory pages to disk to free RAM", "Caching network packets", "Storing the kernel image", "Speeding up the CPU", "Swap is slower than RAM, so heavy swapping makes a machine crawl."],
      ["In top, a high 'wa' value points to what?", "CPUs idle while waiting on disk or network I/O", "CPUs fully busy running user code", "Too many zombie processes", "Out of memory", "High iowait means the bottleneck is storage or the network, not the CPU."],
    ],
  },
  "1.3": {
    phase: 1,
    title: "Filesystems and permissions",
    q: [
      ["What access does 'chmod 750 file' give?", "Owner rwx, group r-x, others none", "Owner rwx, group rwx, others r-x", "Owner r-x, group rwx, others none", "Everyone rwx", "7 = rwx, 5 = r-x, 0 = no access, in the order owner, group, others."],
      ["What does an inode store?", "File metadata and where its data blocks are, but not the file name", "The file name and its contents", "Only the file permissions", "The directory tree", "Names live in directory entries that point to inodes."],
      ["You delete the original file name. Which link still opens the data?", "A hard link", "A symbolic link", "Both of them", "Neither", "A hard link is another name for the same inode. A symlink just stores a path, so it dangles."],
      ["'df -h' shows free space, but writes fail with 'No space left on device'. What do you check?", "df -i, because you may be out of inodes", "free -m", "uptime", "ps aux", "Millions of tiny files can use every inode before the disk fills."],
      ["What does 'everything is a file' mean in Linux?", "Devices, pipes and sockets are exposed through the file interface, like /dev and /proc", "Every file is stored in RAM", "Directories do not exist", "All files have the same permissions", "It lets the same read and write calls and tools work on many kinds of resources."],
    ],
  },
  "1.4": {
    phase: 1,
    title: "Kernel, syscalls and boot",
    q: [
      ["What is a system call?", "The controlled way a user-space program asks the kernel to do privileged work", "A phone call to support", "A shell built-in command", "A function inside a library only", "Opening a file, creating a socket and starting a process all go through syscalls."],
      ["Which tool shows the system calls a process makes?", "strace", "top", "ping", "chmod", "strace is often the fastest way to see why a program hangs or can't find a file."],
      ["What is the usual boot order?", "Firmware (UEFI) then bootloader then kernel then init (systemd)", "Kernel then firmware then bootloader then init", "Init then kernel then bootloader", "Bootloader then init then kernel", "Firmware starts the bootloader, which loads the kernel, which starts PID 1."],
      ["What does systemd do as PID 1?", "Starts and supervises services (units)", "Compiles the kernel", "Manages DNS only", "Replaces the bootloader", "systemd also handles logging (journald), timers and mounts."],
      ["Which command prints kernel messages such as hardware errors and OOM kills?", "dmesg", "ls", "cat /etc/hosts", "whoami", "journalctl -k shows the same ring buffer on systemd machines."],
    ],
  },
  "1.5": {
    phase: 1,
    title: "Namespaces and cgroups",
    q: [
      ["Namespaces limit what a process can ___, while cgroups limit what it can ___.", "see; use", "use; see", "write; read", "start; stop", "Namespaces isolate the view (PIDs, network, mounts). cgroups cap resources (CPU, memory, I/O)."],
      ["Which namespace gives a container its own process IDs?", "pid", "net", "mnt", "user", "In its pid namespace the container's first process is PID 1."],
      ["A container exceeds its memory cgroup limit. What happens?", "The kernel OOM-kills a process in that container", "The host reboots", "The container gets more memory", "Nothing, memory limits are advisory", "Memory limits are hard limits. CPU limits throttle instead of kill."],
      ["A container exits with code 137. What is the likely reason?", "It was killed by SIGKILL (128 + 9), often the OOM killer", "A normal successful exit", "A syntax error in the Dockerfile", "A DNS failure", "Exit codes above 128 mean 'killed by signal (code - 128)'."],
      ["Do containers run their own kernel?", "No, they share the host's kernel", "Yes, each has its own kernel", "Only on Linux hosts", "Only when privileged", "VMs have their own kernel, containers do not. That is why a container is lighter, and less isolated."],
    ],
  },

  // ---------- Phase 2: Networking ----------
  "2.1": {
    phase: 2,
    title: "OSI, TCP/IP and IP addressing",
    q: [
      ["At which OSI layer does IP operate?", "Layer 3, network", "Layer 2, data link", "Layer 4, transport", "Layer 7, application", "IP routes packets between networks. Ethernet is layer 2, TCP and UDP are layer 4."],
      ["How many usable host addresses are in a /24?", "254", "256", "255", "24", "256 addresses minus the network and broadcast addresses."],
      ["Which of these is a private IPv4 address?", "172.16.5.4", "172.32.0.1", "11.0.0.1", "192.169.1.1", "Private ranges: 10.0.0.0/8, 172.16.0.0/12 (172.16 to 172.31) and 192.168.0.0/16."],
      ["How many addresses are in a /16 in total?", "65,536", "65,534", "16,384", "256", "2 to the power of (32 - 16) = 65,536."],
      ["Is 10.0.1.5 inside 10.0.0.0/24?", "No, /24 covers 10.0.0.0 to 10.0.0.255", "Yes", "Only when NAT is on", "Only on AWS", "The third octet is 1, not 0, so it falls in 10.0.1.0/24."],
    ],
  },
  "2.2": {
    phase: 2,
    title: "TCP, UDP and troubleshooting tools",
    q: [
      ["What is the TCP three-way handshake?", "SYN, SYN-ACK, ACK", "ACK, SYN, FIN", "HELLO, HELLO-ACK, DONE", "GET, 200, ACK", "Both sides agree on starting sequence numbers before data flows."],
      ["Which protocol do DNS queries normally use?", "UDP on port 53 (TCP for large replies)", "TCP on port 80", "ICMP", "UDP on port 443", "DNS falls back to TCP when the answer is too big or for zone transfers."],
      ["Which command lists listening TCP ports and their processes?", "ss -tlnp", "ping", "dig", "chmod", "ss replaced netstat on modern Linux."],
      ["What does 'connection refused' usually tell you, compared with 'connection timed out'?", "Refused: the host answered but nothing listens on that port. Timed out: packets are probably dropped.", "Refused: a firewall dropped it. Timed out: nothing listens.", "They always mean the same thing", "Refused means DNS failed", "A timeout points to a firewall, security group or routing problem. Refused means you reached the host."],
      ["Which tool shows each network hop and where latency or loss starts?", "mtr or traceroute", "df", "strace", "top", "mtr combines ping and traceroute over time."],
    ],
  },
  "2.3": {
    phase: 2,
    title: "DNS",
    q: [
      ["Which record maps a name to an IPv4 address?", "A", "AAAA", "CNAME", "MX", "AAAA is IPv6. CNAME is an alias to another name. MX is for mail."],
      ["What is a CNAME record?", "An alias that points one name to another name", "An IPv6 address", "A mail server", "A nameserver delegation", "A CNAME cannot sit at the zone apex alongside other records."],
      ["What does TTL control?", "How long resolvers may cache the answer", "How many hops a packet can take", "How long a TLS cert is valid", "How fast the DNS server replies", "A long TTL means a changed record takes longer to reach everyone."],
      ["Which is the correct lookup order for an uncached name?", "Stub resolver, recursive resolver, root, TLD, authoritative server", "Authoritative, root, TLD, recursive", "Root, stub, authoritative, TLD", "TLD, root, recursive, stub", "The recursive resolver does the walking on your behalf."],
      ["You changed a DNS record, but some users still reach the old IP. Most likely cause?", "Caches hold the old answer until the TTL expires", "The new IP is invalid", "TLS is broken", "The router is down", "Lower the TTL before a planned change, not after."],
    ],
  },
  "2.4": {
    phase: 2,
    title: "HTTP and TLS",
    q: [
      ["What does HTTP 502 Bad Gateway mean?", "A gateway or proxy got an invalid response from the upstream server", "The client is not logged in", "The page was not found", "The request was too large", "504 is a gateway timeout. 502 means the upstream replied badly or not at all."],
      ["What is the difference between 401 and 403?", "401: not authenticated. 403: authenticated but not allowed", "401: not allowed. 403: not authenticated", "They are the same", "401 is a server error", "Think 'who are you?' (401) versus 'you can't do that' (403)."],
      ["What does TLS provide?", "Encryption, integrity and server authentication", "Only compression", "Only caching", "Faster routing", "Client certificates (mutual TLS) add client authentication."],
      ["How does a client decide to trust a server certificate?", "It chains to a trusted CA and the name matches the host", "The certificate is long enough", "The server IP is public", "The certificate is self-signed", "Both the chain and the hostname are checked."],
      ["A customer behind a corporate proxy sees 'x509: certificate signed by unknown authority'. Likely cause?", "The proxy re-signs TLS traffic with a company CA the tool does not trust", "The customer's DNS is wrong", "The API is down", "The port is closed", "Fix: add the proxy's CA certificate to the trust store used by the tool or agent."],
    ],
  },
  "2.5": {
    phase: 2,
    title: "Routing, NAT, firewalls and load balancers",
    q: [
      ["What does NAT do?", "Rewrites IP addresses so private hosts can share a public IP", "Encrypts traffic", "Resolves names", "Assigns MAC addresses", "Source NAT lets many private instances reach the internet through one address."],
      ["What does the route 0.0.0.0/0 mean?", "The default route, used when no more specific route matches", "Block all traffic", "Loopback traffic", "The local subnet only", "In a VPC, 0.0.0.0/0 to an internet gateway makes a subnet public."],
      ["What does 'stateful firewall' mean?", "Return traffic for an allowed connection is automatically allowed", "It stores logs on disk", "It blocks everything by default", "It only filters by port", "AWS security groups are stateful. Network ACLs are stateless."],
      ["What can a layer 7 load balancer do that a layer 4 one cannot?", "Route by HTTP host name or path", "Forward TCP packets", "Use IP addresses", "Run health checks", "L7 understands HTTP, so one balancer can serve many sites."],
      ["Two routes match a destination. Which one wins?", "The most specific one (longest prefix)", "The first one listed", "The one with the lowest number", "The default route", "A /24 route beats a /16 route for an address in both."],
    ],
  },

  // ---------- Phase 3: AWS ----------
  "3.1": {
    phase: 3,
    title: "Cloud concepts and global infrastructure",
    q: [
      ["What is an Availability Zone?", "One or more data centers in a Region, isolated from other zones", "A single server", "A country", "A CDN location", "Spread workloads over several AZs for high availability."],
      ["What does elasticity mean?", "Scaling resources up and down automatically with demand", "Paying upfront for a year", "Using one big server", "Storing data forever", "Elasticity is about matching capacity to demand, and paying only for what you use."],
      ["In the shared responsibility model, what is AWS responsible for?", "Security of the cloud: hardware, facilities and the global network", "Your IAM policies", "Your application code", "Your data encryption choices", "You handle security in the cloud: your data, identities, configuration."],
      ["Cloud computing moves spending from ___ to ___.", "Capital expense; operating expense", "Operating expense; capital expense", "Salaries; hardware", "Taxes; subscriptions", "No upfront hardware purchase, you pay as you go."],
      ["Which is one of the AWS Well-Architected pillars?", "Sustainability", "Marketing", "Compliance auditing", "Staffing", "The six: operational excellence, security, reliability, performance efficiency, cost optimization, sustainability."],
    ],
  },
  "3.2": {
    phase: 3,
    title: "IAM and security",
    q: [
      ["What is the best practice for the root user?", "Enable MFA and avoid using it for daily tasks", "Share it with the team", "Create access keys for it", "Use it for all deployments", "Create IAM users or roles for everyday work."],
      ["What is an IAM role?", "An identity with temporary credentials that a user or service can assume", "A permanent password for a person", "A group of users", "A type of encryption key", "Roles are how AWS services and cross-account access get permissions without long-lived keys."],
      ["Policy evaluation: an explicit Deny and an Allow both apply. What is the result?", "Denied", "Allowed", "Whichever came first", "An error", "An explicit deny always wins."],
      ["What is least privilege?", "Granting only the permissions needed to do the job", "Giving admin to everyone for speed", "Using one shared role", "Blocking all access", "Start small and add permissions when needed."],
      ["Which service creates and manages encryption keys?", "AWS KMS", "AWS Shield", "Amazon Route 53", "AWS Budgets", "Secrets Manager stores secrets such as passwords. KMS manages the keys used to encrypt data."],
    ],
  },
  "3.3": {
    phase: 3,
    title: "Compute and containers",
    q: [
      ["Which EC2 purchase option is cheapest for fault-tolerant work that can be interrupted?", "Spot Instances", "On-Demand", "Dedicated Hosts", "Reserved Instances", "Spot uses spare capacity at a big discount, but AWS can reclaim it."],
      ["What is true of AWS Lambda?", "You run code without managing servers and pay per invocation and duration", "You manage the OS patches", "It runs forever", "It only runs containers", "Lambda has a maximum run time of 15 minutes per invocation."],
      ["What is the difference between ECS and EKS?", "ECS is AWS's own container orchestrator. EKS is managed Kubernetes", "ECS is Kubernetes. EKS is AWS's own", "They are identical", "EKS is serverless functions", "Both can run on EC2 or Fargate."],
      ["What is AWS Fargate?", "Serverless compute for containers, so no instances to manage", "A database service", "A CDN", "A VPN", "You define CPU and memory for the task, AWS runs it."],
      ["What does EC2 Auto Scaling do?", "Adds or removes instances based on demand or schedule", "Backs up S3 buckets", "Encrypts disks", "Buys Reserved Instances", "It helps with both availability and cost."],
    ],
  },
  "3.4": {
    phase: 3,
    title: "Storage and databases",
    q: [
      ["What type of storage is Amazon S3?", "Object storage", "Block storage", "File system storage", "Relational database", "Objects live in buckets and are addressed by key."],
      ["What is Amazon EBS?", "Block storage volumes attached to EC2 instances", "Object storage", "A CDN", "A managed queue", "EBS volumes live in one AZ. Snapshots are stored in S3."],
      ["What is DynamoDB?", "A managed NoSQL key-value and document database", "A managed relational database", "A data warehouse", "A file share", "It scales to huge throughput with single-digit millisecond latency."],
      ["What is Amazon RDS?", "A managed relational database service (MySQL, PostgreSQL and others)", "A NoSQL database", "An object store", "A cache", "AWS handles patching, backups and failover."],
      ["Which option is the lowest-cost archive storage?", "S3 Glacier storage classes", "S3 Standard", "EBS gp3", "EFS", "Glacier trades retrieval time for price."],
    ],
  },
  "3.5": {
    phase: 3,
    title: "Networking and content delivery",
    q: [
      ["What is a VPC?", "A logically isolated virtual network in AWS", "A virtual private computer", "A VPN client", "A DNS record", "You choose the IP range, subnets and routes."],
      ["What makes a subnet public?", "Its route table has a route to an internet gateway", "It has a big CIDR block", "It uses a security group", "It sits in the first AZ", "Without that route the subnet is private."],
      ["What is the difference between a security group and a network ACL?", "Security groups are stateful and instance-level. NACLs are stateless and subnet-level", "Security groups are stateless. NACLs are stateful", "They are identical", "NACLs apply to instances", "With a NACL you must allow return traffic explicitly."],
      ["What is Amazon Route 53?", "A DNS service", "A load balancer", "A CDN", "A database", "It also does domain registration and health checks."],
      ["What does CloudFront do?", "Caches content at edge locations close to users (CDN)", "Runs containers", "Stores backups", "Encrypts keys", "It lowers latency and offloads the origin."],
    ],
  },
  "3.6": {
    phase: 3,
    title: "Billing, pricing and exam review",
    q: [
      ["Which tool estimates the cost of a planned architecture?", "AWS Pricing Calculator", "Cost Explorer", "CloudTrail", "AWS Config", "Cost Explorer looks at spend that already happened."],
      ["What does Cost Explorer do?", "Visualizes and analyzes past and current spend", "Blocks expensive resources", "Estimates future architectures", "Encrypts invoices", "Use it to find which services or tags cost the most."],
      ["What does AWS Budgets do?", "Sends alerts when cost or usage passes a threshold", "Deletes unused resources", "Gives discounts", "Moves data to cheaper regions", "It can alert on actual or forecast spend."],
      ["What is a benefit of consolidated billing in AWS Organizations?", "One bill for many accounts, plus combined volume discounts", "Free support", "Shared passwords", "Automatic backups", "Usage across accounts is combined for tiered pricing."],
      ["What does AWS Trusted Advisor provide?", "Recommendations on cost, security, performance and more", "Hardware repair", "Domain registration", "Code reviews", "The set of checks available depends on your support plan."],
    ],
  },

  "3.7": {
    phase: 3,
    title: "Scaling and decoupling architectures",
    q: [
      ["Which service lets a producer and a consumer work independently by holding messages in a queue?", "Amazon SQS", "Amazon Route 53", "AWS KMS", "Amazon EBS", "The producer sends and moves on. The consumer pulls messages at its own pace."],
      ["What is the difference between SNS and SQS?", "SNS pushes a message to many subscribers. SQS holds messages until a consumer pulls them", "SNS stores messages for weeks. SQS pushes to many subscribers", "They are identical", "SNS is a database", "A common pattern is SNS fanning out to several SQS queues."],
      ["What can an Application Load Balancer do that a Network Load Balancer is not built for?", "Route by HTTP host name or path", "Handle TCP traffic", "Use static IPs", "Run in several AZs", "ALB works at layer 7. NLB works at layer 4 and is built for very high throughput."],
      ["What does a target tracking scaling policy do?", "Adds or removes instances to keep a metric, such as average CPU, near a target value", "Scales only at a fixed time", "Backs up the instances", "Changes the instance type", "It works like a thermostat for capacity."],
      ["Why put a queue between a web tier and a worker tier?", "It absorbs traffic spikes, and each tier can scale and fail independently", "It makes the web tier faster to deploy", "It encrypts the messages", "It replaces the load balancer", "If the workers are down, requests wait in the queue instead of being lost."],
    ],
  },

  // ---------- Phase 4: Containers ----------
  "4.1": {
    phase: 4,
    title: "Images, layers and Dockerfiles",
    q: [
      ["What is the difference between an image and a container?", "An image is a read-only template. A container is a running instance of it", "They are the same", "A container is the template", "An image is a running VM", "Many containers can start from one image."],
      ["How should you order Dockerfile steps to use the build cache well?", "Put rarely changing steps first and frequently changing ones last", "Put copying source code first", "Random order", "Alphabetical order", "A changed layer invalidates every layer after it."],
      ["What is the difference between ENTRYPOINT and CMD?", "ENTRYPOINT sets the fixed executable. CMD gives default arguments that can be overridden", "They are identical", "CMD cannot be overridden", "ENTRYPOINT is only for builds", "Common pattern: ENTRYPOINT is the tool, CMD is its default args."],
      ["What does a multi-stage build achieve?", "A smaller final image that contains only what is needed to run", "Faster internet", "Parallel containers", "Free storage", "Build tools stay in the build stage and are not copied into the final image."],
      ["What does .dockerignore do?", "Excludes files from the build context sent to the builder", "Hides running containers", "Deletes images", "Blocks network access", "Keep .git, node_modules and secrets out of the context."],
    ],
  },
  "4.2": {
    phase: 4,
    title: "Running containers, networking and volumes",
    q: [
      ["What does 'docker run -p 8080:80 nginx' do?", "Maps host port 8080 to container port 80", "Maps container 8080 to host 80", "Opens both ports to the internet only", "Runs two containers", "The format is host:container."],
      ["You remove a container. What happens to data written in its writable layer?", "It is lost, unless stored in a volume", "It is saved to the image", "It moves to the host automatically", "It is encrypted", "Use volumes or bind mounts for data that must survive."],
      ["How do containers on the default bridge network reach the internet?", "Through NAT on the host", "Directly with public IPs", "Through a VPN", "They cannot", "Each container gets a private IP behind the host."],
      ["Which command shows a container's stdout and stderr?", "docker logs", "docker ps", "docker inspect", "docker images", "Containers should log to stdout so the platform can collect it."],
      ["Which command opens a shell inside a running container?", "docker exec -it <container> sh", "docker run sh", "docker attach images", "docker build sh", "exec runs a new process inside the container's namespaces."],
    ],
  },
  "4.3": {
    phase: 4,
    title: "Registries and container security",
    q: [
      ["What does a container registry do?", "Stores and distributes images (for example Docker Hub or ECR)", "Runs containers", "Schedules pods", "Monitors CPU", "You push and pull images by name and tag."],
      ["Why is the ':latest' tag risky in production?", "It is mutable, so it can point to different images over time", "It is slower", "It is encrypted", "It does not exist", "Pin a version tag or an image digest for repeatable deploys."],
      ["Why avoid running containers as root?", "A container escape or bug has more power on the host", "Root is slower", "Root cannot read files", "Docker forbids it", "Use a USER instruction with a non-root user."],
      ["What is the benefit of minimal base images such as distroless?", "Fewer packages, so a smaller attack surface and fewer CVEs", "Faster CPUs", "Better DNS", "More features", "Less software also means less to patch."],
      ["What does image scanning do?", "Finds known vulnerabilities in the packages inside an image", "Speeds up pulls", "Rewrites the Dockerfile", "Deletes old tags", "Tools include Trivy and Docker Scout."],
    ],
  },

  // ---------- Phase 5: Kubernetes ----------
  "5.1": {
    phase: 5,
    title: "Architecture and core objects",
    q: [
      ["Which control plane component stores the cluster state?", "etcd", "kubelet", "kube-proxy", "The container runtime", "etcd is a consistent key-value store. Losing it means losing cluster state."],
      ["What does a Deployment manage?", "ReplicaSets, which manage Pods", "Nodes", "Namespaces", "Volumes only", "A rolling update creates a new ReplicaSet and scales the old one down."],
      ["What is a Pod?", "The smallest deployable unit: one or more containers sharing network and storage", "A virtual machine", "A cluster node", "A Docker image", "Containers in a Pod share an IP and can talk over localhost."],
      ["What does the kubelet do?", "Runs on each node and makes sure the containers in assigned Pods are running", "Stores cluster state", "Routes external traffic", "Builds images", "It reports node and Pod status to the API server."],
      ["What does 'declarative' mean in Kubernetes?", "You declare the desired state and controllers work to match it", "You run commands step by step", "You write scripts for each change", "Nothing is stored", "Controllers constantly reconcile actual state to desired state."],
    ],
  },
  "5.2": {
    phase: 5,
    title: "Services, ingress and DNS",
    q: [
      ["What is a ClusterIP Service?", "A stable virtual IP reachable only inside the cluster", "A public load balancer", "A node port", "A DNS record outside the cluster", "It is the default Service type."],
      ["How does a Service find its Pods?", "By matching label selectors", "By Pod name", "By node name", "By image name", "Pods that match the selector and are Ready become endpoints."],
      ["What does an Ingress do?", "Routes external HTTP(S) traffic to Services by host or path, via an ingress controller", "Stores secrets", "Schedules Pods", "Assigns IPs to nodes", "An Ingress resource does nothing without a controller such as nginx."],
      ["What is the in-cluster DNS name of Service 'web' in namespace 'prod'?", "web.prod.svc.cluster.local", "prod.web.cluster", "web.svc.prod", "web.cluster.prod.local", "Pods in the same namespace can just use 'web'."],
      ["What does a NodePort Service do?", "Opens the same port (30000 to 32767) on every node", "Creates a cloud load balancer", "Hides the Service", "Only works on one node", "A LoadBalancer Service builds on top of NodePort."],
    ],
  },
  "5.3": {
    phase: 5,
    title: "Config, secrets and storage",
    q: [
      ["What is a ConfigMap for?", "Non-sensitive configuration injected as env vars or files", "Passwords", "Container images", "Node labels", "Use a Secret for sensitive values."],
      ["Are Kubernetes Secrets encrypted by default?", "No, they are only base64-encoded unless encryption at rest is enabled", "Yes, with AES-256 always", "Yes, with TLS", "They are hashed", "Also restrict access with RBAC."],
      ["What is the relationship between a PVC and a PV?", "A PVC requests storage and binds to a matching PV", "A PV requests a PVC", "They are the same object", "PVs are only for nodes", "With a StorageClass, the PV is created dynamically."],
      ["Why use a StatefulSet?", "It gives Pods stable names and stable storage", "It is faster than a Deployment", "It runs one Pod per node", "It runs jobs to completion", "Used for databases and other stateful apps."],
      ["How long does an emptyDir volume last?", "As long as the Pod exists on the node", "Forever", "Until the node reboots only", "Until the image changes", "Data survives container restarts, not Pod deletion."],
    ],
  },
  "5.4": {
    phase: 5,
    title: "RBAC, scheduling and resources",
    q: [
      ["What is the difference between a Role and a ClusterRole?", "A Role is namespaced. A ClusterRole is cluster-wide", "A Role is cluster-wide", "They are identical", "ClusterRoles are only for nodes", "A ClusterRole can also be bound within one namespace with a RoleBinding."],
      ["What does a RoleBinding do?", "Grants a Role's permissions to users, groups or service accounts", "Creates a Role", "Deletes permissions", "Schedules Pods", "Roles define permissions. Bindings attach them to subjects."],
      ["What is the difference between resource requests and limits?", "Requests are used for scheduling. Limits are caps enforced at runtime", "Limits are for scheduling", "They are the same", "Requests are enforced at runtime", "Exceeding a memory limit gets the container killed."],
      ["A Pod stays Pending with 'Insufficient cpu'. What does that mean?", "No node has enough unreserved CPU for the Pod's requests", "The image is missing", "DNS is broken", "The node is rebooting", "Lower the request or add capacity."],
      ["What do taints and tolerations do?", "A taint repels Pods from a node unless the Pod tolerates it", "They encrypt traffic", "They label Pods", "They create volumes", "Used for dedicated nodes, for example GPU nodes."],
    ],
  },
  "5.5": {
    phase: 5,
    title: "Helm and troubleshooting",
    q: [
      ["What is a Helm chart?", "A package of templated Kubernetes manifests configured by values", "A monitoring dashboard", "A container image", "A cluster", "Override defaults with values.yaml or --set."],
      ["What does 'helm upgrade --install' do?", "Installs the release if missing, otherwise upgrades it", "Deletes the release", "Only upgrades", "Only lints", "It makes a command safe to run repeatedly in pipelines."],
      ["What is CrashLoopBackOff?", "A container keeps starting and crashing, with growing delays between restarts", "The image is missing", "The node is full", "DNS failed", "Check 'kubectl logs --previous' for the last crash."],
      ["What is ImagePullBackOff usually caused by?", "A wrong image name or tag, or missing pull credentials", "Too much memory use", "A bad liveness probe", "A full disk", "Check the Pod events for the exact registry error."],
      ["Which command shows a Pod's events, such as scheduling and pull errors?", "kubectl describe pod", "kubectl get nodes", "kubectl version", "kubectl config", "Events are at the bottom of the describe output."],
    ],
  },

  // ---------- Phase 6: Terraform ----------
  "6.1": {
    phase: 6,
    title: "IaC concepts and the core workflow",
    q: [
      ["What is the standard Terraform workflow order?", "init, plan, apply", "apply, plan, init", "plan, init, destroy", "validate, destroy, init", "write the config, init, plan, apply."],
      ["What does 'terraform init' do?", "Downloads providers and modules and sets up the backend", "Applies changes", "Deletes state", "Formats code", "Run it again after adding a provider, module or changing the backend."],
      ["What does 'terraform plan' do?", "Shows the changes Terraform would make, without making them", "Creates resources", "Destroys resources", "Locks the state forever", "Save a plan with -out and apply that exact plan later."],
      ["What is a main benefit of infrastructure as code?", "Repeatable, versioned and reviewable infrastructure", "No need for cloud accounts", "Free hosting", "Faster CPUs", "Changes go through pull requests like application code."],
      ["What does 'terraform destroy' do?", "Destroys all resources managed by the configuration and state", "Deletes the .tf files", "Only destroys one resource", "Deletes the provider", "Use -target carefully, and prefer removing the code and applying."],
    ],
  },
  "6.2": {
    phase: 6,
    title: "HCL: variables, outputs and expressions",
    q: [
      ["What is the difference between a variable and a local?", "A variable is an input. A local is a named computed value used inside the module", "A local is an input", "They are the same", "Variables cannot have defaults", "Locals avoid repeating expressions."],
      ["What are output values used for?", "Exposing values from a module or the root configuration", "Importing resources", "Locking state", "Defining providers", "A module's outputs are read as module.<name>.<output>."],
      ["Why prefer for_each over count for most collections?", "Resources are keyed, so removing one item doesn't shift the others", "It is always faster", "count is deprecated", "for_each uses less memory", "With count, removing the middle item reindexes the rest and may recreate resources."],
      ["What does sensitive = true on a variable do?", "Hides the value in CLI output, but it is still stored in state", "Encrypts it in state", "Removes it from state", "Makes it optional", "Protect the state file as it may hold secrets."],
      ["How can you set a variable through the environment?", "Export TF_VAR_<name>", "Export VAR_<name>", "Use a .env file only", "It is not possible", "Other ways: -var, -var-file, terraform.tfvars and *.auto.tfvars."],
    ],
  },
  "6.3": {
    phase: 6,
    title: "Providers, resources and data sources",
    q: [
      ["What is a provider?", "A plugin that lets Terraform talk to an API such as AWS", "A cloud account", "A state backend", "A module registry", "Pin provider versions in required_providers."],
      ["What is a data source for?", "Reading information about existing resources", "Creating resources", "Destroying resources", "Storing state", "Data blocks are read-only lookups."],
      ["When does Terraform infer a dependency between resources?", "When one resource references an attribute of another", "When they share a file", "When they have similar names", "Never, you always declare it", "References build the dependency graph automatically."],
      ["When do you need depends_on?", "When a dependency exists but isn't visible through any reference", "On every resource", "To order files", "To import resources", "Use it sparingly, because it can make plans less precise."],
      ["What does lifecycle { prevent_destroy = true } do?", "Makes Terraform error on any plan that would destroy the resource", "Stops the cloud from deleting it", "Encrypts the resource", "Hides it from the plan", "It protects against Terraform destroying it, not against console deletion."],
    ],
  },
  "6.4": {
    phase: 6,
    title: "State, backends and drift",
    q: [
      ["What is the purpose of Terraform state?", "It maps your configuration to the real resources Terraform manages", "It stores your .tf code", "It caches providers", "It logs every command", "Without state Terraform wouldn't know what it already created."],
      ["What does state locking prevent?", "Two runs writing to the state at the same time", "Anyone reading the state", "Provider upgrades", "Variable changes", "Locking support depends on the backend."],
      ["What does importing a resource do?", "Adds an existing real resource to state so Terraform can manage it", "Creates a copy of the resource", "Deletes the resource", "Downloads a module", "You still need to write the matching configuration (or use an import block)."],
      ["What is drift?", "Real infrastructure differs from what Terraform last recorded or declared", "A slow provider", "A syntax error", "A locked state", "terraform plan (or plan -refresh-only) detects drift."],
      ["How should you change state manually when you must?", "With 'terraform state' subcommands, never by editing the file", "Edit the JSON by hand", "Delete the file", "Rename the backend", "State can hold secrets, so protect access as well."],
    ],
  },
  "6.5": {
    phase: 6,
    title: "Modules",
    q: [
      ["What is a module?", "A reusable group of resources in a directory", "A provider", "A state file", "A workspace", "Every configuration is a module. The one you run in is the root module."],
      ["What is the root module?", "The working directory where you run Terraform", "The registry's top module", "The first child module", "The provider", "Child modules are called from the root with module blocks."],
      ["How do you read an output of a child module?", "module.<name>.<output_name>", "var.<name>", "local.<name>", "output.<name>", "Inputs go in through the module block arguments."],
      ["How do you pin a module from the registry?", "Use the version argument in the module block", "It cannot be pinned", "Use a lifecycle block", "Use a provider block", "For git sources, pin with a ?ref= tag."],
      ["Which are valid module sources?", "Local path, Terraform Registry and Git", "Only the registry", "Only local paths", "Only S3 buckets", "Other sources include HTTP URLs and S3 or GCS buckets."],
    ],
  },
  "6.6": {
    phase: 6,
    title: "Workspaces, secrets and exam review",
    q: [
      ["What does a Terraform workspace give you?", "Separate state files for the same configuration", "A separate copy of the code", "A new provider", "A new cloud account", "The default workspace is called 'default'."],
      ["Why are workspaces a weak way to separate prod and staging?", "They share the same backend and credentials and are easy to mix up", "They cost money", "They are deprecated", "They cannot hold state", "Many teams use separate directories, accounts or env0 environments instead."],
      ["How does OpenTofu relate to Terraform?", "It is an open-source fork that stays largely compatible, and adds features such as state encryption", "It is a different language", "It is Terraform's paid edition", "It only works on AWS", "The Terraform Associate exam covers HashiCorp Terraform."],
      ["What does 'terraform fmt' do?", "Rewrites configuration to the canonical style", "Validates provider credentials", "Applies changes", "Imports resources", "Run it before committing. 'terraform validate' checks syntax and consistency."],
      ["Where should secret values for Terraform come from?", "A secrets manager or protected environment variables, never committed to git", "A tfvars file committed to the repo", "Comments in the code", "Output values", "Mark variables sensitive and protect the state file."],
    ],
  },
};
