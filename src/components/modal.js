// Функция открытия всех модальных окон
export function openPopup (popup) {
  document.addEventListener('keydown', closePopupByEsc);
  popup.classList.add('popup_is-opened');
}

//Функция закрытия всех модальных окон
export function closePopup (popup) {
  document.removeEventListener('keydown', closePopupByEsc);
  popup.classList.remove('popup_is-opened');
}

//Функция-обработчик события нажатия Esc
function closePopupByEsc (evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
  }
}

// Функция-обработчик события клика по оверлею
export function closePopupClickOverlay (evt) { 
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}