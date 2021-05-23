export class Photograph {
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
      articlePhotographers.className = this.tags.join(" ") + ' articleProfil';
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