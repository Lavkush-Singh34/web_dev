```sh
╭─lavkush@archlinux ~     
╰─➤  docker ps -q  
1d9ad01a40bc  
53d020c546b1  
a0e976ead85f  
╭─lavkush@archlinux ~     
╰─➤
```

```sh
docker exec <or run > -it alpine <or container id> bash <or sh>
docker exit <or run > -it alpine <or container id> bash <or sh>

``` 
### 1️⃣ Stop and Remove All Containers

```sh
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)
```

### 2️⃣ Remove All Images

```sh
docker rmi $(docker images -q) -f
```

### 3️⃣ (Optional) Clean Up Everything (Volumes, Networks, etc.)

```sh
docker system prune -a -f --volumes
```

This will completely clean up your Docker environment. Let me know if you need help! 🚀

