# Phase 1: Linux and kernel

Weeks 1-3 (Nov 2 - Nov 22) · 18 hours · [Back to contents](TOC.md)

**Why it matters:** every container, Kubernetes node and agent runs on Linux. Most "weird" production problems (OOM kills, stuck processes, full disks) are Linux problems.

**Resources**
- Linux Foundation "Introduction to Linux" (free, edX)
- *The Linux Command Line* by William Shotts (free online)
- Julia Evans' zines on processes, strace and the command line (wizardzines.com)
- Pluralsight: search "Linux fundamentals" or "Linux system administration"

**Setup:** use a Linux VM or a container (`docker run -it ubuntu bash`, or Multipass on Mac) so you can break things safely.

## 1.1 Processes and signals

**Week 1 · 4 hrs** · [Take the quiz](quiz.html?t=1.1)

**Study**
- What a process is: PID, parent, state (running, sleeping, zombie)
- fork and exec, and how a shell starts a program
- Signals: SIGTERM, SIGKILL, SIGINT, SIGHUP and how to send them
- Foreground, background, `nohup`, job control
- Tools: `ps`, `top`, `htop`, `pstree`, `kill`, `pgrep`

**Lab**
- Start a `sleep 1000`, find it with `ps`, stop it with SIGTERM
- Write a small script that traps SIGTERM and prints a message
- Create a zombie on purpose (short Python or C example) and spot it in `ps`

**Done when** you can explain why PID 1 in a container must handle signals.

## 1.2 Memory and CPU

**Weeks 1-2 · 4 hrs** · [Take the quiz](quiz.html?t=1.2)

**Study**
- Virtual memory, pages, RSS vs virtual size
- Page cache: why "free" memory looks low and that is fine
- Swap and the OOM killer
- CPU: load average, user vs system time, iowait, context switches
- Tools: `free -m`, `vmstat 1`, `top`, `uptime`, `dmesg | grep -i oom`

**Lab**
- Run `stress-ng --vm 1 --vm-bytes 80%` and watch `free` and `vmstat`
- Run it inside a container with `--memory 256m` and see the OOM kill
- Compare load average with the number of cores (`nproc`)

**Done when** you can tell "CPU bound", "memory bound" and "I/O bound" apart from `top` and `vmstat`.

## 1.3 Filesystems and permissions

**Weeks 2 · 4 hrs** · [Take the quiz](quiz.html?t=1.3)

**Study**
- Directory layout: `/etc`, `/var`, `/proc`, `/dev`, `/tmp`
- Inodes, hard links, symbolic links
- Permissions: rwx, `chmod`, `chown`, umask, setuid
- Mounts, `/etc/fstab`, disk usage: `df -h`, `df -i`, `du -sh`
- "Everything is a file": `/proc/<pid>/`, `/dev/null`

**Lab**
- Create a hard link and a symlink, delete the original, see what survives
- Fill a tmpfs mounted with a tiny inode count and hit "No space left"
- Read `/proc/<pid>/status` and `/proc/<pid>/fd` for a running process

**Done when** you can diagnose a "disk full" error from `df -h` and `df -i`.

## 1.4 Kernel, syscalls and boot

**Weeks 2-3 · 3 hrs** · [Take the quiz](quiz.html?t=1.4)

**Study**
- User space vs kernel space, and why syscalls exist
- What the kernel does: scheduling, memory, drivers, networking
- Boot: firmware (UEFI), bootloader, kernel, init
- systemd basics: units, `systemctl`, `journalctl`
- Tools: `strace`, `dmesg`, `uname -r`, `lsmod`

**Lab**
- `strace -f -e trace=openat ls /` and read what files it touches
- `strace -c` on a command to see which syscalls dominate
- Write and enable a tiny systemd service, then read its logs with `journalctl -u`

**Done when** you can describe what happens between pressing the power button and a login prompt.

## 1.5 Namespaces and cgroups

**Week 3 · 3 hrs** · [Take the quiz](quiz.html?t=1.5)

**Study**
- Namespaces: pid, net, mnt, uts, ipc, user
- cgroups v2: memory, CPU and I/O limits
- How Docker and Kubernetes combine the two to make a container
- Containers share the host kernel, so what that means for isolation

**Lab**
- `unshare --pid --fork --mount-proc bash`, then run `ps aux`
- `lsns` on a Docker host, and compare a container's PID on the host and inside
- Look in `/sys/fs/cgroup/` for a running container's memory limit
- Watch (Liz Rice, "Containers from scratch") and follow along

**Done when** you can explain "a container is just a process with namespaces and cgroups".
