import './pages/index.css';
import { initialCards } from './scripts/cards.js';
import { createCard, changeLike, deleteCard } from './components/card.js';
import { openPopup, closePopup, closePopupClickOverlay } from './components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButton = document.querySelectorAll('.popup__close');
const popupEdit = document.querySelector('.popup_type_edit');
const popupInputName = popupEdit.querySelector('.popup__input_type_name');
const popupInputJob = popupEdit.querySelector('.popup__input_type_description');
const popupNewCard = document.querySelector('.popup_type_new-card');
const popupFormNewCard = document.forms['new-place'];
const popupInputCardName = popupFormNewCard.querySelector('.popup__input_type_card-name');
const popupInputCardUrl = popupFormNewCard.querySelector('.popup__input_type_url');
const popupImage = document.querySelector('.popup_type_image');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function addCard (arrElement) {
  cardPlacesList.append(arrElement);
}

function addNewCard (cardData, deleteHandler, likeHandler) {
  const card = createCard(cardData, deleteHandler, likeHandler);
  cardPlacesList.prepend(card);
}

function renderCards() {
  initialCards.forEach(cardData => {
    const arrElement = createCard(cardData, deleteCard, changeLike);
    addCard(arrElement);
  });
}

function openEditPopup () {
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileDescription.textContent;
  openPopup(popupEdit);
}

function openNewCardPopup () {
  openPopup(popupNewCard);
}

export function openImagePopup (imgSrc, imgCaption) {
  const image = popupImage.querySelector('.popup__image');
  const caption = popupImage.querySelector('.popup__caption');
  image.src = imgSrc;
  image.alt = imgCaption;
  caption.textContent = imgCaption;
  openPopup(popupImage);
}

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputJob.value;
  closePopup(popupEdit);
}

function handleFormSubmitNewCard (evt) {
  evt.preventDefault();
  const cardDataNew = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value
  }
  addNewCard(cardDataNew, deleteCard, changeLike);
  closePopup(popupNewCard);

  popupFormNewCard.reset();
}

popupCloseButton.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupClickOverlay);
  button.addEventListener('click', () => closePopup(popup));
})

popupEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormNewCard.addEventListener('submit', handleFormSubmitNewCard);
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openNewCardPopup);

renderCards();