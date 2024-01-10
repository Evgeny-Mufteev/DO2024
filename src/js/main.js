'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Маска телефона
  const handlePhoneMask = (input) => {
    let matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  };
  const numbers = document.querySelectorAll('input[type="tel"]');
  numbers.forEach((number) => {
    number.addEventListener('input', handlePhoneMask.bind(null, number));
    number.addEventListener('focus', handlePhoneMask.bind(null, number));
    number.addEventListener('blur', handlePhoneMask.bind(null, number));
  });

  // Плавный скролл
  if (window.screen.width >= 767) {
    SmoothScroll({
      animationTime: 800, // Уменьшить время анимации
      stepSize: 80, // Немного увеличить размер шага

      // Дополнительные настройки:
      accelerationDelta: 40, // Уменьшить ускорение
      accelerationMax: 2, // Уменьшить максимальное ускорение
      keyboardSupport: true, // Поддержка клавиатуры
      arrowScroll: 50, // Шаг скролла стрелками на клавиатуре в пикселях

      // Pulse (less tweakable)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 3,
      pulseNormalize: 1,
      touchpadSupport: true, // Поддержка тачпада
    });
  }

  // Якорь наверх
  const handleScrollUp = () => {
    const button = document.querySelector('.toTop');
    const header = document.querySelector('.header');

    button.addEventListener('click', (evt) => {
      evt.preventDefault();

      header?.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    });
  };
  handleScrollUp();

  // Появление кнопки якоря
  const showScroll = () => {
    window.addEventListener('scroll', () => {
      const topArrow = document.querySelector('.toTop');

      if (window.pageYOffset > 1200) {
        topArrow.classList.add('_show');
      } else {
        topArrow.classList.remove('_show');
      }
    });
  };
  showScroll();

  // бургер меню
  const handleBurgerMenu = () => {
    const btnMenu = document.querySelector('.header__menu-wrap');
    const headerMenu = document.querySelector('.header__inner');
    const overlay = document.querySelector('.overlay');
    const noScrollBody = document.body;
    const navLinks = document.querySelectorAll('.js-nav-links');

    if (btnMenu && headerMenu && overlay) {
      btnMenu.addEventListener('click', (evt) => {
        btnMenu.classList.toggle('active');
        headerMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        noScrollBody.classList.toggle('no-scroll');
      });

      overlay.addEventListener('click', (evt) => {
        btnMenu.classList.remove('active');
        headerMenu.classList.remove('active');
        overlay.classList.remove('active');
        noScrollBody.classList.remove('no-scroll');
      });
    }

    if (navLinks) {
      navLinks.forEach((linkItem) => {
        linkItem.addEventListener('click', (evt) => {
          if (btnMenu && headerMenu && overlay) {
            btnMenu.classList.remove('active');
            headerMenu.classList.remove('active');
            overlay.classList.remove('active');
            noScrollBody.classList.remove('no-scroll');
          }
        });
      });
    }
  };
  handleBurgerMenu();

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
    if (window.screen.width > 767) {
      document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') {
          evt.preventDefault();
          document.querySelectorAll('.js-modal-block.active').forEach((modal) => {
            modal.classList.remove('active');
          });
          const overlay = document.querySelector('.overlay');
          overlay?.classList.remove('active');
          document.body.classList.remove('no-scroll');
        }
      });
    }
  };
  document.addEventListener('click', handleModalPopup);

  // отправка данных
  const sendData = (url, data) => {
    fetch(url, {
      method: 'POST',
      body: data,
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Network response was not ok');
        }
      })
      .then((jsonData) => {
        console.log(jsonData);
        window.location.href = 'http://localhost:3000/';
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Валидация формы
  const handleFormSubmitPage = (formItem, popup) => {
    const form = document.querySelector(formItem);
    const modalBlock = document.querySelector(popup);

    if (!form) {
      return;
    }

    const btn = form.querySelector('.js-form-submit');
    const phone = form.querySelector('input[name="phone"]');
    const pristine = new Pristine(form);

    const handleInputValidation = (inputElement) => {
      inputElement?.addEventListener('input', () => {
        const valid = pristine.validate(inputElement);
        btn.disabled = !valid;
      });
    };
    handleInputValidation(phone);

    form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const valid = pristine.validate();

      if (valid) {
        evt.preventDefault();
        modalBlock.classList.add('success');
        const formData = Object.fromEntries(new FormData(evt.target).entries());
        delete formData['privacy-policy'];
        if (formData.phone) {
          formData.phone = formData.phone.replace(/\D/g, '');
        }
        console.log(formData);
        setTimeout(() => {
          // evt.target.submit();
          const url = form.getAttribute('action');
          sendData(url, formData);
          form.reset();
        }, 3000);
      }
    });
  };
  handleFormSubmitPage('.js-modal-ticket-form', '.js-modal-ticket');
  handleFormSubmitPage('.js-modal-partner-form', '.js-modal-partner');
  handleFormSubmitPage('.js-modal-speaker-form', '.js-modal-speaker');
  handleFormSubmitPage('.js-modal-bonus-form', '.js-modal-bonus');

  // Яндекс карта
  ymaps.ready(init);

  function init() {
    var map = new ymaps.Map('app', {
      center: [56.330342, 43.992488],
      zoom: 17,
    });
    map.controls.add('zoomControl');
    // Добавление геометки
    var placemark = new ymaps.Placemark([56.330342, 43.992488], {
      hintContent: 'Нижний Новгород, ул. Нижне-Волжская набережная дом 11',
      balloonContent: 'КПЦ Академия Маяк им. А.Д. Сахарова ',
    });
    map.geoObjects.add(placemark);
  }

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
  bonusItemsContainer?.addEventListener('click', setNominationToModal);

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
});
