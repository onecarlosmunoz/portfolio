document.body.classList.add('preloader');
document.documentElement.classList.add('prevent-scroll');
window.addEventListener("load", showPage);
document.querySelector('.hero-subheader').addEventListener('animationend', addObserver);

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

function addObserver() {
  const options = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25 // 25% visible
  };

  const targets = document.querySelectorAll(".hidden");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.intersectionRatio > 0) {
        entry.target.classList.add("fade-in-element");
        // entry.target.classList.remove(".hidden");
        observer.unobserve(entry.target);
      }
    }, options)
  });

  targets.forEach(target => {
    observer.observe(target);
  });
}