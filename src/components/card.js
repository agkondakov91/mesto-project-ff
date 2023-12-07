import { cardTemplate } from '../pages/index.js';
import { deleteCardData, handleRemoveLike, handleSetLike } from '../components/api.js'

// Функция создания карточки
export function createCard (cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCountElement = cardElement.querySelector('.card__likes-number');
  cardLikeCountElement.textContent = cardData.likes.length;
  const isLikedByCurrentUser = cardData.likes.some((like) => like._id === userId);
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImageClick = cardElement.querySelector('.card__image');
  cardDeletButton.addEventListener('click', deleteHandler);
  cardLikeButton.addEventListener('click', function () {
    likeHandler(cardData._id, cardLikeCountElement, cardLikeButton);
  });
  cardImageClick.addEventListener('click', function () {
    imageHandler(cardData);
  });

  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id === userId) {
    cardDeletButton.style.display = 'inline-block';
  } else {
    cardDeletButton.style.display = 'none';
  }

  return cardElement;
}

// Функция переключения лайка
export function changeLike(cardId, cardLikeCountElement, cardLikeButton) {
  const isLiked = cardLikeButton.classList.contains('card__like-button_is-active');
  if (isLiked) {
    handleRemoveLike(cardId)
    .then((updatedCard) => {
      cardLikeCountElement.textContent = updatedCard.likes.length;
      cardLikeButton.classList.remove('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  } else {
    handleSetLike(cardId)
    .then((updatedCard) => {
      cardLikeCountElement.textContent = updatedCard.likes.length;
      cardLikeButton.classList.add('card__like-button_is-active');
    })
    .catch((error) => {
      console.log(`Ошибка: ${error}`);
    });
  }
}

// Функция удаления карточки
export function deleteCard (event) {
  const listCard = event.target.closest('.card');
  const cardId = listCard.dataset.cardId;
  deleteCardData(cardId)
  .then(() => {
    listCard.remove();
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
}