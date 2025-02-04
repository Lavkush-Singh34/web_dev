<!-- Hero Section with Image Slider -->
<div class="relative w-full h-[600px] overflow-hidden">
    <!-- Slider Container -->
    <div class="flex transition-transform duration-500 ease-in-out" id="slider">
        <!-- Slide 1 -->
        <div class="w-full flex-shrink-0">
            <img src="path/to/academic-image1.jpg" alt="Students in classroom" class="w-full h-[600px] object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-40">
                <div class="container mx-auto px-6 h-full flex items-center">
                    <div class="text-white">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">Excellence in Education</h1>
                        <p class="text-xl md:text-2xl">Nurturing minds, building futures</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 2 -->
        <div class="w-full flex-shrink-0">
            <img src="path/to/academic-image2.jpg" alt="Science lab" class="w-full h-[600px] object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-40">
                <div class="container mx-auto px-6 h-full flex items-center">
                    <div class="text-white">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">Hands-on Learning</h1>
                        <p class="text-xl md:text-2xl">Discovering through experience</p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Slide 3 -->
        <div class="w-full flex-shrink-0">
            <img src="path/to/academic-image3.jpg" alt="Sports activity" class="w-full h-[600px] object-cover">
            <div class="absolute inset-0 bg-black bg-opacity-40">
                <div class="container mx-auto px-6 h-full flex items-center">
                    <div class="text-white">
                        <h1 class="text-4xl md:text-6xl font-bold mb-4">All-Round Development</h1>
                        <p class="text-xl md:text-2xl">Beyond academics</p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Navigation Buttons -->
    <button class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg" onclick="prevSlide()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
        </svg>
    </button>
    <button class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-lg" onclick="nextSlide()">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
        </svg>
    </button>

    <!-- Slide Indicators -->
    <div class="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        <button class="h-2 w-2 rounded-full bg-white" onclick="goToSlide(0)"></button>
        <button class="h-2 w-2 rounded-full bg-white opacity-50" onclick="goToSlide(1)"></button>
        <button class="h-2 w-2 rounded-full bg-white opacity-50" onclick="goToSlide(2)"></button>
    </div>
</div>

<script>
let currentSlide = 0;
const slider = document.getElementById('slider');
const slides = document.querySelectorAll('#slider > div').length;

function updateSlider() {
    slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    updateIndicators();
}

function updateIndicators() {
    const indicators = document.querySelectorAll('.absolute.bottom-4 button');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('opacity-50', index !== currentSlide);
    });
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % slides;
    updateSlider();
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + slides) % slides;
    updateSlider();
}

function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
}

// Auto-advance slides every 5 seconds
setInterval(nextSlide, 5000);
</script>