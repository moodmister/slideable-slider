const sliders = document.querySelectorAll('.image-wrapper');
const slideshowWrapper = document.querySelector('#slideshow-wrapper');
let currentSlideIndex = 0;

let changeSlide = false;

(function() {
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[0].style.display = 'block';
})();

let touchStart = 0;
let touchEnd = 0;

function getCurrentIndex() {
  for (let i = 0; i < sliders.length; i++) {
    if (sliders[i].style.display == 'block') {
      return i;
    }
  }
}

function showNextSlide() {
  let currentIndex = (getCurrentIndex() + 1 > sliders.length - 1) ? 0 : getCurrentIndex() + 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'block';
}

function showPreviousSlide() {
  let currentIndex = (getCurrentIndex() - 1 < 0) ? 2 : getCurrentIndex() - 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'block';
}

slideshowWrapper.addEventListener('touchstart', function(event) {
  touchStart = event.targetTouches[0].clientX;
});
slideshowWrapper.addEventListener('touchend', function(event) {
  touchEnd = event.changedTouches[0].clientX;
  if (!!touchStart && !!touchEnd) {
    let nextSlide = (touchStart - touchEnd > 0) ? true : false;
    if (nextSlide) {
      showNextSlide();
    } else {
      showPreviousSlide();
    }
  }
});
