# **📌  - Step-by-Step Guide**

This guide will help you securely access a remote **SMB (Windows File Sharing) drive** over SSH tunneling.

---

## **1️⃣ Create SSH Tunnel to Forward SMB Port**

Since SMB runs on **port 445**, and it is often blocked over the internet, we use SSH to create a **local tunnel**.

### **Command:**

```sh
ssh -L 1445:192.168.1.5:445 -N -f -C Admin@106.200.241.217
```

**Breakdown:**

- `-L 1445:192.168.1.5:445` → Forward local port **1445** to remote **192.168.1.5:445**
    
- `-N` → Do not execute remote commands
    
- `-f` → Run in background
    
- `-C` → Enable compression
    
- `Admin@106.200.241.217` → SSH user & remote server
    

🛠 **If you get "Address already in use" error:**  
Check which process is using the port **1445**:

```sh
sudo lsof -i :1445
```

Then, kill the process:

```sh
kill -9 <PID>
```

Now, re-run the SSH command.

---

## **2️⃣ Verify That Port Forwarding Works**

Run:

```sh
nc -zv localhost 1445
```

If successful, you should see:

```
Connection to localhost (::1) 1445 port [tcp/proxima-lm] succeeded!
```

---

## **3️⃣ List Available SMB Shares**

Check which shared folders are available:

```sh
smbclient -L localhost -p 1445
```

Enter your password when prompted.  
If successful, you’ll see a list of available **shares**.

---

## **4️⃣ Connect to SMB Share**

Now, connect to a specific SMB share:

```sh
smbclient //localhost/Network\ drive\ D -p 1445 -U lavkush
```

Enter the password when prompted.

---

## **5️⃣ File Operations in SMB Client**

Once inside, you can:

- **List files:**
    
    ```sh
    ls
    ```
    
- **Download a file:**
    
    ```sh
    get "filename.ext"
    ```
    
- **Upload a file:**
    
    ```sh
    put "localfile.txt"
    ```
    
- **Change directories:**
    
    ```sh
    cd foldername
    ```
    

---

## **6️⃣ (Optional) Mount SMB Share Locally**

To access SMB like a normal folder:

```sh
sudo mount -t cifs //localhost/Network\ drive\ D /mnt/smb -o username=lavkush,password=your_password,port=1445
```

Replace `/mnt/smb` with your preferred **mount point**.

To unmount:

```sh
sudo umount /mnt/smb
```

---

## **✅ Summary of Commands**

```sh
# 1. Create SSH Tunnel
ssh -L 1445:192.168.1.5:445 -N -f -C Admin@106.200.241.217

# 2. Verify Port Forwarding
nc -zv localhost 1445

# 3. List Available SMB Shares
smbclient -L localhost -p 1445

# 4. Connect to SMB Share
smbclient //localhost/Network\ drive\ D -p 1445 -U lavkush

# 5. Work with Files in SMB Client
ls         # List files
get file   # Download file
put file   # Upload file
cd folder  # Change directory

# 6. Mount SMB Share Locally (Optional)
sudo mount -t cifs //localhost/Network\ drive\ D /mnt/smb -o username=lavkush,password=your_password,port=1445
sudo umount /mnt/smb  # Unmount
```

---

### 🎯 **Now you can securely access your SMB share over SSH anytime!** 🚀

Let me know if you need any modifications or a script for automation. 😊

---
Yes, your method of accessing **SMB over SSH tunneling** is much **safer** than exposing SMB directly over the internet. However, security depends on how well you **configure SSH and SMB**.

---

## **✅ Why is This Secure?**

1. **SMB Traffic is Encrypted**
    
    - Normally, SMB (port 445) **does not use encryption** when accessed over the internet.
        
    - Since you’re forwarding it **inside an SSH tunnel**, all SMB communication is encrypted.
        
2. **No Direct Exposure of SMB Port**
    
    - You **aren’t opening** port 445 to the public internet.
        
    - Instead, you access it **locally via port 1445** through SSH.
        
3. **Authentication via SSH**
    
    - Hackers cannot access SMB **without first authenticating via SSH**.
        

---

## **🚨 Potential Security Risks & Fixes**

Even though SSH tunneling makes it safer, here are some potential threats & how to fix them:

### **1️⃣ Weak SSH Passwords**

❌ **Risk:** If your SSH password is weak, attackers can brute-force their way in.  
✅ **Fix:**

- Use **SSH keys instead of passwords**:
    
    ```sh
    ssh-keygen -t ed25519
    ssh-copy-id Admin@106.200.241.217
    ```
    
- **Disable password login in SSH config (`/etc/ssh/sshd_config`)**:
    
    ```
    PasswordAuthentication no
    ```
    

---

### **2️⃣ Open SSH Port to Public Internet**

❌ **Risk:** If SSH (port 22) is **exposed to the internet**, brute-force attacks will target it.  
✅ **Fix:**

- **Change SSH port** from **22 to a non-standard port** (e.g., 2222):  
    Edit `/etc/ssh/sshd_config`:
    
    ```
    Port 2222
    ```
    
    Restart SSH:
    
    ```sh
    sudo systemctl restart sshd
    ```
    
- **Use firewall rules** to allow SSH access only from your **trusted IP**:
    
    ```sh
    sudo ufw allow from YOUR_IP to any port 2222
    ```
    

---

### **3️⃣ SMB Share Misconfiguration**

❌ **Risk:** If your SMB share allows **guest access**, an attacker inside your network could access files.  
✅ **Fix:**

- **Disable guest access** in Samba config (`/etc/samba/smb.conf`):
    
    ```
    [Network drive D]
    path = /path/to/share
    valid users = lavkush
    read only = no
    guest ok = no
    ```
    
    Restart Samba:
    
    ```sh
    sudo systemctl restart smb
    ```
    

---

### **4️⃣ No Two-Factor Authentication (2FA)**

❌ **Risk:** If an attacker guesses your SSH password, they gain full access.  
✅ **Fix:**  
Enable **2FA for SSH**:

```sh
sudo apt install libpam-google-authenticator
google-authenticator
```

Then, edit `/etc/pam.d/sshd`:

```
auth required pam_google_authenticator.so
```

Restart SSH:

```sh
sudo systemctl restart sshd
```

---

## **🔒 Final Security Checklist**

✅ Use **SSH keys** instead of passwords  
✅ Disable **password authentication** in SSH  
✅ **Change SSH port** & restrict IP access  
✅ Disable **guest access** in SMB  
✅ Enable **2FA for SSH**  
✅ **Monitor SSH logs**:

```sh
sudo journalctl -u sshd | tail -n 50
```

---

### **🎯 Conclusion**

Your **SMB over SSH tunnel** is already much safer than exposing SMB directly. However, implementing the extra **security fixes** above will make it **extremely difficult** for hackers to break in.

Let me know if you need help applying these security measures! 🚀🔐

---
If you want **a free and secure way** to access your **office SMB server remotely**, here are **two options**:

### **1️⃣ Secure Option (Recommended) → WireGuard VPN (FREE & Fast)**

✅ **Why?**

- Encrypts **all** SMB traffic (no port forwarding needed).
    
- Easy setup on **Windows & Linux**.
    
- Fast and lightweight (better than OpenVPN).
    
- **Completely FREE**.
    

📌 **Steps to Set Up WireGuard VPN for Office Access**

1. **Install WireGuard on your office PC (Windows 10)**
    
    - Download from [WireGuard official site](https://www.wireguard.com/install/).
        
2. **Configure the VPN server on your office PC**
    
    - Allow incoming connections on **UDP 51820**.
        
3. **Install WireGuard on your home PC (Windows/Linux/Android)**
    
4. **Connect to your office PC using WireGuard**
    
5. **Access your SMB server as if you were in the office**
    

🔥 **No need for port forwarding** → **More secure than SSH tunneling!**

---

### **2️⃣ Alternative (Less Secure) → SSH Tunnel with Port Forwarding**

✅ **Why?**

- Works if you already have SSH access to your office.
    
- **FREE**, but needs **manual port forwarding**.
    

📌 **Steps to Set Up SSH Tunneling for SMB Access**

1. **Enable OpenSSH server** on your office Windows PC.
    
2. **Forward SMB port (445) via SSH**:
    
    ```bash
    ssh -L 1445:127.0.0.1:445 -N -f -C user@office-public-ip
    ```
    
3. **Connect to SMB using the forwarded port**:
    
    ```bash
    smbclient -L localhost -p 1445
    ```
    
    Or mount the drive in **Windows Explorer**:
    
    ```
    \\localhost@1445
    ```
    

📌 **Downsides of SSH Tunneling:**

- **Less secure** (exposes port 22 to attackers).
    
- **Slower** (SSH is not optimized for file transfers).
    

---

### **🔒 Final Security Tips for Your Office SMB Server**

1. **Use a VPN** instead of exposing SMB to the internet.
    
2. **Block all external access to port 445** on your router.
    
3. **Use strong passwords** and disable SMBv1 (SMBv1 is insecure!).
    
4. **Enable Windows Firewall to allow SMB only for VPN users.**
    
5. **Use fail2ban or SSH key authentication if using SSH.**
    

📌 **Best Choice?** **Use WireGuard VPN** (It's FREE and secure!) 🚀  
Let me know if you need **step-by-step help setting it up**! 🔥