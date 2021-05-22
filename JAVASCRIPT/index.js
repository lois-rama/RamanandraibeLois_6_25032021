fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        displayDefault(data);
        displayPhotographers(data);
        filterPhotographersTags(data);
        removeActiveClass(data)
    })

import {Photograph} from "./photographer_template.js"; //import the class 'Photograph'

// Display the photograpehrs by default
function displayDefault(data) {
 data.photographers.forEach(photographer => { 
    const photographerProfil = new Photograph(photographer);
    photographerProfil.getTemplate('container')
  }); 
};
// display the filtered photographers
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
const allBtn = document.getElementById("all");
const buttons = document.querySelectorAll(".filters li button");
buttons.forEach(btn => btn.addEventListener("click", () => {
  //1-st loop through every button and remove the class ACTIVE
  buttons.forEach(btn => btn.classList.remove('active'));
  // ajout ACTIVE au btn cliqué
  btn.classList.add('active');
  allBtn.style.display = "inline"
  }));
}
addActiveClass();

function removeActiveClass() {
  const allBtn = document.getElementById("all");
  allBtn.addEventListener("click", () => {
    if(allBtn.classList.contains('active')){
      document.location.reload();
    }
    });
  }
removeActiveClass()
//Filtres a partir de la navigation 
function displayPhotographers(data){

  const buttons = document.querySelectorAll(".filters li button");
  buttons.forEach(btn => btn.addEventListener("click", () => {
    //efface l'ancien HTML de photographersContainer et le remplace par le block HTML de filterElements
    const photographersContainer = document.getElementById('container');
    photographersContainer.innerHTML = "";    
    filterElements(data, btn);  //function is called here                                       
  }));
};

//Filtre photographe à partir des tags persos
function filterPhotographersTags(data) {

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('photographer-tags')) {
      const photographersContainer = document.getElementById('container');
      photographersContainer.innerHTML = "";                                      
      filterElements(data, event.target);  //function is called here          
    }
  });
};

const btnContenu = document.getElementById("passer-au-contenu");
// affichage du btn au scroll
window.addEventListener('scroll', () => {
  const scrollPosition = window.scrollY;

  if( scrollPosition < 20){
    btnContenu.style.display = "none";
  }else{
    btnContenu.style.display = "block";
  }
})