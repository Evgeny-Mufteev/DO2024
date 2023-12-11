'use strict';
document.addEventListener('DOMContentLoaded', () => {
  // // Маска телефона
  // const handlePhoneMask = (input) => {
  //   let matrix = '+7 (___) ___-__-__',
  //     i = 0,
  //     def = matrix.replace(/\D/g, ''),
  //     val = input.value.replace(/\D/g, '');
  //   if (def.length >= val.length) val = def;
  //   input.value = matrix.replace(/./g, function (a) {
  //     return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a;
  //   });
  // };
  // const numbers = document.querySelectorAll('input[type="tel"]');
  // numbers.forEach((number) => {
  //   number.addEventListener('input', handlePhoneMask.bind(null, number));
  //   number.addEventListener('focus', handlePhoneMask.bind(null, number));
  //   number.addEventListener('blur', handlePhoneMask.bind(null, number));
  // });
  // // отправка данных
  // const sendData = (url, data) => {
  //   fetch(url, {
  //     method: 'POST',
  //     body: data,
  //   })
  //     .then((response) => {
  //       console.log(response);
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error('Network response was not ok');
  //       }
  //     })
  //     .then((jsonData) => {
  //       console.log(jsonData);
  //       window.location.href = 'http://localhost:3000/';
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // };
  // // Валидация формы
  // const handleFormSubmitPage = (formItem) => {
  //   const form = document.querySelector(formItem);
  //   if (!form) {
  //     return;
  //   }
  //   const btn = form.querySelector('.js-form-submit');
  //   const phone = form.querySelector('input[name="phone_feedback"]');
  //   const pristine = new Pristine(form);
  //   const handleInputValidation = (inputElement) => {
  //     inputElement?.addEventListener('input', () => {
  //       const valid = pristine.validate(inputElement);
  //       btn.disabled = !valid;
  //     });
  //   };
  //   handleInputValidation(phone);
  //   form.addEventListener('submit', (evt) => {
  //     evt.preventDefault();
  //     const valid = pristine.validate();
  //     if (valid) {
  //       evt.preventDefault();
  //       const formData = Object.fromEntries(new FormData(evt.target).entries());
  //       console.log(formData);
  //       evt.target.submit();
  //       const url = form.getAttribute('action');
  //       sendData(url, formData);
  //     }
  //   });
  // };
  // handleFormSubmitPage('.js-feedback-form');
  // // открытие и закрытие модальных окон
  // const handleModalPopup = (el) => {
  //   el = el.target;
  //   const overlay = document.querySelector('.overlay');
  //   const noScrollBody = document.body;
  //   if (el.closest('.overlay')) {
  //     document.querySelectorAll('.js-modal-block').forEach((el) => {
  //       el.classList.remove('active');
  //       overlay?.classList.remove('active');
  //       noScrollBody?.classList.remove('no-scroll');
  //     });
  //   }
  //   if (el.closest('.js-close')) {
  //     document.querySelectorAll('.js-modal-block').forEach((el) => {
  //       el.classList.remove('active');
  //       overlay?.classList.remove('active');
  //       noScrollBody?.classList.remove('no-scroll');
  //     });
  //   }
  //   if (el.closest('.js-modal-btn')) {
  //     const modalSelector = el.getAttribute('data-modal-target');
  //     const modalToOpen = document.querySelector(modalSelector);
  //     if (modalToOpen) {
  //       modalToOpen.classList.add('active');
  //       overlay.classList.add('active');
  //       noScrollBody.classList.add('no-scroll');
  //     }
  //   }
  // };
  // document.addEventListener('click', handleModalPopup);
});
