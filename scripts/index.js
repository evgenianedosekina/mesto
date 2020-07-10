const openPopupButton = document.querySelector ('.profile__button-edit');
const popUp = document.querySelector ('.popup');
const closePopupButton = document.querySelector ('.popup__button-close');
let formElement = document.querySelector ('.form');
let nameInput = document.querySelector ('#name');
let jobInput = document.querySelector ('#occupation');
let profileName = document.querySelector ('.profile__name');
let profileOccupation = document.querySelector ('.profile__occupation');



openPopupButton.addEventListener('click', () => {
    popUp.classList.add ('popup_open');
    nameInput.value = profileName.textContent;
    jobInput.value = profileOccupation.textContent;
})

function closePopup () {
    popUp.classList.remove ('popup_open');
}
closePopupButton.addEventListener('click', closePopup)


function formSubmitHandler (evt) {
    evt.preventDefault(); 
    
    profileName.textContent = nameInput.value;
    profileOccupation.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler);
