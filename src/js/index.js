'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Горизонтальный скролл в галериеи
  const horizontalScrollInGallery = () => {
    const controller = new ScrollMagic.Controller();
    const slider = document.querySelector('.gallery__slider');
    const horizontalScrollLength = slider.scrollWidth - window.innerWidth;
    const triggerHookValue = 170 / window.innerHeight;
    const wipeAnimation = gsap
      .timeline()
      .fromTo(slider, { x: 0 }, { x: -horizontalScrollLength, ease: 'none' });
    new ScrollMagic.Scene({
      triggerElement: '.gallery',
      duration: horizontalScrollLength,
      triggerHook: triggerHookValue,
    })
      .setPin('.gallery')
      .setTween(wipeAnimation)
      .addTo(controller);
  };
  horizontalScrollInGallery();

  const verticalScrollSequential = () => {
    // Создание контроллера ScrollMagic
    var controller = new ScrollMagic.Controller();

    // Настройка сцен для каждого bonus-item
    document.querySelectorAll('.bonus-item').forEach(function (item, index) {
      new ScrollMagic.Scene({
        triggerElement: item,
        triggerHook: 0.5, // настраивает положение триггера (0 - верх, 1 - низ, 0.5 - центр)
      })
        .on('enter', function () {
          // Раскрывать элемент при входе в область видимости
          item.classList.add('expanded');
        })
        .on('leave', function () {
          // Скрывать элемент при выходе из области видимости
          item.classList.remove('expanded');
        })
        .addTo(controller);
    });
  };
  verticalScrollSequential();

  // Функция для управления анимацией
  const manageAnimation = (tickerElement, state) => {
    const lists = tickerElement.querySelectorAll('.partners__list');
    lists.forEach((list) => (list.style.animationPlayState = state));
  };

  // Функция для настройки тикера
  const setupTicker = (ticker, direction) => {
    const originalList = ticker.querySelector('.partners__list'),
      clone = originalList.cloneNode(true);

    if (direction === '_left') {
      ticker.appendChild(clone);
    } else {
      ticker.insertBefore(clone, originalList);
    }
    // Обработчики событий для остановки и запуска анимации
    ticker.addEventListener('mouseover', () => manageAnimation(ticker, 'paused'));
    ticker.addEventListener('mouseout', () => manageAnimation(ticker, 'running'));
  };

  // Функция для инициализации всех тикеров
  const setupTickers = () => {
    document.querySelectorAll('.partners-content').forEach((ticker) => {
      const direction = ticker.classList.contains('_left') ? '_left' : '_right';
      setupTicker(ticker, direction);
    });
  };
  setupTickers();

  // работа модальных окон
  const handleModalPopup = (el) => {
    el = el.target;
    const overlay = document.querySelector('.overlay');
    const noScrollBody = document.body;

    if (el.closest('.overlay')) {
      document.querySelectorAll('.js-modal-block').forEach((el) => {
        el.classList.remove('active');
        overlay?.classList.remove('active');
        noScrollBody?.classList.remove('no-scroll');
      });
    }
    if (el.closest('.js-close')) {
      document.querySelectorAll('.js-modal-block').forEach((el) => {
        el.classList.remove('active');
        overlay?.classList.remove('active');
        noScrollBody?.classList.remove('no-scroll');
      });
    }
    if (el.closest('.js-modal-btn')) {
      const modalSelector = el.getAttribute('data-modal-target');
      const modalToOpen = document.querySelector(modalSelector);
      if (modalToOpen) {
        modalToOpen.classList.add('active');
        overlay.classList.add('active');
        noScrollBody.classList.add('no-scroll');
      }
    }
  };
  document.addEventListener('click', handleModalPopup);
});
