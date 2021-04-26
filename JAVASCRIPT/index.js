async function getData(url){
  const data = await fetch(url)
    .then(response => response.json())
    .then (data => data);
    return data;
}
const data = getData("../data.json")
console.log(data);

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
        <a href="photographer.html?id=${photographer.id}">
          <div class="portraitBox">
            <img src="${photographer.portrait}" alt="Photo de ${photographer.name}">
          </div>
          <h2 class="name">${photographer.name}</h2>
        </a>
        <p class="city">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
        <ul class="tags">${photographer.tags.map(tag => `<li data-filter=${tag} class="tag photographer-tags">#${tag}</li>`).join(" ")}</ul>  
      </div>
      `  
      photographersContainer.appendChild(articlePhotographers);
      articlePhotographers.innerHTML = photographerTemplate;
      }
    }


function displayDefault() {
 data.photographers.forEach(p => { 
    const photographer = new Photograph(p);
    photographer.getTemplate('container')
  }); 
};
  
  displayDefault();

      
function filterElements(data, tag){
  data.photographers.forEach(photographer => {
    if(photographer.tags.includes(tag.dataset.filter)) {
      const photographersContainer = document.getElementById('container');
      const articlePhotographers = document.createElement("article");
      const photographerTemplate = `
      <div class="photographerContainer">
        <a href="photographer.html?id=${photographer.id}">
          <div class="portraitBox">
            <img src="${photographer.portrait}" alt="Photo de ${photographer.name}">
          </div>
          <h2 class="name">${photographer.name}</h2>
        </a>
        <p class="city">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
        <ul class="tags">${photographer.tags.map(tag => `<li data-filter=${tag} class="tag photographer-tags">#${tag}</li>`).join(" ")}</ul>  
      </div>
      `  
      photographersContainer.appendChild(articlePhotographers);
      articlePhotographers.innerHTML = photographerTemplate;

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
