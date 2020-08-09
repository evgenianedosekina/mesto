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
const closeImage = popUpImage.querySelector(".popup__button-close");

// Формы
const editProfileForm = popUpEditProfile.querySelector(".form");
const nameInput = editProfileForm.querySelector("#name");
const jobInput = editProfileForm.querySelector("#occupation");
const profileName = document.querySelector(".profile__name");
const profileOccupation = document.querySelector(".profile__occupation");

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
  
  cardTitle.textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardImage.addEventListener("click", () => {
    handleImageClick(cardImage.src, cardTitle.textContent, cardImage.alt );
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
  openModal(popUpImage);
  popUpImageTitle.textContent = textcontent;
  popUpImageSrc.src = src;
  popUpImageSrc.alt = initialCards.name;
}

// Открытие/Закрытие поп-апов

//Профиль
function openModal(modalWindow) {
  modalWindow.classList.add("popup_open");
  document.addEventListener('keydown', closeEsc);
}
function closeModal(modalWindow) {
  modalWindow.classList.remove("popup_open");
  document.removeEventListener('keydown', closeEsc);
  }

// Закрытие по кнопке Escape

function closeEsc(evt){
  const openPopup = document.querySelector(".popup_open");
    if (evt.key === 'Escape') {
      closeModal(openPopup);
    }
  }

// Закрытие по клику вне модалки

function closeModalByOverlay(e) {
  if (!e.target.closest('.popup__container')){
    closeModal(e.target.closest('.popup'));
  } 
}

popUpEditProfile.addEventListener("click", closeModalByOverlay);
popUpAddCard.addEventListener("click", closeModalByOverlay);
popUpImage.addEventListener("click", closeModalByOverlay);

// Отправка формы
function formSubmitHandler(evt) {
  evt.preventDefault();

  profileName.textContent = nameInput.value;
  profileOccupation.textContent = jobInput.value;
  closeModal(popUpEditProfile);
  editProfileForm.reset();
}

editProfileForm.addEventListener("submit", formSubmitHandler);


openEditProfileButton.addEventListener("click", () => {
  if (!popUpEditProfile.classList.contains("popup_open")) {
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
  } 
  openModal(popUpEditProfile);
  
});
closeEditProfileButton.addEventListener("click", () => {
  closeModal(popUpEditProfile);
  
});






// Карточка

function addCardSubmitHandler(evt) {
  evt.preventDefault();

  renderCard({ name: imageInput.value, link: linkInput.value });

  closeModal(popUpAddCard);
  addCardForm.reset();
}

addCardForm.addEventListener("submit", addCardSubmitHandler);

openAddCardButton.addEventListener("click", () => {
  openModal(popUpAddCard);
});
closeAddCardButton.addEventListener("click", () => {
  closeModal(popUpAddCard);
});

// Фото

closeImage.addEventListener("click", () => {
  closeModal(popUpImage);
});



