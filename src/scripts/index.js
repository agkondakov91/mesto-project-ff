// import '../pages/index.css';

// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesList = document.querySelector('.places__list');

// @todo: DOM узлы
// ---------------------------------------//
const profileEditButton = document.querySelector('.profile__edit-button'); //кнопка редактировать
const profileAddButton = document.querySelector('.profile__add-button'); //кнопка добавить
const popupCloseButton = document.querySelectorAll('.popup__close'); //кнопка закрыть

const popupEdit = document.querySelector('.popup_type_edit'); //редактировать
const popupNewCard = document.querySelector('.popup_type_new-card'); //добавить
const popupImage = document.querySelector('.popup_type_image'); //image

function openEditPopup () {
  openPopup(popupEdit);
}

function openNewCardPopup () {
  openPopup(popupNewCard);
}

function openImagePopup (imgSrc, imgCaption) {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.src = imgSrc;
  image.alt = imgCaption;
  caption.textContent = imgCaption;
  openPopup(popupImage);
}

profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openNewCardPopup);

popupCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupOverlay);
  button.addEventListener('click', () => closePopup(popup));
})

function openPopup(popup) {
  document.addEventListener('keydown', closePopupEsc);
  popup.classList.add('popup_is-opened');
}

function closePopup(popup) {
  document.removeEventListener('keydown', closePopupEsc);
  popup.classList.remove('popup_is-opened');
}

function closePopupOverlay (evt) { 
  if (evt.target === evt.currentTarget) {
    closePopup(evt.target)
  }
}

function closePopupEsc (evt) {
  if (evt.key === 'Escape') {
    const openPopup = document.querySelector('.popup_is-opened');
    closePopup(openPopup);
  }
}

// ---------------------------------------//


function addCard(arrElement) {
  cardPlacesList.append(arrElement);
}

// @todo: Функция создания карточки
function createCard(cardData, deleteHandler, likeHandler, imageHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');

  cardElement.querySelector('.card__image').addEventListener('click', function() {
    openImagePopup(cardData.link, cardData.name);
  });

  cardDeletButton.addEventListener('click', deleteHandler);
  cardLikeButton.addEventListener('click', likeHandler);


  return cardElement;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  const listCard = event.target.closest('.card');
  listCard.remove();
}

// @todo: Вывести карточки на страницу
function renderCards() {
  initialCards.forEach(cardData => {
    const arrElement = createCard(cardData, deleteCard, changeLike, );
    addCard(arrElement);
  });
}

// ---------------------------------------//
function changeLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}
// ---------------------------------------//

renderCards();

