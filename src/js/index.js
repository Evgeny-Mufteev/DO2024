'use strict';

document.addEventListener('DOMContentLoaded', () => {
  const swiper = new Swiper('.gallery__swiper', {
    slidesPerView: 'auto',
    spaceBetween: 40,
    freeMode: true,
    mousewheel: true,
  });

  const isElementFullyInViewport = (el) => {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  };

  window.addEventListener('scroll', () => {
    const swiperElement = document.querySelector('.gallery__swiper');
    const topOffset = 100;
    const bottomOffset = 100;
    if (isElementFullyInViewport(swiperElement, topOffset, bottomOffset)) {
      swiperElement.focus();
    }
  });
});
