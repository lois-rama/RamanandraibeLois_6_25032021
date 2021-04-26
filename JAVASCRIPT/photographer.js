
fetch('../data.json')
.then((response) => response.json())
.then(data => {
    photographerProfil(data);
    photographerWork(data.media);
})

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
    photographerId = window.location.search.split('id=')[1];  
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
                  <p> ${element.photoName}<b>${element.price} €  &nbsp <span class='under-photo-info'>${element.likes}</span> <i class="fas fa-heart heartIcon"></i></b></p>
              </div>
          </div>
          `
        divPhoto.innerHTML = galleryTemplate;
        sectionPhoto.appendChild(divPhoto);
      }})
  }

  function videoOrImage(image, video, element) {
    if ('image' in element){
      return ` <img class="photos" aria-label="photo ${element.photoName}" src="${image}">`
    }
    else if ('video' in element){
      return ` <iframe src="${video}" width="300px" height="300px" controls=0></iframe>`
    }
  }