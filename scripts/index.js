// Поп-апы
const popUpEditProfile = document.querySelector(".popup_type_edit-profile");
const popUpAddCard = document.querySelector(".popup_type_add-card");
const popUpImage = document.querySelector(".popup_type_image");

// Кнопки
const openEditProfileButton = document.querySelector(".profile__button-edit");
const closeEditProfileButton = popUpEditProfile.querySelector(
  ".popup__button-close"
);
const openAddCardButton = document.querySelector(".profile__button-add");
const closeAddCardButton = popUpAddCard.querySelector(".popup__button-close");
const openImage = popUpImage.querySelector(".popup__image");
const closeImage = popUpImage.querySelector(".popup__button-close");

// Формы
let formElement = popUpEditProfile.querySelector(".form");
let nameInput = formElement.querySelector("#name");
let jobInput = formElement.querySelector("#occupation");
let profileName = document.querySelector(".profile__name");
let profileOccupation = document.querySelector(".profile__occupation");

const addCardForm = popUpAddCard.querySelector(".form");
const imageInput = addCardForm.querySelector("#image-title");
const linkInput = addCardForm.querySelector("#image-link");

const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardList = document.querySelector(".places");

const popUpImageTitle = popUpImage.querySelector(".popup__title");
const popUpImageSrc = popUpImage.querySelector(".popup__image");

// Массив

const initialCards = [
  {
    name: "Архыз",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link:
      "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// Создаем карточку

function createCard(data) {
  const cardElement = cardTemplate.cloneNode(true);

  const cardImage = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");
  const cardLikeButton = cardElement.querySelector(".card__like");
  const cardDeleteButton = cardElement.querySelector(".card__delete");

  cardLikeButton.addEventListener("click", (evt) =>
    evt.target.classList.toggle("card__like_active")
  );

  cardDeleteButton.addEventListener("click", () => {
    const deleteCard = cardDeleteButton.closest(".card");
    deleteCard.remove();
  });
  cardImage.addEventListener("click", () => {
    handleImageClick();
  });

  cardTitle.textContent = data.name;
  cardImage.src = data.link;

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage.src, cardTitle.textContent);
  });

  return cardElement;
}
// Рендерим карточку

function renderCard(data) {
  cardList.prepend(createCard(data));
}

initialCards.forEach((data) => {
  renderCard(data);
});

function handleImageClick(src, textcontent) {
  popUpImage.classList.add("popup_open");
  popUpImageTitle.textContent = textcontent;
  popUpImageSrc.src = src;
}

// Открытие/Закрытие поп-апов

//Профиль
function openPopupProfile() {
  popUpEditProfile.classList.add("popup_open");
  nameInput.value = profileName.textContent;
  jobInput.value = profileOccupation.textContent;
}

function closePopupProfile() {
  popUpEditProfile.classList.remove("popup_open");
}

function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closePopupProfile();
}

formElement.addEventListener("submit", formSubmitHandler);

openEditProfileButton.addEventListener("click", () => {
  openPopupProfile();
});
closeEditProfileButton.addEventListener("click", () => {
  closePopupProfile();
});

// Карточка
function openAddCard() {
  popUpAddCard.classList.add("popup_open");
}
function closeAddCard() {
  popUpAddCard.classList.remove("popup_open");
}
function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: imageInput.value, link: linkInput.value });

  closeAddCard();
}

addCardForm.addEventListener("submit", addCardSubmitHandler);

openAddCardButton.addEventListener("click", () => {
  openAddCard();
});
closeAddCardButton.addEventListener("click", () => {
  closeAddCard();
});

// Фото

function closeImageWindow() {
  popUpImage.classList.remove("popup_open");
}

closeImage.addEventListener("click", () => {
  closeImageWindow();
});
