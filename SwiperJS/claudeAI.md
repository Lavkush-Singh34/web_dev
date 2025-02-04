```html
<!-- Step 1: Add Required Dependencies -->
<!DOCTYPE html>
<html>
<head>
    <!-- Add Swiper CSS -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.2.0/swiper-bundle.min.css">
    
    <style>
        /* Step 2: Add Basic Styling */
        .swiper {
            width: 100%;
            height: 400px;
        }
        
        .swiper-slide {
            /* Center slide text vertically and horizontally */
            display: flex;
            justify-content: center;
            align-items: center;
            
            /* Basic slide styling */
            background: #f1f1f1;
            font-size: 24px;
            padding: 20px;
        }
        
        /* Optional: Style navigation buttons */
        .swiper-button-next,
        .swiper-button-prev {
            color: #000;
        }
        
        /* Optional: Style pagination bullets */
        .swiper-pagination-bullet {
            background: #000;
        }
    </style>
</head>
<body>
    <!-- Step 3: Create HTML Structure -->
    <div class="swiper">
        <div class="swiper-wrapper">
            <!-- Slides -->
            <div class="swiper-slide">Slide 1</div>
            <div class="swiper-slide">Slide 2</div>
            <div class="swiper-slide">Slide 3</div>
            <div class="swiper-slide">Slide 4</div>
        </div>
        
        <!-- Navigation buttons -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
        
        <!-- Pagination -->
        <div class="swiper-pagination"></div>
        
        <!-- Scrollbar -->
        <div class="swiper-scrollbar"></div>
    </div>

    <!-- Step 4: Add Swiper JS -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Swiper/10.2.0/swiper-bundle.min.js"></script>
    
    <!-- Step 5: Initialize Swiper -->
    <script>
        const swiper = new Swiper('.swiper', {
            // Optional parameters
            direction: 'horizontal',
            loop: true,
            
            // Enable auto-play
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            
            // Enable pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            
            // Scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
                draggable: true,
            },
            
            // Responsive breakpoints
            breakpoints: {
                // when window width is >= 320px
                320: {
                    slidesPerView: 1,
                    spaceBetween: 10
                },
                // when window width is >= 480px
                480: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // when window width is >= 768px
                768: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    </script>
</body>
</html>
```