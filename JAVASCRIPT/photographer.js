let DATA;
fetch('../data.json')
.then((response) => response.json())
.then(data => {
    photographerProfil(data);;
    openLightBox(data);
    incrementLikesOnClick();
    DATA = data;
})

let currentPhotographerPhotos = [];
let photoName = [];
let currentIndex;
let likes = [];
let existingLikes = [];
let modifiedArray = [];

// Profil
function photographerProfil(data){
  const id = window.location.search.split('id=')[1];  
  const photographers = !id ? data.photographers: data.photographers.filter(photographer => photographer.id == id);
  photographers.forEach(element => {
    const sectionPhoto = document.getElementById('photographer_container');
    const articlePhoto = document.createElement('article'); 
    const price = element.price;
    const profilTemplate = `
      <section aria-label="Profil photographe" class="profil-container">
        <div class="infos">
        <h1>${element.name}</h1>
        <p>${element.city}, ${element.country}</p>
        <p class="tagline">${element.tagline}</p>
        <p >${element.tags.map(tag => `<a id="tags-photo" href="index.html?id=${tag}" class='tags'>#${tag}</a>`).join(" ")}</p>
        </div>
        <button id="contact">Contactez-moi</button>
        <div class="portraitBox">
            <img src="${element.portrait}" alt="photo de ${element.name}">
        </div>
      </section>
    `
    articlePhoto.innerHTML = profilTemplate;
    sectionPhoto.appendChild(articlePhoto);

    showModal(element);
    let likesTotal = photographerWork(data.media);
    likesAndPrice(likesTotal, price);
  }) 
}
// Gallery
function photographerWork(media){
  let likesTotal = 0;
  const photographerId = window.location.search.split('id=')[1];  
  media.forEach(element => {   
    if(photographerId == element.photographerId){
      const sectionPhoto = document.getElementById('photographer_gallery');
      const articlePhoto = document.createElement("article");
      likesTotal += element.likes;
      const galleryTemplate = `         
        <div class="photo-box"> 
          <div class="photo" data-id=${element.id}>
            ${videoOrImage(element.image, element.video, element)}
          </div>   
          <div class="text">
            <h3> ${element.photoName}</h3><p>${element.price}€<span class='under-photo-info'> ${element.likes} <i class="fas fa-heart heartIcon"></i></span></p>
          </div>
        `
      articlePhoto.innerHTML = galleryTemplate;
      sectionPhoto.appendChild(articlePhoto);

      if ( 'image' in element) {currentPhotographerPhotos.push(element.image), photoName.push(element.photoName)};
      if ( 'video' in element) {currentPhotographerPhotos.push(element.video), photoName.push(element.photoName)}
      likes.push(element.likes);
  }})
  return likesTotal;
}
// Likes 
function likesAndPrice(likesTotal, price){
  const domDiv = document.getElementById('likesPrices');
  const newDiv = document.createElement("div");
  const likesPriceTemplate = `
  <div id='likesBox' class="likes">${likesTotal} <i class="fas fa-heart"></i></div>
  <div class="price">${price}€ / jour</div>  
  `
    newDiv.classList.add('likesPriceContainer')
    newDiv.innerHTML = likesPriceTemplate;
    domDiv.appendChild(newDiv);
}
//increment likes on click
function incrementLikesOnClick() {
  const heartIcons = Array.from(document.getElementsByClassName('heartIcon')); // multiple heart icons
  heartIcons.forEach((likeIcon, index) => likeIcon.addEventListener('click', () => {
    
    // if the index of current photo is in the Arrey RETURN the index and stop executin IF NOT run the code block
    if (existingLikes.includes(index)) {return }
    else{
      const individualLikeBox = document.getElementsByClassName('under-photo-info');
      const totalLikesDivBox = document.getElementById("likesBox");
  
      let likesAfterAddition = likes[index] + 1;  // add 1 like to the individual current photo
      likes.splice(index, 1, likesAfterAddition); // replace the old value from the Array with the new value
  
      let globalNumberOfLikes = likes.reduce(function(a, b){return a + b;}); // return the sum of the array
  
      individualLikeBox[index].innerHTML = `<span> ${likesAfterAddition} <i class="fas fa-heart heartIcon"></i></span>`
      totalLikesDivBox.innerHTML = `<div>${globalNumberOfLikes} <i class="fas fa-heart"></i></div>`
    }
      // add the index of liked item to existingLikes Array everytime we click a photo
      existingLikes.push(index)
  }))
}

// Factory media
function videoOrImage(image, video, element) {
  if ('image' in element){
    return ` <img class="photos" aria-label="${element.photoName}" src="${image}" alt="${element.photoName}">`
  }
  else if ('video' in element){
    return ` <video class="photos" aria-label="${element.photoName}" src="${video}" alt="${element.photoName}" width="300px" height="300px" controls=0></video>`
  }
}
// Open LightBox
function openLightBox() {
  const getPhotos = Array.from(document.getElementsByClassName('photos'));
  getPhotos.forEach((photo, index) => photo.addEventListener("click", () => {

    const photo = document.getElementById('photoDiv');
    const lightBoxcontainer = document.getElementById('lightBox_container');
    const photoNameText = document.getElementById('photo-name');
    const src = currentPhotographerPhotos[index];
    const nameSrc = photoName[index];  
    currentIndex = index;

    lightBoxcontainer.style.display = 'block';
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`}
    
    photoNameText.innerHTML = `${nameSrc}`     
  }))
}
// bouttons suivant et précédent
function handleNextPrevButtons() {
  const previousBtn = document.querySelector('.left_icon');
  const nextBtn = document.querySelector('.right_icon');
  const photo = document.getElementById('photoDiv');
  const photoNameText = document.getElementById('photo-name');

  previousBtn.addEventListener('click', () => {
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = currentPhotographerPhotos.length - 1;
    }
    const src = currentPhotographerPhotos[currentIndex];
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`} 

    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`  
  });

  nextBtn.addEventListener('click', () => {
    currentIndex += 1;
    if (currentIndex > currentPhotographerPhotos.length - 1) {
      currentIndex = 0;
    }
    const src = currentPhotographerPhotos[currentIndex];
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`} 

    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`
  })
/////// lightBox using keyboard
  document.addEventListener('keydown', (key) => {

  if(key.code == "Escape"){
    const lightBoxcontainer = document.getElementById('lightBox_container');
    lightBoxcontainer.style.display = 'none';
  }

  //ArrowRight KEY
  else if(key.code == "ArrowRight"){
    currentIndex += 1;
    if (currentIndex > currentPhotographerPhotos.length - 1) {
      currentIndex = 0;
    }
    const src = currentPhotographerPhotos[currentIndex];
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`} 

    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`
  }

  //ArrowLeft KEY
  else if(key.code == "ArrowLeft"){
    currentIndex -= 1;
    if (currentIndex < 0) {
      currentIndex = currentPhotographerPhotos.length - 1;
    }
    const src = currentPhotographerPhotos[currentIndex];
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`} 

    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`  
  }
});
}
handleNextPrevButtons()

// close the lightbox
function closeLightBox(){
  const closeLightBoxBtn = document.querySelector('.close_icon');
    closeLightBoxBtn.addEventListener('click', () => {
      const lightBoxcontainer = document.getElementById('lightBox_container');
      lightBoxcontainer.style.display = 'none';
    })
}
closeLightBox();

// open the contact form
function showModal(element){

  document.getElementById("contact").addEventListener('click', () => {
    const formModal = document.getElementById('form_container');
    formModal.style.display = "block";
    document.getElementById('contact').style.display = "none";
    const namePhotographer = document.getElementById('name_photographer');
    namePhotographer.innerHTML = `${element.name}`;
  })
}

const form = document.querySelector('.form_container form');
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = document.getElementById('prenom');
    const nom = document.getElementById('nom');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    const errorPrenom = document.getElementById('error-prenom');
    const errorNom = document.getElementById('error-nom');
    const errorMail = document.getElementById('error-email');
    const errorMessage = document.getElementById('error-message');
    const prenomValid = validateInputs(prenom ,prenom.value, 2, errorPrenom, "Veuillez entrer 2 ou plus de caractères.");
    const nomValid = validateInputs(nom ,nom.value, 2, errorNom, "Veuillez entrer 2 ou plus de caractères.");
    const messageValid = validateInputs(message, message.value, 10, errorMessage, "Veuillez entrer 10 ou plus de caractères.");
    const emailValid = checkEmail(email, email.value, errorMail, "Veuillez entrer une adresse mail valide.");

    if( prenomValid && nomValid && messageValid && emailValid){
        const formModal = document.getElementById('form_container');
        formModal.style.display = "none";
        alert('Message envoyé !')
        form.reset();
    }
})

// Close the modal on X button
document.getElementById("X-button").addEventListener('click', () => {
  const formModal = document.getElementById('form_container');
  formModal.style.display = "none";
  document.getElementById('contact').style.display = "block";
})

// validate the inputs
function validateInputs(border ,entry, size, errorElt, errorMessage) {
  if ( entry.length < size ) {
    errorElt.innerHTML = errorMessage;
    errorElt.style.color = "white";
    errorElt.style.fontSize = "0.8rem";
    border.style.border = "1px solid red";
    return false;
  }else {
    errorElt.innerHTML = " ";
    border.style.border = "1px solid white";
    return true;
  }
}

// Validate EMAIL /////// 
function checkEmail(border, email, errorElt, errorMessage ) {
    let regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (!email.toLowerCase().match(regex) || email == '') {
        errorElt.innerHTML = errorMessage;
        errorElt.style.color = "white";
        errorElt.style.fontSize = "0.8rem";
        border.style.border = "1px solid red";
        return false;
    }else {
        errorElt.innerHTML = "";
        border.style.border = "1px solid white";
        return true;
    }
}

//OPEN DropDown
document.getElementById('arrow-down-open').addEventListener('click', () => {
  const hidenPart = document.getElementById("hidden-sort");
  const chevronUpIcon = document.getElementById('arrow-down-open');
  const chevronDownIcon = document.getElementById('arrow-up-close');  
      hidenPart.classList.add("show");//add show class to change display by default which is none
      chevronUpIcon.classList.remove("fa-chevron-up-NO");//remove this class which gives display none by default
      chevronDownIcon.classList.toggle("fa-chevron-up-NO");
})
// CLOSE DropDown
document.getElementById("arrow-up-close").addEventListener('click', () => {
  const hidenPart = document.getElementById("hidden-sort");
  const chevronUpIcon = document.getElementById('arrow-down-open');
  const chevronDownIcon = document.getElementById('arrow-up-close');  
      hidenPart.classList.remove("show");
      chevronUpIcon.classList.add("fa-chevron-up-NO");
      chevronDownIcon.classList.toggle("fa-chevron-up-NO");
})

// Trier PAR
const trierParBtn = Array.from(document.getElementsByClassName('sort'));
trierParBtn.forEach((btn, index) => btn.addEventListener('click', () => {

if( index == 0) {
  //////////// sort by POPULARITY //////////////   
  modifiedArray = DATA.media.sort((a, b) => {return b.likes - a.likes})
  document.getElementById("photographer_gallery").innerHTML = "";
  likes = [];
  currentPhotographerPhotos = [];
  photographerWork(modifiedArray);
  openLightBox(DATA)
  incrementLikesOnClick()
          
}else if (index == 1) {
  /////////// sort by DATE /////////////////////    
  modifiedArray = DATA.media.sort((a, b) => { return new Date(a.date).valueOf() - new Date(b.date).valueOf();}) 
  document.querySelector("#photographer_gallery").innerHTML = "";;
  likes = [];
  currentPhotographerPhotos = [];
  photographerWork(modifiedArray);
  openLightBox(DATA)
  incrementLikesOnClick()

}else if ( index == 2) {
  ////////////// sort by ALFABETIC ORDER ///////
  modifiedArray = DATA.media.sort((a, b) => {
  if(a.photoName.toLowerCase() < b.photoName.toLowerCase()) { return -1;}
  else if (a.photoName.toLowerCase() > b.photoName.toLowerCase()) {return 1;}
  })
      document.querySelector("#photographer_gallery").innerHTML = "";;
      likes = [];
      currentPhotographerPhotos = [];
      photographerWork(modifiedArray);
      openLightBox(DATA)
      incrementLikesOnClick()

  }
}));