import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard, changeLike, deleteCard } from '../components/card.js';
import { openPopup, closePopup, closePopupClickOverlay } from '../components/modal.js';

export const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesList = document.querySelector('.places__list');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonsList = document.querySelectorAll('.popup__close');

const popupEdit = document.querySelector('.popup_type_edit');
const popupFormEdit = document.forms['edit-profile'];
const popupInputName = popupFormEdit.querySelector('.popup__input_type_name');
const popupInputJob = popupFormEdit.querySelector('.popup__input_type_description');

const popupNewCard = document.querySelector('.popup_type_new-card');
const popupFormNewCard = document.forms['new-place'];
const popupInputCardName = popupFormNewCard.querySelector('.popup__input_type_card-name');
const popupInputCardUrl = popupFormNewCard.querySelector('.popup__input_type_url');

const popupImage = document.querySelector('.popup_type_image');
const photoPopupImage = popupImage.querySelector('.popup__image');
const captionPopupImage = popupImage.querySelector('.popup__caption');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

function addCard (arrElement) {
  cardPlacesList.append(arrElement);
}

function addNewCard (cardData, deleteHandler, likeHandler, imageHandler) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler);
  cardPlacesList.prepend(card);
}

function renderCards() {
  initialCards.forEach(cardData => {
    const arrElement = createCard(cardData, deleteCard, changeLike, openImagePopup);
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

function openImagePopup (cardData) {
  photoPopupImage.src = cardData.link;
  photoPopupImage.alt = cardData.name;
  captionPopupImage.textContent = cardData.name;
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
  addNewCard(cardDataNew, deleteCard, changeLike, openImagePopup);
  closePopup(popupNewCard);

  popupFormNewCard.reset();
}

popupCloseButtonsList.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupClickOverlay);
  button.addEventListener('click', () => closePopup(popup));
})

popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormNewCard.addEventListener('submit', handleFormSubmitNewCard);
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openNewCardPopup);

renderCards();