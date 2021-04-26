fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        console.log(data)
        displayDefault(data);
        displayPhotographers(data);
        filterPhotographersTags(data);
    })

    class Photograph {
      constructor(photographer) {
        this.id = photographer.id,
        this.name = photographer.name,
        this.portrait = photographer.portrait,
        this.country = photographer.country,
        this.city = photographer.city,
        this.tagline = photographer.tagline,
        this.price = photographer.price,
        this.tags = photographer.tags
      }
    
      getTemplate(containerId){
        const photographersContainer = document.getElementById(containerId);
        const articlePhotographers = document.createElement("article");
        const photographerTemplate = `
          <div class="photographerContainer">
            <a href="photographer.html?id=${this.id}">
            <div class="portraitBox">
              <img src="${this.portrait}" alt="Photo de ${this.name}">
            </div>
            <h2 class="name">${this.name}</h2>
            </a>
            <p class="city">${this.city}, ${this.country}</p>
            <p class="tagline">${this.tagline}</p>
            <p class="price">${this.price}€/jour</p>
            <ul class="tags">${this.tags.map(tag => `<li data-filter=${tag} class="tag photographer-tags">#${tag}</li>`).join(" ")}</ul>  
          </div>
        `  
      photographersContainer.appendChild(articlePhotographers);
      articlePhotographers.innerHTML = photographerTemplate;
      }
    }


function displayDefault(data) {
 data.photographers.forEach(photographer => { 
    const photographerProfil = new Photograph(photographer);
    photographerProfil.getTemplate('container')
  }); 
};

      
function filterElements(data, tag){
  data.photographers.forEach(photographer => {
    if(photographer.tags.includes(tag.dataset.filter)) {
      const photographerProfil = new Photograph(photographer);
    photographerProfil.getTemplate('container')

    }
  })
}

//Ajout de la classe "Active" 
function addActiveClass() {

const buttons = document.querySelectorAll(".filters li");
buttons.forEach(btn => btn.addEventListener("click", () => {
  //1-st loop through every button and remove the class ACTIVE
  buttons.forEach(btn => btn.classList.remove('active'));
  // ajout ACTIVE au btn cliqué
  btn.classList.add('active'); 
}));
}
addActiveClass();

//Filtres a partir de la navigation
function displayPhotographers(data){

const buttons = document.querySelectorAll(".filters li");
buttons.forEach(btn => btn.addEventListener("click", () => {
  //efface l'ancien HTML de photographersContainer et le remplace par le block HTML de filterElements
  const photographersContainer = document.getElementById('container');
  photographersContainer.innerHTML = "";    
  filterElements(data, btn);                                         
}));
};

//Filtre photographe à partir des tags persos
function filterPhotographersTags(data) {

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('photographer-tags')) {
    const photographersContainer = document.getElementById('container');
    photographersContainer.innerHTML = "";                                      
    filterElements(data, event.target);         
  }
});
};
