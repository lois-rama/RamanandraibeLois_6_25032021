fetch('../data.json')
.then((response) => response.json())
.then(data => {
    photographerProfil(data);
    photographerWork(data.media);
    openLightBox(data);
})

let currentPhotographerPhotos = [];
let photoName = [];
let currentIndex;

function photographerProfil(data){
    const id = window.location.search.split('id=')[1];  
    const photographers = !id ? data.photographers: data.photographers.filter(photographer => photographer.id == id);
    photographers.forEach(element => {
      const sectionPhoto = document.getElementById('photographer_container');
      const divPhoto = document.createElement('div'); 
      const profilTemplate = `
        <section aria-label="Profil photographe" class="profil-container">
          <h2>${element.name}</h2>
          <p>${element.city}, ${element.country}</p>
          <p class="tagline">${element.tagline}</p>
          <p >${element.tags.map(tag => `<a id="tags-photo" href="accueil.html?id=${tag}" class='tags'>#${tag}</a>`).join(" ")}</p>
          <button id="contact">Contactez-moi</button>
          <div class="portraitBox">
              <img src="${element.portrait}" alt="photo de ${element.name}">
          </div>
        </section>
      `
      divPhoto.innerHTML = profilTemplate;
      sectionPhoto.appendChild(divPhoto);
    }) 
  }

function photographerWork(media){
  const photographerId = window.location.search.split('id=')[1];  
  media.forEach(element => {   
    if(photographerId == element.photographerId){
      const sectionPhoto = document.getElementById('photographer_gallery');
      const divPhoto = document.createElement("div");
      const galleryTemplate = `         
        <div class="photo-box"> 
          <div class="photo" data-id=${element.id}>
            ${videoOrImage(element.image, element.video, element)}
          </div>   
          <div class="text">
            <p> ${element.photoName}<b>${element.price} € <span class='under-photo-info'>${element.likes}</span> <i class="fas fa-heart heartIcon"></i></b></p>
          </div>
        </div>
        `
      divPhoto.innerHTML = galleryTemplate;
      sectionPhoto.appendChild(divPhoto);

      if ( 'image' in element) {currentPhotographerPhotos.push(element.image), photoName.push(element.photoName)};
      if ( 'video' in element) {currentPhotographerPhotos.push(element.video), photoName.push(element.photoName)}
      
  }})
}
console.log(currentPhotographerPhotos)

function videoOrImage(image, video, element) {
  if ('image' in element){
    return ` <img class="photos" aria-label="${element.photoName}" src="${image}">`
  }
  else if ('video' in element){
    return ` <video class="photos" aria-label="${element.photoName}" src="${video}" width="300px" height="300px" controls=0></video>`
  }
}
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

    if (currentIndex < 0){
      currentIndex = photoName.length - 1;
    }
    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`  
    console.log(currentIndex)
  });

  nextBtn.addEventListener('click', () => {
    currentIndex += 1;
    if (currentIndex > currentPhotographerPhotos.length - 1) {
      currentIndex = 0;
    }
    const src = currentPhotographerPhotos[currentIndex];
    if (src.endsWith("jpg")){photo.innerHTML = `<img class="photos" src="${src}">`}
    else {photo.innerHTML = `<video controls="controls" class="photos" src="${src}">`} 

    if (currentIndex > photoName.length - 1){
       currentIndex = 0;    
    }
    const nameSrc = photoName[currentIndex]; 
    photoNameText.innerHTML = `${nameSrc}`
    console.log(currentIndex)
  })
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
closeLightBox()