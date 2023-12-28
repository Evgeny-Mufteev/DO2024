'use strict';

document.addEventListener('DOMContentLoaded', function () {
  // Маска телефона
  var handlePhoneMask = function handlePhoneMask(input) {
    var matrix = '+7 (___) ___-__-__',
      i = 0,
      def = matrix.replace(/\D/g, ''),
      val = input.value.replace(/\D/g, '');
    if (def.length >= val.length) val = def;
    input.value = matrix.replace(/./g, function (a) {
      return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
    });
  };
  var numbers = document.querySelectorAll('input[type="tel"]');
  numbers.forEach(function (number) {
    number.addEventListener('input', handlePhoneMask.bind(null, number));
    number.addEventListener('focus', handlePhoneMask.bind(null, number));
    number.addEventListener('blur', handlePhoneMask.bind(null, number));
  });

  // Плавный скролл
  if (window.screen.width >= 767) {
    SmoothScroll({
      animationTime: 800,
      // Уменьшить время анимации
      stepSize: 80,
      // Немного увеличить размер шага

      // Дополнительные настройки:
      accelerationDelta: 40,
      // Уменьшить ускорение
      accelerationMax: 2,
      // Уменьшить максимальное ускорение
      keyboardSupport: true,
      // Поддержка клавиатуры
      arrowScroll: 50,
      // Шаг скролла стрелками на клавиатуре в пикселях

      // Pulse (less tweakable)
      // ratio of "tail" to "acceleration"
      pulseAlgorithm: true,
      pulseScale: 3,
      pulseNormalize: 1,
      touchpadSupport: true // Поддержка тачпада
    });
  }

  // Якорь наверх
  var handleScrollUp = function handleScrollUp() {
    var button = document.querySelector('.toTop');
    var header = document.querySelector('.header');
    button.addEventListener('click', function (evt) {
      evt.preventDefault();
      header === null || header === void 0 || header.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  };
  handleScrollUp();

  // Появление кнопки якоря
  var showScroll = function showScroll() {
    window.addEventListener('scroll', function () {
      var topArrow = document.querySelector('.toTop');
      if (window.pageYOffset > 1200) {
        topArrow.classList.add('_show');
      } else {
        topArrow.classList.remove('_show');
      }
    });
  };
  showScroll();

  // бургер меню
  var handleBurgerMenu = function handleBurgerMenu() {
    var btnMenu = document.querySelector('.header__menu-wrap');
    var headerMenu = document.querySelector('.header__inner');
    var overlay = document.querySelector('.overlay');
    var noScrollBody = document.body;
    var navLinks = document.querySelectorAll('.js-nav-links');
    if (btnMenu && headerMenu && overlay) {
      btnMenu.addEventListener('click', function (evt) {
        btnMenu.classList.toggle('active');
        headerMenu.classList.toggle('active');
        overlay.classList.toggle('active');
        noScrollBody.classList.toggle('no-scroll');
      });
      overlay.addEventListener('click', function (evt) {
        btnMenu.classList.remove('active');
        headerMenu.classList.remove('active');
        overlay.classList.remove('active');
        noScrollBody.classList.remove('no-scroll');
      });
    }
    if (navLinks) {
      navLinks.forEach(function (linkItem) {
        linkItem.addEventListener('click', function (evt) {
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
  var handleModalPopup = function handleModalPopup(el) {
    el = el.target;
    var overlay = document.querySelector('.overlay');
    var noScrollBody = document.body;
    if (el.closest('.overlay')) {
      document.querySelectorAll('.js-modal-block').forEach(function (el) {
        el.classList.remove('active');
        overlay === null || overlay === void 0 || overlay.classList.remove('active');
        noScrollBody === null || noScrollBody === void 0 || noScrollBody.classList.remove('no-scroll');
      });
    }
    if (el.closest('.js-close')) {
      document.querySelectorAll('.js-modal-block').forEach(function (el) {
        el.classList.remove('active');
        overlay === null || overlay === void 0 || overlay.classList.remove('active');
        noScrollBody === null || noScrollBody === void 0 || noScrollBody.classList.remove('no-scroll');
      });
    }
    if (el.closest('.js-modal-btn')) {
      var modalSelector = el.getAttribute('data-modal-target');
      var modalToOpen = document.querySelector(modalSelector);
      if (modalToOpen) {
        modalToOpen.classList.add('active');
        overlay.classList.add('active');
        noScrollBody.classList.add('no-scroll');
      }
    }
  };
  document.addEventListener('click', handleModalPopup);

  // Валидация формы
  var handleFormSubmitPage = function handleFormSubmitPage(formItem, popup) {
    var form = document.querySelector(formItem);
    var modalBlock = document.querySelector(popup);
    if (!form) {
      return;
    }
    var btn = form.querySelector('.js-form-submit');
    var phone = form.querySelector('input[name="phone"]');
    var pristine = new Pristine(form);
    var handleInputValidation = function handleInputValidation(inputElement) {
      inputElement === null || inputElement === void 0 || inputElement.addEventListener('input', function () {
        var valid = pristine.validate(inputElement);
        btn.disabled = !valid;
      });
    };
    handleInputValidation(phone);
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      var valid = pristine.validate();
      if (valid) {
        evt.preventDefault();
        modalBlock.classList.add('success');
        var formData = Object.fromEntries(new FormData(evt.target).entries());
        delete formData['privacy-policy'];
        if (formData.phone) {
          formData.phone = formData.phone.replace(/\D/g, '');
        }
        console.log(formData);
        setTimeout(function () {
          // evt.target.submit();
          var url = form.getAttribute('action');
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
      zoom: 17
    });
    map.controls.add('zoomControl');
    // Добавление геометки
    var placemark = new ymaps.Placemark([56.330342, 43.992488], {
      hintContent: 'Нижний Новгород, ул. Нижне-Волжская набережная дом 11',
      balloonContent: 'КПЦ Академия Маяк им. А.Д. Сахарова '
    });
    map.geoObjects.add(placemark);
  }
});