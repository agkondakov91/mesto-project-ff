// @todo: Темплейт карточки
const cardTemplate = document.querySelector('#card-template').content;
const cardPlacesList = document.querySelector('.places__list');

// @todo: DOM узлы
function addCard(arrElement) {
  cardPlacesList.append(arrElement);
}

// @todo: Функция создания карточки
function createCard(cardData, deleteHandler) {
  const cardElement = cardTemplate.querySelector('.card').cloneNode(true);
  cardElement.querySelector('.card__title').textContent = cardData.name;
  cardElement.querySelector('.card__image').src = cardData.link;
  cardElement.querySelector('.card__image').alt = cardData.name;
  const cardDeletButton = cardElement.querySelector('.card__delete-button');
  cardDeletButton.addEventListener('click', deleteHandler);
  
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
    const arrElement = createCard(cardData, deleteCard);
    addCard(arrElement);
  });
}

renderCards();