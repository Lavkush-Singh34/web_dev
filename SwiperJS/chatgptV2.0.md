To use images from **Pexels** in your Swiper.js slider, follow these steps:

---

## **Step 1: Include Swiper.js in Your Project**

### **Option 1: Using CDN**

Add this inside your `<head>` tag:

```html
<!-- Swiper CSS -->
<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

<!-- Swiper JS -->
<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>
```

### **Option 2: Using npm (For local development)**

```bash
npm install swiper
```

Then import it in your JavaScript file:

```javascript
import Swiper from 'swiper/bundle';
import 'swiper/swiper-bundle.min.css';
```

---

## **Step 2: Add HTML Structure**

Here’s an example using **Pexels images**:

```html
<!-- Swiper -->
<div class="swiper-container">
  <div class="swiper-wrapper">
    <div class="swiper-slide">
      <img src="https://images.pexels.com/photos/414612/pexels-photo-414612.jpeg" alt="Beautiful Landscape">
    </div>
    <div class="swiper-slide">
      <img src="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg" alt="City Night View">
    </div>
    <div class="swiper-slide">
      <img src="https://images.pexels.com/photos/2104151/pexels-photo-2104151.jpeg" alt="Forest Road">
    </div>
  </div>

  <!-- Pagination -->
  <div class="swiper-pagination"></div>

  <!-- Navigation Buttons -->
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</div>
```

---

## **Step 3: Initialize Swiper in JavaScript**

Add the following inside your `<script>` tag or JavaScript file:

```javascript
const swiper = new Swiper('.swiper-container', {
  loop: true, // Infinite scrolling
  slidesPerView: 1, // Show one slide at a time
  spaceBetween: 10, // Space between slides
  autoplay: {
    delay: 3000, // Auto-slide every 3 seconds
    disableOnInteraction: false, // Keep autoplay running
  },
  pagination: {
    el: '.swiper-pagination', 
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});
```

---

## **Step 4: Add Some CSS**

To make the Swiper look better, add some basic styles:

```css
.swiper-container {
  width: 100%;
  max-width: 800px; /* Set max width */
  height: 500px;
  overflow: hidden;
}

.swiper-slide img {
  width: 100%;
  height: 100%;
  object-fit: cover; /* Ensures the image fits well */
  border-radius: 10px; /* Optional: Rounded corners */
}
```

---

## **Step 5: Open in Browser**

Save the file and open it in your browser. Your Swiper.js slider should now display **Pexels images** with navigation and autoplay.

---

### **Bonus: Get More Images from Pexels**

You can browse **[Pexels.com](https://www.pexels.com/)** to find more free images and replace the URLs.

---

That’s it! 🎉 You now have a fully working **Swiper.js image slider with Pexels images**. 🚀