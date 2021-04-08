fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        displayDefault(data);
        filterPhotographersTags(data);
        displayPhotographers(data)
    })

function displayDefault(data) {

    data.photographers.map(photographer => { 
      const photographersContainer = document.getElementById('container');
      const articlePhotographers = document.createElement("article");
      const photographerTemplate = `
      <div class="photographerContainer">
        <a href="photographer.html?id=${photographer.id}">
          <div class="portraitBox">
            <img src="${photographer.portrait}" alt="Photo de ${photographer.name}">
          </div>
          <h1 class="name">${photographer.name}</h1>
        </a>
        <p class="city">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
        <ul class="tags">${photographer.tags.map(tag => `<li id=${tag} class="tag photographer-tags">#${tag}</li>`).join(" ")}</ul>  
      </div>
      `  
      photographersContainer.appendChild(articlePhotographers);
      articlePhotographers.innerHTML = photographerTemplate;
        }); 
      };
      
function filterElements(data, tag){
  data.photographers.forEach(photographer => {
    if(photographer.tags.indexOf(tag.id || tag) != -1) {
      const photographersContainer = document.getElementById('container');
      const articlePhotographers = document.createElement("article");
      const photographerTemplate = `
      <div class="photographerContainer">
        <a href="photographer.html?id=${photographer.id}">
          <div class="portraitBox">
            <img src="${photographer.portrait}" alt="Photo de ${photographer.name}">
          </div>
          <h1 class="name">${photographer.name}</h1>
        </a>
        <p class="city">${photographer.city}, ${photographer.country}</p>
        <p class="tagline">${photographer.tagline}</p>
        <p class="price">${photographer.price}€/jour</p>
        <ul class="tags">${photographer.tags.map(tag => `<li id=${tag} class="tag photographer-tags">#${tag}</li>`).join(" ")}</ul>  
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
