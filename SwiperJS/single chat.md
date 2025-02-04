```html
<!DOCTYPE html>

<html lang="en">

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Swiper CSS -->

<link rel="stylesheet" href="https://unpkg.com/swiper/swiper-bundle.min.css" />

  

<title>Swiper with Pexels Images</title>

  

<style>

/* Container size *//* Center the Swiper container */

body {

display: flex;

justify-content: center;

align-items: center;

height: 100vh; /* Full viewport height */

margin: 0;

background-color: #f4f4f4; /* Optional background color */

}

  

/* Container size */

.swiper-container {

width: 100%;

/* max-width: 800px; */

/* height: 500px; */

height: 100vh;

}

  

/* Ensure images fit */

.swiper-slide {

display: flex;

justify-content: center;

align-items: center;

}

  

.swiper-slide img {

width: 100%;

height: 100%;

object-fit: cover;

border-radius: 10px; /* Optional rounded corners */

}

  

</style>

</head>

<body>

  

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

  

<!-- Swiper JS -->

<script src="https://unpkg.com/swiper/swiper-bundle.min.js"></script>

  

<script>

document.addEventListener("DOMContentLoaded", function () {

const swiper = new Swiper('.swiper-container', {

loop: true, // Infinite loop

slidesPerView: 1, // Show one slide at a time

spaceBetween: 10, // Space between slides

autoplay: {

delay: 1100, // Auto-slide every 3 seconds

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

});

</script>

  

</body>

</html>
```

# make images in center (optional)
```css
/* Center the Swiper container */
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    margin: 0;
    background-color: #f4f4f4; /* Optional background color */
}

/* Container size */
.swiper-container {
    width: 100%;
    max-width: 800px;
    height: 500px;
}

/* Ensure images fit */
.swiper-slide {
    display: flex;
    justify-content: center;
    align-items: center;
}

.swiper-slide img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 10px; /* Optional rounded corners */
}
```

