const slideshowWrapperNoEffect
  = document
    .querySelector('#slideshow-wrapper-no-effect');
const slideesnoEffect
  = slideshowWrapperNoEffect
    .querySelectorAll('.image-wrapper');

const slideshows = {
  noEffect: {
    selector: document
      .querySelector('#slideshow-wrapper-no-effect'),
    sliders: () => slideshows
      .noEffect
      .selector
      .querySelectorAll('.image-wrapper'),
    currentIndex: 0
  },
  slideEffect: {
    selector: document
      .querySelector('#slideshow-wrapper-slide'),
    sliders: () => slideshows
      .slideEffect
      .selector
      .querySelectorAll('.image-wrapper'),
    currentIndex: 0
  }
};

let changeSlide = false;

(function() {
  for (const key of Object.keys(slideshows)) {
    slideshows[key]
      .sliders()
      .forEach(function(slider) { 
        slider.style.display = 'none'; 
      });
    slideshows[key]
      .sliders()[0]
      .style
      .display = 'flex';
  }
})();

let touchStart = 0;
let touchEnd = 0;

function getCurrentIndex(sliders) {
  for (let i = 0; i < sliders.length; i++) {
    if (sliders[i].style.display == 'flex') {
      return i;
    }
  }
}

function showNextSlide(sliders) {
  let currentIndex = getCurrentIndex(sliders);
  currentIndex = (currentIndex + 1 > sliders.length - 1) ? 0 : currentIndex + 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'flex';
}

function showPreviousSlide(sliders) {
  let currentIndex = getCurrentIndex(sliders);
  currentIndex = (currentIndex - 1 < 0) ? sliders.length - 1 : currentIndex - 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'flex';
}

function slideNextSlide(sliders) {
  let currentIndex = getCurrentIndex(sliders);
  currentIndex = (currentIndex + 1 > sliders.length - 1) ? 0 : currentIndex + 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'flex';
}

function slidePreviousSlide(sliders) {
  let currentIndex = getCurrentIndex(sliders);
  currentIndex = (currentIndex - 1 < 0) ? sliders.length - 1 : currentIndex - 1;
  sliders.forEach(function(slider) { slider.style.display = 'none'; });
  sliders[currentIndex].style.display = 'flex';
}

slideshows.noEffect.selector.addEventListener('touchstart', function(event) {
  touchStart = event.targetTouches[0].clientX;
});

slideshows.noEffect.selector.addEventListener('touchend', function(event) {
  touchEnd = event.changedTouches[0].clientX;
  if (!!touchStart && !!touchEnd) {
    let nextSlide = (touchStart - touchEnd > 0) ? true : false;
    if (nextSlide) {
      showNextSlide(slideshows.noEffect.sliders());
    } else {
      showPreviousSlide(slideshows.noEffect.sliders());
    }
  }
});

slideshows.slideEffect.selector.addEventListener('touchstart', function(event) {
  touchStart = event.targetTouches[0].clientX;
});

slideshows.slideEffect.selector.addEventListener('touchend', function(event) {
  touchEnd = event.changedTouches[0].clientX;
  if (!!touchStart && !!touchEnd) {
    let nextSlide = (touchStart - touchEnd > 0) ? true : false;
    if (nextSlide) {
      slideNextSlide(slideshows.slideEffect.sliders());
    } else {
      slidePreviousSlide(slideshows.slideEffect.sliders());
    }
  }
});
