Alright Lavkush! Here's how to **fully update and set up your Samba share** so that **only `lavkush` and `modi`** can access `/samba/myshared` with **full read/write access**.

---

## 🔄 1. **Create Users (if not done yet)**

```bash
sudo useradd -M -s /sbin/nologin lavkush
sudo useradd -M -s /sbin/nologin modi
```

---

## 🔐 2. **Set Samba Passwords**

```bash
sudo smbpasswd -a lavkush
sudo smbpasswd -a modi
```

---

## 👥 3. **Create a Group and Add Users**

```bash
sudo groupadd sambashare
sudo usermod -aG sambashare lavkush
sudo usermod -aG sambashare modi
```

---

## 📁 4. **Set Folder Permissions**

```bash
sudo chown -R root:sambashare /samba/myshared
sudo chmod -R 2770 /samba/myshared
```

> This gives the `sambashare` group full access to the directory.

---

## ⚙️ 5. **Update Samba Config**

Edit `/etc/samba/smb.conf` and make sure this section exists:

```ini
[MyShared]
   path = /samba/myshared
   browseable = yes
   read only = no
   guest ok = no
   valid users = @sambashare
   force group = sambashare
   create mask = 0660
   directory mask = 2770
```

✅ **Explanation**:

- `valid users = @sambashare` → only users in the group `sambashare` (lavkush and modi) can access.
    
- `force group = sambashare` → any file created will belong to the `sambashare` group.
    
- `0660` → read/write for owner and group.
    
- `2770` → full access to folder for group members; others blocked.
    

---

## 🔄 6. **Restart Samba**

```bash
sudo systemctl restart smb nmb
```

---

## ✅ Test from another system:

- In Linux:
    
    ```bash
    smbclient //YOUR-IP/MyShared -U lavkush
    ```
    
- In Windows Explorer:
    
    ```
    \\YOUR-IP\MyShared
    ```
    

Login with username: `lavkush` or `modi`, and the passwords you set.

---

Let me know if you want to:

- Make a **read-only** user
    
- Auto-mount the share on client boot
    
- Use different folders for different users
    

I'm happy to help tweak things.