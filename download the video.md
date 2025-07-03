You're doing the right thing by checking for security loopholes. From the screenshot, your video is being served using **HLS (HTTP Live Streaming)**, and the `.m3u8` file (`480p.m3u8`, `1080p.m3u8`, etc.) is the playlist that references `.ts` video segments.

---

### 🔓 How Videos Can Be Downloaded from HLS Streams

Anyone with access to `.m3u8` URLs **can technically download the full video** using tools like:

#### 1. **`ffmpeg`**

This is the most powerful method:

```bash
ffmpeg -i "https://www.codprog.com/videos/001-react-introfe842d3d-a/480p/480p.m3u8" -c copy output.mp4
```

> This command fetches all the `.ts` segments and combines them into a single `.mp4` file.

---

### 🔐 How to Prevent HLS Video Downloading

To make it hard for users to download your content:

#### ✅ 1. **Use DRM (Digital Rights Management)**

- Implement **Widevine** (Google), **FairPlay** (Apple), or **PlayReady** (Microsoft) via services like:
    
    - [Shaka Player + Widevine](https://shaka-player-demo.appspot.com/docs/api/tutorial-drm-config.html)
        
    - [Bitmovin](https://bitmovin.com/)
        
    - [Mux](https://mux.com/)
        
- This is **the only reliable method** to fully secure HLS content.
    

#### ✅ 2. **Use Encrypted HLS**

- Encrypt `.ts` segments with AES-128 or SAMPLE-AES.
    
- Store encryption keys securely; don’t expose them in the `.m3u8` file.
    
- Example `.m3u8` segment with encryption:
    
    ```m3u8
    #EXT-X-KEY:METHOD=AES-128,URI="https://yourdomain.com/secret.key"
    ```
    

#### ✅ 3. **Tokenized URLs / Expiring Links**

- Generate HLS links with a **JWT token** or time-limited signature.
    
- Expire the URL after a few minutes.
    
- Cloudflare and AWS CloudFront both support signed URLs.
    

#### ✅ 4. **Disable CORS for `.m3u8` Files**

- This makes it harder for external tools/websites to load your video files.
    
- Example (in NGINX):
    
    ```nginx
    location ~ \.m3u8$ {
        add_header Access-Control-Allow-Origin "none";
    }
    ```
    

#### ✅ 5. **Watermarking**

- Apply visible/invisible watermark (e.g. email, user ID) to deter screen recording.
    
- Services like **VdoCipher** offer secure video streaming with watermarking and DRM.
    

---

### Summary

Yes, your video can currently be downloaded using tools like `ffmpeg`. To protect it:

- ✅ Use DRM or Encrypted HLS.
    
- ✅ Enable tokenized, expiring `.m3u8` links.
    
- ✅ Avoid exposing direct `.m3u8` URLs in plain HTML or DevTools.
    

Let me know if you want help implementing any of these — especially DRM or AES encryption.

