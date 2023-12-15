'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Горизонтальный скролл в галериеи
  var horizontalScrollInGallery = function horizontalScrollInGallery() {
    var controller = new ScrollMagic.Controller();
    var slider = document.querySelector('.gallery__slider');
    var horizontalScrollLength = slider.scrollWidth - window.innerWidth;
    var triggerHookValue = 170 / window.innerHeight;
    var wipeAnimation = gsap.timeline().fromTo(slider, {
      x: 0
    }, {
      x: -horizontalScrollLength,
      ease: 'none'
    });
    new ScrollMagic.Scene({
      triggerElement: '.gallery',
      duration: horizontalScrollLength,
      triggerHook: triggerHookValue
    }).setPin('.gallery').setTween(wipeAnimation).addTo(controller);
  };
  horizontalScrollInGallery();
  var verticalScrollSequential = function verticalScrollSequential() {
    var controller = new ScrollMagic.Controller();
    var bonusItems = document.querySelectorAll('.bonus-item');
    bonusItems.forEach(function (item, index) {
      var style = window.getComputedStyle(item);
      var margin = parseFloat(style.marginTop) + parseFloat(style.marginBottom);
      var padding = parseFloat(style.paddingTop) + parseFloat(style.paddingBottom);
      var innerHeight = item.querySelector('.bonus-item__box').offsetHeight;
      var fullHeight = innerHeight + padding + margin;
      var tween = gsap.fromTo(item, {
        height: '91px'
      }, {
        height: fullHeight + 'px',
        ease: 'power1.out'
      });
      new ScrollMagic.Scene({
        triggerElement: item,
        triggerHook: 0.8,
        duration: '100%'
      }).setTween(tween).addTo(controller).on('end', function () {
        if (index < bonusItems.length - 1) {
          controller.scrollTo(bonusItems[index + 1]);
        }
      });
    });
  };
  verticalScrollSequential();
});