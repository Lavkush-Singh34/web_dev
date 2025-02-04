# Best

```html
<!DOCTYPE html>

<html lang="en">

  

<head>

<meta charset="UTF-8">

<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Education Partners</title>

<script src="https://cdn.tailwindcss.com"></script>

<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />

<style>

.swiper-wrapper {

display: flex;

transition-timing-function: linear !important;

}

</style>

</head>

  

<body class="bg-gray-600 flex items-center justify-center py-10">

<div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">

<h2 class="text-center text-2xl font-bold mb-4">Education Partners</h2>

<div class="swiper mySwiper">

<div class="swiper-wrapper">

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Skill India" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Digital India" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Skill India" class="h-16">

</div>

<div class="swiper-slide flex justify-center">

<img src="https://placehold.co/400x300" alt="Digital India" class="h-16">

</div>

</div>

</div>

</div>

  

<script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>

<script>

document.addEventListener("DOMContentLoaded", function () {

const swiper = new Swiper(".mySwiper", {

slidesPerView: "auto",

spaceBetween: 20,

loop: true,

speed: 5000,

autoplay: {

delay: 0,

disableOnInteraction: false,

},

freeMode: true,

freeModeMomentum: false,

breakpoints: {

640: { slidesPerView: 2 },

768: { slidesPerView: 3 },

1024: { slidesPerView: 4 }

}

});

});

</script>

</body>

  

</html>
```


# With BreakPoints
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Education Partners</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
    <style>
        .swiper-wrapper {
            display: flex;
            transition-timing-function: linear !important;
        }
    </style>
</head>

<body class="bg-gray-600 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-4">Education Partners</h2>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const swiper = new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                freeMode: true,
                freeModeMomentum: false,
                breakpoints: {
                    640: { slidesPerView: 2 },
                    768: { slidesPerView: 3 },
                    1024: { slidesPerView: 4 }
                }
            });
        });
    </script>
</body>

</html>

```
# single logo at a time

```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Education Partners</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
</head>

<body class="bg-gray-600 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-4">Education Partners</h2>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const swiper = new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                freeMode: true,
                freeModeMomentum: false,
            });
        });
    </script>
</body>

</html>

```

# same speed
```html
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Education Partners</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css" />
    <style>
        .swiper-wrapper {
            display: flex;
            transition-timing-function: linear !important;
        }
    </style>
</head>

<body class="bg-gray-600 flex items-center justify-center min-h-screen">
    <div class="w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
        <h2 class="text-center text-2xl font-bold mb-4">Education Partners</h2>
        <div class="swiper mySwiper">
            <div class="swiper-wrapper">
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="EduVirtua" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Edufy Hub" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Skill India" class="h-16">
                </div>
                <div class="swiper-slide flex justify-center">
                    <img src="https://placehold.co/400x300" alt="Digital India" class="h-16">
                </div>
            </div>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js"></script>
    <script>
        document.addEventListener("DOMContentLoaded", function () {
            const swiper = new Swiper(".mySwiper", {
                slidesPerView: "auto",
                spaceBetween: 20,
                loop: true,
                speed: 5000,
                autoplay: {
                    delay: 0,
                    disableOnInteraction: false,
                },
                freeMode: true,
                freeModeMomentum: false,
            });
        });
    </script>
</body>

</html>

```
