'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Таймер до повышения цены
  var warrior;
  var calculationsTimer = function calculationsTimer(endToTime, wrap) {
    var dateEnd = new Date(endToTime),
      dateNow = new Date(),
      date = Math.floor((dateEnd.getTime() - dateNow.getTime()) / 1000),
      days = wrap.querySelector('.timer__days .timer__number'),
      hours = wrap.querySelector('.timer__hours .timer__number'),
      minutes = wrap.querySelector('.timer__minutes .timer__number'),
      seconds = wrap.querySelector('.timer__seconds .timer__number');
    //countdown(date, days, hours, minutes, seconds);
    if (date > 0) {
      warrior = setTimeout(function () {
        return countdown(date, days, hours, minutes, seconds);
      }, 1000);
    }
  };
  var countdown = function countdown(date, days, hours, minutes, seconds) {
    var dateLeft = date;
    var dateTemp = 0;
    var TimeValues = {
      Vdays: {
        count: 24 * 60 * 60,
        item: days
      },
      Vhours: {
        count: 60 * 60,
        item: hours
      },
      Vminutes: {
        count: 60,
        item: minutes
      },
      Vseconds: {
        count: null,
        item: seconds
      }
    };
    for (var val in TimeValues) {
      dateTemp = Math.floor(dateLeft / TimeValues[val].count);
      if (val != 'Vseconds') {
        dateLeft -= dateTemp * TimeValues[val].count;
        if (dateTemp < 10) dateTemp = '0' + dateTemp;
        TimeValues[val].item.innerHTML = dateTemp;
      } else {
        if (dateLeft < 10) dateLeft = '0' + dateLeft;
        TimeValues[val].item.innerHTML = dateLeft;
      }
    }
    date--;
    if (date < 0) {
      clearTimeout(warrior);
    } else {
      setTimeout(function () {
        return countdown(date, days, hours, minutes, seconds);
      }, 1000);
    }
  };
  document.querySelectorAll('.timer').forEach(function (el) {
    calculationsTimer('2024-03-09 19:41:00'.replace(/-/g, '/'), el);
  });

  // Горизонтальный скролл в галериеи
  var horizontalScrollInGallery = function horizontalScrollInGallery() {
    if (window.innerWidth >= 768 && document.querySelector('.gallery__slider')) {
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
    }
  };
  horizontalScrollInGallery();

  // слайдер в галереии
  var swiper;
  var initSwiper = function initSwiper() {
    swiper = new Swiper('.exposition__slider', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true
    });
  };
  var checkSwiperInit = function checkSwiperInit() {
    if (window.innerWidth < 768) {
      if (!swiper || swiper.destroyed) {
        initSwiper();
      }
    } else {
      if (swiper) {
        swiper.destroy();
      }
    }
  };
  checkSwiperInit();
  window.addEventListener('resize', checkSwiperInit);

  // Функция для управления анимацией
  var manageAnimation = function manageAnimation(tickerElement, state) {
    if (!tickerElement) return;
    var lists = tickerElement.querySelectorAll('.partners__list');
    lists.forEach(function (list) {
      if (list) list.style.animationPlayState = state;
    });
  };

  // Функция для настройки тикера
  var setupTicker = function setupTicker(ticker, direction) {
    if (!ticker) return;
    var originalList = ticker.querySelector('.partners__list');
    if (!originalList) return;
    var clone = originalList.cloneNode(true);
    if (direction === '_left') {
      ticker.appendChild(clone);
    } else {
      ticker.insertBefore(clone, originalList);
    }

    // Обработчики событий для остановки и запуска анимации
    ticker.addEventListener('mouseover', function () {
      return manageAnimation(ticker, 'paused');
    });
    ticker.addEventListener('mouseout', function () {
      return manageAnimation(ticker, 'running');
    });
  };

  // Функция для инициализации всех тикеров
  var setupTickers = function setupTickers() {
    var tickers = document.querySelectorAll('.partners-content');
    if (!tickers) return;
    tickers.forEach(function (ticker) {
      var direction = ticker.classList.contains('_left') ? '_left' : '_right';
      setupTicker(ticker, direction);
    });
  };
  setupTickers();

  // Передать id выбранного билета в форму
  var sendIdToForm = function sendIdToForm(el) {
    el = el.target;
    if (el.closest('.js-buy-ticket')) {
      document.querySelector('.js-select-tickets').value = el.closest('.tickets__item').id;
    }
  };
  var blockForm = document.querySelector('.tickets__content');
  blockForm.addEventListener('click', sendIdToForm);

  // Выбор пунктов партнерства в форме
  var handleParameterSelection = function handleParameterSelection(el) {
    if (document.querySelector('.js-sort-box')) {
      el = el.target;

      // Открытие списка
      if (el.closest('.js-sort-btn')) {
        el.closest('.js-sort-btn').classList.toggle('active');
      }

      // Удаление активного выбранного пункта из списка
      if (el.closest('.js-sort-list')) {
        var allEl = el.closest('.js-sort-list').querySelectorAll('.js-sort-item');
        allEl.forEach(function (listItem) {
          listItem.classList.remove('active');
        });
      }

      // Подстановка и перемещение выбранного пункта
      if (el.classList.contains('js-sort-item')) {
        el.classList.add('active');
        var sortBox = el.closest('.js-sort-box');
        sortBox.querySelector('.selecting-item').value = el.textContent;
        sortBox.querySelector('.selecting-item').setAttribute('value', el.textContent);
        document.querySelector('.selecting-item').dispatchEvent(new Event('input'));

        // Перемещение выбранного пункта в начало списка
        var list = el.closest('.js-sort-list');
        list.insertBefore(el, list.firstChild);
      }

      // Закрытие списка
      if (!el.closest('.js-sort-btn')) {
        document.querySelectorAll('.js-sort-btn').forEach(function (btn) {
          btn.classList.remove('active');
        });
      }
    }
  };
  document.addEventListener('click', handleParameterSelection);

  // Передать выбранной премии в форму
  var setNominationToModal = function setNominationToModal(el) {
    el = el.target;
    if (el.closest('.js-modal-btn')) {
      var nomination = el.closest('.bonus-item').getAttribute('data-name');
      var modalInput = document.querySelector('.modal-bonus__input.selecting-item');
      modalInput.value = nomination;
      var allItems = document.querySelectorAll('.modal-bonus__item.js-sort-item');
      allItems.forEach(function (item) {
        item.classList.remove('active');
        if (item.textContent === nomination) {
          item.classList.add('active');
          var list = item.closest('.js-sort-list');
          list.insertBefore(item, list.firstChild);
        }
      });
    }
  };
  var bonusItemsContainer = document.querySelector('.bonus-content');
  bonusItemsContainer.addEventListener('click', setNominationToModal);

  // Удаление класса _desc в секции премии
  var clearDescClassForMobile = function clearDescClassForMobile() {
    if (window.innerWidth < 768) {
      var biba = document.querySelectorAll('._desc');
      biba.forEach(function (el) {
        el.classList.remove('_desc');
      });
    }
  };
  clearDescClassForMobile();

  // Аккардеоны
  var handleInfoHideShowBlock = function handleInfoHideShowBlock(el) {
    el = el.target;
    if (el.closest('.js-title') && !el.closest('.js-title.active')) {
      document.querySelectorAll('.js-title').forEach(function (el) {
        el.classList.remove('active');
        var scrollHeight = el.closest('.js-item');
        var descElement = scrollHeight.querySelector('.js-desc');
        descElement.style.maxHeight = null;
        descElement.classList.remove('active');
      });
      var scrollHeight = el.closest('.js-item');
      el.closest('.js-title').classList.add('active');
      var descElement = scrollHeight.querySelector('.js-desc');
      descElement.style.maxHeight = descElement.scrollHeight + 'px';
      descElement.classList.add('active');
    } else if (el.closest('.js-title') && !el.closest('.js-desc')) {
      el.closest('.js-title').classList.remove('active');
      var _scrollHeight = el.closest('.js-item');
      var _descElement = _scrollHeight.querySelector('.js-desc');
      _descElement.classList.remove('active');
      _descElement.style.maxHeight = null;
    }
  };
  if (window.innerWidth < 768) {
    document.addEventListener('click', handleInfoHideShowBlock);
  }

  // Навигация по странице
  var handlePageNavigation = function handlePageNavigation() {
    var anchors = document.querySelectorAll('.js-scroll-to');
    anchors.forEach(function (anchor) {
      anchor.addEventListener('click', function (evt) {
        var _document$getElementB;
        evt.preventDefault();
        var blockID = anchor.getAttribute('href').substring(1);
        (_document$getElementB = document.getElementById(blockID)) === null || _document$getElementB === void 0 || _document$getElementB.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      });
    });
  };
  handlePageNavigation();
});