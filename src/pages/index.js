import '../pages/index.css';
// import { initialCards } from '../components/cards.js';
import { createCard, changeLike, deleteCard } from '../components/card.js';
import { openPopup, closePopup, closePopupClickOverlay } from '../components/modal.js';
import { enableValidation, clearValidation } from '../components/validation.js';
import { 
  getUserInfo, getInitialCards, saveUserData,
  saveNewCardData, saveUserPicture
} from '../components/api.js'; 

const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

enableValidation(config);

export const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesList = document.querySelector('.places__list');
const profileImage = document.querySelector('.profile__image');
const profileEditAvatarButton = document.querySelector('.profile__edit-avatar');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupCloseButtonsList = document.querySelectorAll('.popup__close');

const popupUpdatePicture = document.querySelector('.popup_type_update-pic');
const popupFormUpdatePicture = document.forms['update-pic'];
const popupInputPictureUrl = popupFormUpdatePicture.querySelector('.popup__input_type_picture-url');

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

let userId;

function changeLikeHandler(cardId, cardLikeCountElement, cardLikeButton) {
  changeLike(cardId, cardLikeCountElement, cardLikeButton);
}

function addCard (arrElement) {
  cardPlacesList.append(arrElement);
}

function addNewCard (cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const card = createCard(cardData, deleteHandler, likeHandler, imageHandler, userId);
  cardPlacesList.prepend(card);
}

function renderUserInfo(userData) {
  profileTitle.textContent = userData.name;
  profileDescription.textContent = userData.about;
  profileImage.style.backgroundImage = `url(${userData.avatar})`;
}

function renderCards(initialCardsData) {
  initialCardsData.forEach(cardData => {
    const arrElement = createCard(cardData, deleteCard, changeLikeHandler, openImagePopup, userId);
    arrElement.dataset.cardId = cardData._id;
    addCard(arrElement);
  });
}

function openUpdatePicturePopup () {
  clearValidation(popupFormUpdatePicture, config);
  openPopup(popupUpdatePicture);
}

function openEditPopup () {
  clearValidation(popupFormEdit, config);
  popupInputName.value = profileTitle.textContent;
  popupInputJob.value = profileDescription.textContent;
  openPopup(popupEdit);
}

function openNewCardPopup () {
  clearValidation(popupFormNewCard, config);
  openPopup(popupNewCard);
}

function openImagePopup (cardData) {
  photoPopupImage.src = cardData.link;
  photoPopupImage.alt = cardData.name;
  captionPopupImage.textContent = cardData.name;
  openPopup(popupImage);
}

function handleFormSubmitUpdatePicture (evt) {
  evt.preventDefault();
  const pictureData = {
    avatar: popupInputPictureUrl.value
  }
  profileImage.style.backgroundImage = `url(${popupInputPictureUrl.value})`;
  saveUserPicture(pictureData)
  .then(() => {
    closePopup(popupUpdatePicture);
    popupFormUpdatePicture.reset();
    clearValidation(popupFormUpdatePicture, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
}

function handleFormSubmitEdit (evt) {
  evt.preventDefault();
  profileTitle.textContent = popupInputName.value;
  profileDescription.textContent = popupInputJob.value;
  saveUserData()
  .then(() => {
    closePopup(popupEdit);
    clearValidation(popupFormEdit, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
}

function handleFormSubmitNewCard (evt) {
  evt.preventDefault();
  const cardDataNew = {
    name: popupInputCardName.value,
    link: popupInputCardUrl.value
  }
  saveNewCardData(cardDataNew)
  .then((newCardData) => {
    addNewCard(newCardData, deleteCard, changeLike, openImagePopup, userId);
    closePopup(popupNewCard);
    popupFormNewCard.reset();
    clearValidation(popupFormNewCard, config);
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  })
}

popupCloseButtonsList.forEach(button => {
  const popup = button.closest('.popup');
  popup.addEventListener('mousedown', closePopupClickOverlay);
  button.addEventListener('click', () => closePopup(popup));
})

popupFormEdit.addEventListener('submit', handleFormSubmitEdit);
popupFormNewCard.addEventListener('submit', handleFormSubmitNewCard);
popupFormUpdatePicture.addEventListener('submit', handleFormSubmitUpdatePicture);
profileEditButton.addEventListener('click', openEditPopup);
profileAddButton.addEventListener('click', openNewCardPopup);
profileEditAvatarButton.addEventListener('click', openUpdatePicturePopup);

Promise.all([getInitialCards(), getUserInfo()])
.then(([initialCardsData, userData]) => {
  renderUserInfo(userData);
  userId = userData._id
  renderCards(initialCardsData);
})
.catch((error) => {
  console.log(`Ошибка: ${error}`);
})