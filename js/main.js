document.body.classList.add('preloader');
document.documentElement.classList.add('prevent-scroll');
window.addEventListener("load", showPage);
document.querySelector('.hero-icons').addEventListener('animationend', observe);

window.onload = () => {
  'use strict';

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('./sw.js');
  }
}

function showPage() {
  document.body.classList.remove('preloader');
  document.documentElement.classList.remove('prevent-scroll');
  document.querySelector('.loader').classList.add('loader__finished');
}

function observe() {
  var elements;
  var windowHeight;

  function init() {
    elements = document.querySelectorAll('.hidden');
    windowHeight = window.innerHeight;
  }

  function checkPosition() {
    for (var i = 0; i < elements.length; i++) {
      var element = elements[i];
      var positionFromTop = elements[i].getBoundingClientRect().top;

      if (positionFromTop - windowHeight <= 0) {
        element.classList.add('fade-in-element');
        element.classList.remove('hidden');
      }
    }
  }

  window.addEventListener('scroll', checkPosition);
  window.addEventListener('resize', init);

  init();
  checkPosition();
}