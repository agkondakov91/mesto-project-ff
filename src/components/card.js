import { cardTemplate } from '../pages/index.js';
import { deleteCardData, handleRemoveLike, handleSetLike } from '../components/api.js'

// Функция клонирования темплейта
function cloneCardTemplate () {
  return cardTemplate.querySelector('.card').cloneNode(true);
}

// Функция создания карточки
export function createCard (cardData, deleteHandler, likeHandler, imageHandler, userId) {
  const cardElement = cloneCardTemplate();
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  const cardLikeCountElement = cardElement.querySelector('.card__likes-number');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardImage = cardElement.querySelector('.card__image');
  const isLikedByCurrentUser = cardData.likes.some((like) => like._id === userId);

  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardLikeCountElement.textContent = cardData.likes.length;
  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;

  if (deleteHandler) {
    cardDeletButton.addEventListener('click', function(evt) {
      const cardElement = evt.target.closest('.card');
      const cardId = cardElement.dataset.cardId;
      deleteHandler(cardId, cardElement);
    });
  }

  if (likeHandler) {
    cardLikeButton.addEventListener('click', function() {
      likeHandler(cardData._id, cardLikeCountElement, cardLikeButton);
    });
  }
  
  if (imageHandler) {
    cardImage.addEventListener('click', function() {
      imageHandler(cardData);
    });
  }
  
  if (isLikedByCurrentUser) {
    cardLikeButton.classList.add('card__like-button_is-active');
  }

  if (cardData.owner._id !== userId) {
    cardDeletButton.remove();
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
export function handleDeleteCard(cardId, cardElement) {
  deleteCardData(cardId)
  .then(() => {
    cardElement.remove();
  })
  .catch((error) => {
    console.log(`Ошибка: ${error}`);
  });
}