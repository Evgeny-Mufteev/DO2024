"use strict";

document.addEventListener("DOMContentLoaded", function () {
  // Расчет длинны линии
  var calcFeatureLine = function calcFeatureLine() {
    var featureLine = document.querySelector('.feature__line');
    var featureListHeight = document.querySelector('.feature__list').offsetHeight;
    var featureLastItemHeight = document.querySelector('.feature__item:last-child').offsetHeight;
    if (window.innerWidth > 1024) {
      featureLine.style.height = featureListHeight - featureLastItemHeight / 2 + 'px';
    } else {
      featureLine.style.height = featureListHeight - featureLastItemHeight + 'px';
    }
  };
  calcFeatureLine();
  window.addEventListener("resize", calcFeatureLine);

  // Авто-нумерация
  var featureNumbering = function featureNumbering() {
    var featureItems = document.querySelectorAll('.feature__item');
    featureItems.forEach(function (item, index) {
      var number = document.createElement('div');
      number.classList.add('feature__number');
      number.textContent = "".concat(index + 1);
      item.appendChild(number);
    });
  };
  featureNumbering();
  var reviewsSlider = new Swiper('.reviews__slider', {
    slidesPerView: 1,
    navigation: {
      nextEl: '.reviews__slider-next',
      prevEl: '.reviews__slider-prev'
    }
  });

  // Плеер для видео
  var composeVideo = function composeVideo() {
    var player = document.querySelectorAll('.youtube-player');
    var link = document.querySelector('.reviews__preview-link');
    if (player && link) {
      var videoId = link.innerText.split('watch?v=')[1];
      var videoThumbnailUrl = "https://img.youtube.com/vi/".concat(videoId, "/0.jpg");
      var videoThumbnail = document.createElement('img');
      videoThumbnail.src = videoThumbnailUrl;
      player.forEach(function (item) {
        item.appendChild(videoThumbnail);
      });
      var loadPlayer = function loadPlayer(evt) {
        var target = evt.currentTarget;
        var iframe = document.createElement('iframe');
        iframe.src = "https://www.youtube.com/embed/".concat(videoId, "?autoplay=1");
        iframe.setAttribute('width', 100 + '%');
        iframe.setAttribute('height', 100 + '%');
        iframe.setAttribute('allow', 'autoplay');
        iframe.setAttribute('loading', 'lazy');
        target.classList.remove('btn-dis');
        videoThumbnail.style.display = 'none';
        if (target.children.length) {
          target.replaceChild(iframe, target.firstElementChild);
        } else {
          target.appendChild(iframe);
        }
      };
      var config = {
        once: true
      };
      Array.from(player).forEach(function (player) {
        player.addEventListener('click', loadPlayer, config);
      });
    }
  };
  composeVideo();
});