# Phase 2: Networking

Weeks 4-6 (Nov 23 - Dec 13) · 18 hours · [Back to contents](TOC.md)

**Why it matters:** most customer problems with agents, proxies, VCS connections and cloud accounts are network problems. You should be able to say where in the path a failure is.

**Resources**
- [Coursera: "The Bits and Bytes of Computer Networking"](https://www.coursera.org/learn/computer-networking) (Google)
- [Cloudflare Learning Center](https://www.cloudflare.com/learning/) (free): DNS, TLS, load balancing
- [*High Performance Browser Networking*](https://hpbn.co) by Ilya Grigorik (free online)
- [Practical Networking](https://www.practicalnetworking.net): subnetting, NAT, routing
- [Pluralsight](https://www.pluralsight.com): search "networking fundamentals" or "TCP/IP"

## Week by week: what to open

Main course: **[Coursera, "The Bits and Bytes of Computer Networking"](https://www.coursera.org/learn/computer-networking)** (Google, 5 modules, about 20 hours). Watch at 1.25x and skip quizzes you can already ace. Use the free sources below to fill gaps.

| Week | Do this | Covers |
| --- | --- | --- |
| 4 | Coursera module 1 (network layers, IP addressing, subnetting). [Practical Networking](https://www.practicalnetworking.net): subnetting | 2.1, start of 2.2 |
| 5 | Coursera module 2 (TCP, UDP, ports) and module 3 (DNS, DHCP, NAT). Cloudflare: [What is DNS?](https://www.cloudflare.com/learning/dns/what-is-dns/) | rest of 2.2, 2.3, start of 2.4 |
| 6 | Coursera module 4 (connecting to the internet, routing), then skim module 5. Cloudflare: [What is TLS?](https://www.cloudflare.com/learning/ssl/transport-layer-security-tls/) and [What is load balancing?](https://www.cloudflare.com/learning/performance/what-is-load-balancing/) | rest of 2.4, 2.5 |

If you finish early, read the TLS chapter of [*High Performance Browser Networking*](https://hpbn.co).

## 2.1 OSI, TCP/IP and IP addressing

**Week 4 · 5 hrs** · [Take the quiz](quiz.html?t=2.1)

**Study**
- OSI and TCP/IP layers, what each layer does
- Ethernet, MAC addresses, ARP
- IPv4 addresses, CIDR notation, subnet masks
- Private ranges (10/8, 172.16/12, 192.168/16)
- Subnetting by hand: how many hosts in a /24, /20, /16

**Lab**
- Subnet a `10.0.0.0/16` into four equal subnets on paper
- `ip addr` and `ip route` on your machine: find your IP, mask and gateway
- Use `ipcalc` (or an online calculator) to check your answers

**Done when** you can split a CIDR block without a calculator for /24 to /28.

## 2.2 TCP, UDP and troubleshooting tools

**Weeks 4-5 · 4 hrs** · [Take the quiz](quiz.html?t=2.2)

**Study**
- TCP: handshake, ports, retransmits, FIN vs RST
- UDP and when it is used
- Symptoms: "connection refused" vs "timed out" vs "reset"
- Tools: `ss -tlnp`, `curl -v`, `nc -vz`, `ping`, `mtr`, `tcpdump`

**Lab**
- Start `python3 -m http.server 8000` and connect with `curl` and `nc`
- Connect to a closed port and a firewalled port, compare the errors
- Capture a handshake with `tcpdump -i lo port 8000`

**Done when** you can tell from the error whether to check the server, the firewall or the route.

## 2.3 DNS

**Week 5 · 3 hrs** · [Take the quiz](quiz.html?t=2.3)

**Study**
- How a lookup works: stub, recursive, root, TLD, authoritative
- Record types: A, AAAA, CNAME, MX, TXT, NS
- TTL and caching, and why DNS changes seem to "take time"
- Private DNS and split-horizon DNS
- Tools: `dig`, `dig +trace`, `nslookup`, `/etc/resolv.conf`

**Lab**
- `dig +trace example.com` and follow each step
- Compare answers from `dig @8.8.8.8` and `dig @1.1.1.1`
- Read `/etc/resolv.conf` and note the nameserver and search domain

**Done when** you can explain why one user sees the new IP and another sees the old one.

## 2.4 HTTP and TLS

**Weeks 5-6 · 3 hrs** · [Take the quiz](quiz.html?t=2.4)

**Study**
- HTTP methods, headers, status codes (2xx, 3xx, 4xx, 5xx, especially 401, 403, 502, 504)
- HTTP/1.1 vs HTTP/2, keep-alive
- TLS handshake, certificates, CAs, the chain of trust
- Proxies, TLS inspection and custom CA certificates
- Tools: `curl -v`, `openssl s_client -connect host:443`

**Lab**
- `curl -v https://example.com` and find the TLS version and certificate subject
- `openssl s_client -showcerts` and read the chain
- Make a self-signed cert and watch `curl` reject it, then trust it with `--cacert`

**Done when** you can explain "x509: certificate signed by unknown authority" and how to fix it.

## 2.5 Routing, NAT, firewalls and load balancers

**Week 6 · 3 hrs** · [Take the quiz](quiz.html?t=2.5)

**Study**
- Routing tables, default gateway, longest prefix match
- NAT and PAT, why private hosts can reach the internet
- Stateful vs stateless firewalls
- L4 vs L7 load balancers, health checks
- Forward vs reverse proxy

**Lab**
- `ip route get 8.8.8.8` and explain each field
- Draw a diagram: laptop, home router (NAT), internet, server
- On a Linux VM, list firewall rules with `iptables -L -n` or `nft list ruleset`

**Done when** you can draw the path of a request from a browser to a server behind a load balancer.
