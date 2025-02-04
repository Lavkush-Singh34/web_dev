```js
const swiper = new Swiper('.hero-swiper', {

// Optional parameters

loop: true,

effect: 'fade', // Use fade effect for smooth transitions

speed: 1000,

autoplay: {

delay: 5000,

disableOnInteraction: false,

},

  

// Navigation arrows

navigation: {

nextEl: '.swiper-button-next',

prevEl: '.swiper-button-prev',

},

  

// Pagination

pagination: {

el: '.swiper-pagination',

clickable: true,

},

  

// Add some custom styles for fade effect

fadeEffect: {

crossFade: true

}

});
```