fetch("../data.json")
    .then(response => response.json())
    .then(data => {
        displayDefault(data);
    })

import {Photograph} from "./photographer_template.js"; //import the class 'Photograph'
import {Filter} from "./filters.js"


// Display the photograpehrs by default
function displayDefault(data) {
 data.photographers.forEach(photographer => { 
    const photographerProfil = new Photograph(photographer);
    photographerProfil.getTemplate('container')
  });
  new Filter().filterTags();
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