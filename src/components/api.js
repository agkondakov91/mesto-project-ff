// общие данные
const api = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/wff-cohort-2',
  headers: {
    authorization: '898ac20f-ea41-42e4-b8ee-de36d37568f3',
    'Content-Type': 'application/json',
  },
};

// проверка ответа от сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

//1. Загрузка информации о пользователе с сервера
export function getUserInfo() {
  return fetch(`${api.baseUrl}/users/me`, {
    method: 'GET',
    headers: api.headers,
  })
  .then(res => checkResponse(res))
}

//2. Загрузка карточек с сервера
export function getInitialCards() {
  return fetch(`${api.baseUrl}/cards`, {
    method: 'GET',
    headers: api.headers
  })
  .then(res => checkResponse(res))
}
 
//3. Редактирование профиля
export function saveUserData() {
  return fetch(`${api.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: api.headers,
    body: JSON.stringify({
      name: `${popupInputName.value}`,
      about: `${popupInputJob.value}`
    })
  })
  .then(res => checkResponse(res))
}

//4. Добавление новой карточки
export function saveNewCardData(cardData) {
  return fetch(`${api.baseUrl}/cards`, {
    method: 'POST',
    headers: api.headers,
    body: JSON.stringify(cardData)
  })
  .then(res => checkResponse(res))
}

//5. Постановка и снятие лайка
export function handleSetLike(cardId) {
  return fetch(`${api.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: api.headers,
  })
  .then(res => checkResponse(res))
}

export function handleRemoveLike(cardId) {
  return fetch(`${api.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: api.headers,
  })
  .then(res => checkResponse(res))
}

//6. Удаление карточки
export function deleteCardData(cardId) {
  return fetch(`${api.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: api.headers,
  })
  .then(res => checkResponse(res))
}

//7. Обновление аватара пользователя
export function saveUserPicture(pictureData) {
  return fetch(`${api.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: api.headers,
    body: JSON.stringify(pictureData)
  })
  .then(res => checkResponse(res))
}

//8. Улучшенный UX всех форм