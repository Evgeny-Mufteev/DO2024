// Табы
if (document.querySelector('.tabs')) {
  const handleTabs = (section, buttons, points, tabsClass) => {
    const tabs = document.querySelector(section);
    const btns = tabs.querySelectorAll(buttons);
    const items = tabs.querySelectorAll(points);

    function change(arr, i) {
      arr.forEach(function (item) {
        item.forEach(function (i) {
          i.classList.remove(tabsClass);
        });
        item[i].classList.add(tabsClass);
      });
    }

    var _loop = function _loop(i) {
      btns[i].addEventListener('click', function () {
        change([btns, items], i);
      });
    };

    for (var i = 0; i < btns.length; i++) {
      _loop(i);
    }
  };
  handleTabs('.tabs', '.tabs__btn', '.tabs__item', 'is-active');
}
