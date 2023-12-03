import { cardTemplate } from '../pages/index.js';

// Функция создания карточки
export function createCard (cardData, deleteHandler, likeHandler, imageHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImageClick = cardElement.querySelector('.card__image');
  cardDeletButton.addEventListener('click', deleteHandler);
  cardLikeButton.addEventListener('click', likeHandler);
  cardImageClick.addEventListener('click', function () {
    imageHandler(cardData);
  });
  return cardElement;
}

// Функция переключения лайка
export function changeLike (evt) {
  evt.target.classList.toggle('card__like-button_is-active');
}

// Функция удаления карточки
export function deleteCard (event) {
  const listCard = event.target.closest('.card');
  listCard.remove();
}