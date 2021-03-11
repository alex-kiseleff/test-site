"use strict";

/** Function;
 * $$(selector) = document.querySelector(selector);
 */
function $$(selector) {
  return document.querySelector(selector);
}

function openModalWindow() {
  $$('.header__button').addEventListener('click', function (event) {
    $$('.modal-window').classList.add('active');
    $$('.modal-window__button').addEventListener('click', checkFormRunMainFunction);
    $$('.modal-window__container').addEventListener('click', toGoWithModalWindow(event));
  });
}

function toGoWithModalWindow() {
  return function (event) {
    if (event.target.className === $$('.modal-window__container').className) {
      $$('.modal-window').classList.remove('active');
      $$('.modal-window__button').removeEventListener('click', checkFormRunMainFunction);
      $$('.modal-window__container').removeEventListener('click', toGoWithModalWindow);
    }
  };
}

function setDataUserAfterReboot() {
  if (!sessionStorage.getItem('userName')) {
    return;
  } else {
    showLogin();
    editLogin();
  }
}

function getDataUserWithForm() {
  if (checkValidUserName(spaceDelete($$('.modal-window__input_name').value)) && checkValidUserPassword(spaceDelete($$('.modal-window__input_password').value))) {
    return [spaceDelete($$('.modal-window__input_name').value), spaceDelete($$('.modal-window__input_password').value)];
  } else {
    return false;
  }
}

function checkFormRunMainFunction() {
  if (!getDataUserWithForm()) {
    alert('Длина имени не должна превышать 12 символов и все поля должны быть заполнены!');
    $$('.modal-window__input_name').value = '';
    $$('.modal-window__input_password').value = '';
  } else {
    startWorkSite();
    $$('.modal-window').classList.remove('active');
    $$('.modal-window__button').removeEventListener('click', checkFormRunMainFunction);
  }
}

function spaceDelete(str) {
  return str.split(' ').join('');
}

function checkValidUserName(name) {
  return name && name.length <= 12 ? true : false;
}

function checkValidUserPassword(password) {
  return password ? true : false;
}

function setUserData(arr) {
  if (!arr) return;

  if ($$('.modal-window__checkbox').checked) {
    alert('Ваши данные будут сохранены в браузере.');
  }

  sessionStorage.setItem('userName', arr[0]);
  sessionStorage.setItem('userPassword', arr[1]);
  showLogin();
}

function logOutOfAuthorization() {
  $$('.header__button').classList.add('active');
  $$('.header__exit-button').classList.remove('active');
  removeDataSession(['userName', 'userPassword', 'dataTab']);
  $$('.header__open-button_click').removeEventListener('click', logOutOfAuthorization);
  $$('.modal-window__input_name').value = '';
  $$('.modal-window__input_password').value = '';
}

function removeDataSession(arr) {
  arr.forEach(function (item) {
    sessionStorage.removeItem(item);
  });
}

function showLogin() {
  $$('.header__button').classList.remove('active');
  $$('.header__exit-button').classList.add('active');
  $$('.header__nickname').value = sessionStorage.getItem('userName');
  $$('.header__open-button_click').addEventListener('click', logOutOfAuthorization);
  $$('.header__button').removeEventListener('click', openModalWindow);
}

function editLogin() {
  var nickname = $$('.header__nickname');
  nickname.addEventListener('focus', function () {
    nickname.style.color = '#000';
    nickname.style.textAlign = 'right';
    nickname.value = '';
  });
  nickname.addEventListener('blur', function () {
    if (!nickname.value) {
      nickname.value = sessionStorage.getItem('userName');
    } else if (!checkValidUserName(spaceDelete(nickname.value))) {
      nickname.style.color = '#e5261e';
      nickname.style.textAlign = 'center';
      nickname.value = 'не более 12';
    } else {
      sessionStorage.setItem('userName', spaceDelete(nickname.value));
      showLogin();
    }
  });
}

;

function getArrayTabs() {
  return document.querySelectorAll('.tabs__item');
}

function getCurrentValueTab() {
  return !sessionStorage.getItem('dataTab') ? 'movies' : sessionStorage.getItem('dataTab');
}

function switchTabs() {
  changeClassActive(getCurrentValueTab());
  installSavedTab(getArrayTabs());
  setClickedTab(getArrayTabs());
}

function setClickedTab(arrTabs) {
  arrTabs.forEach(function (tabItem) {
    tabItem.addEventListener('click', function (event) {
      arrTabs.forEach(function (item) {
        item.classList.remove('tabs__item_active');
      });
      event.target.classList.add('tabs__item_active');
      sessionStorage.setItem('dataTab', event.target.getAttribute('data-tab'));
      changeClassActive(getCurrentValueTab());
    });
  });
}

function installSavedTab(arrTabs) {
  arrTabs.forEach(function (item) {
    if (getCurrentValueTab() === item.getAttribute('data-tab')) {
      item.classList.add('tabs__item_active');
    } else {
      item.classList.remove('tabs__item_active');
    }
  });
}

function changeClassActive(currentTab) {
  if (currentTab === 'movies') {
    $$('.new-product').classList.add('active');
    $$('.genre').classList.add('active');
    $$('.channels').classList.remove('active');
  }

  if (currentTab === 'channels') {
    $$('.new-product').classList.remove('active');
    $$('.genre').classList.remove('active');
    $$('.channels').classList.add('active');
  }
}

;

function startWorkSite() {
  setUserData(getDataUserWithForm());
  showLogin();
  editLogin();
}

;

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (support) {
    document.querySelector('body').classList.add('webp');
  }
});
;
switchTabs();
setDataUserAfterReboot();
openModalWindow();
toGoWithModalWindow();