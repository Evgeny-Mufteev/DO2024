'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Таймер до повышения цены
  let warrior;
  const calculationsTimer = (endToTime, wrap) => {
    const dateEnd = new Date(endToTime),
      dateNow = new Date(),
      date = Math.floor((dateEnd.getTime() - dateNow.getTime()) / 1000),
      days = wrap.querySelector('.timer__days .timer__number'),
      hours = wrap.querySelector('.timer__hours .timer__number'),
      minutes = wrap.querySelector('.timer__minutes .timer__number'),
      seconds = wrap.querySelector('.timer__seconds .timer__number');
    //countdown(date, days, hours, minutes, seconds);
    if (date > 0) {
      warrior = setTimeout(() => countdown(date, days, hours, minutes, seconds), 1000);
    }
  };

  const countdown = (date, days, hours, minutes, seconds) => {
    let dateLeft = date;
    let dateTemp = 0;

    const TimeValues = {
      Vdays: {
        count: 24 * 60 * 60,
        item: days,
      },
      Vhours: {
        count: 60 * 60,
        item: hours,
      },
      Vminutes: {
        count: 60,
        item: minutes,
      },
      Vseconds: {
        count: null,
        item: seconds,
      },
    };

    for (let val in TimeValues) {
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
      setTimeout(() => countdown(date, days, hours, minutes, seconds), 1000);
    }
  };

  document.querySelectorAll('.timer').forEach((el) => {
    calculationsTimer('2024-03-09 19:41:00'.replace(/-/g, '/'), el);
  });

  // Горизонтальный скролл в галериеи
  const horizontalScrollInGallery = () => {
    if (window.innerWidth >= 768 && document.querySelector('.gallery__slider')) {
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
    }
  };
  horizontalScrollInGallery();

  // слайдер в галереии
  let swiper;

  const initSwiper = () => {
    swiper = new Swiper('.exposition__slider', {
      slidesPerView: 'auto',
      spaceBetween: 20,
      loop: true,
    });
  };

  const checkSwiperInit = () => {
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
  const manageAnimation = (tickerElement, state) => {
    if (!tickerElement) return;

    const lists = tickerElement.querySelectorAll('.partners__list');
    lists.forEach((list) => {
      if (list) list.style.animationPlayState = state;
    });
  };

  // Функция для настройки тикера
  const setupTicker = (ticker, direction) => {
    if (!ticker) return;

    const originalList = ticker.querySelector('.partners__list');
    if (!originalList) return;

    const clone = originalList.cloneNode(true);

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
    const tickers = document.querySelectorAll('.partners-content');
    if (!tickers) return;

    tickers.forEach((ticker) => {
      const direction = ticker.classList.contains('_left') ? '_left' : '_right';
      setupTicker(ticker, direction);
    });
  };

  setupTickers();

  // Передать id выбранного билета в форму
  const sendIdToForm = (el) => {
    el = el.target;
    if (el.closest('.js-buy-ticket')) {
      document.querySelector('.js-select-tickets').value = el.closest('.tickets__item').id;
    }
  };
  const blockForm = document.querySelector('.tickets__content');
  blockForm.addEventListener('click', sendIdToForm);

  // Выбор пунктов партнерства в форме
  const handleParameterSelection = (el) => {
    if (document.querySelector('.js-sort-box')) {
      el = el.target;

      // Открытие списка
      if (el.closest('.js-sort-btn')) {
        el.closest('.js-sort-btn').classList.toggle('active');
      }

      // Удаление активного выбранного пункта из списка
      if (el.closest('.js-sort-list')) {
        const allEl = el.closest('.js-sort-list').querySelectorAll('.js-sort-item');
        allEl.forEach((listItem) => {
          listItem.classList.remove('active');
        });
      }

      // Подстановка и перемещение выбранного пункта
      if (el.classList.contains('js-sort-item')) {
        el.classList.add('active');
        const sortBox = el.closest('.js-sort-box');
        sortBox.querySelector('.selecting-item').value = el.textContent;
        sortBox.querySelector('.selecting-item').setAttribute('value', el.textContent);
        document.querySelector('.selecting-item').dispatchEvent(new Event('input'));

        // Перемещение выбранного пункта в начало списка
        const list = el.closest('.js-sort-list');
        list.insertBefore(el, list.firstChild);
      }

      // Закрытие списка
      if (!el.closest('.js-sort-btn')) {
        document.querySelectorAll('.js-sort-btn').forEach((btn) => {
          btn.classList.remove('active');
        });
      }
    }
  };
  document.addEventListener('click', handleParameterSelection);

  // Передать выбранной премии в форму
  const setNominationToModal = (el) => {
    el = el.target;
    if (el.closest('.js-modal-btn')) {
      const nomination = el.closest('.bonus-item').getAttribute('data-name');
      const modalInput = document.querySelector('.modal-bonus__input.selecting-item');
      modalInput.value = nomination;

      const allItems = document.querySelectorAll('.modal-bonus__item.js-sort-item');
      allItems.forEach((item) => {
        item.classList.remove('active');
        if (item.textContent === nomination) {
          item.classList.add('active');
          const list = item.closest('.js-sort-list');
          list.insertBefore(item, list.firstChild);
        }
      });
    }
  };

  const bonusItemsContainer = document.querySelector('.bonus-content');
  bonusItemsContainer.addEventListener('click', setNominationToModal);

  // Удаление класса _desc в секции премии
  const clearDescClassForMobile = () => {
    if (window.innerWidth < 768) {
      const biba = document.querySelectorAll('._desc');
      biba.forEach((el) => {
        el.classList.remove('_desc');
      });
    }
  };
  clearDescClassForMobile();

  // Аккардеоны
  const handleInfoHideShowBlock = (el) => {
    el = el.target;

    if (el.closest('.js-title') && !el.closest('.js-title.active')) {
      document.querySelectorAll('.js-title').forEach((el) => {
        el.classList.remove('active');
        let scrollHeight = el.closest('.js-item');
        let descElement = scrollHeight.querySelector('.js-desc');
        descElement.style.maxHeight = null;
        descElement.classList.remove('active');
      });

      let scrollHeight = el.closest('.js-item');
      el.closest('.js-title').classList.add('active');
      let descElement = scrollHeight.querySelector('.js-desc');
      descElement.style.maxHeight = descElement.scrollHeight + 'px';
      descElement.classList.add('active');
    } else if (el.closest('.js-title') && !el.closest('.js-desc')) {
      el.closest('.js-title').classList.remove('active');
      let scrollHeight = el.closest('.js-item');
      let descElement = scrollHeight.querySelector('.js-desc');
      descElement.classList.remove('active');
      descElement.style.maxHeight = null;
    }
  };

  if (window.innerWidth < 768) {
    document.addEventListener('click', handleInfoHideShowBlock);
  }

  // Навигация по странице
  const handlePageNavigation = () => {
    const anchors = document.querySelectorAll('.js-scroll-to');

    anchors.forEach((anchor) => {
      anchor.addEventListener('click', (evt) => {
        evt.preventDefault();
        const blockID = anchor.getAttribute('href').substring(1);
        document.getElementById(blockID)?.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
        });
      });
    });
  };
  handlePageNavigation();
});
