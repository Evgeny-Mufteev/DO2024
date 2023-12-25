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
});
