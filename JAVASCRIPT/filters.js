export class Filter {
    // FILTER TAGS
    filterTags() {
        let filtres = document.querySelector('ul');
        let articles = document.querySelectorAll('.articleProfil');

        // event listener on click
        filtres.addEventListener('click', event => {
            let classValue = event.target.classList.value;

            if (-1 === classValue.indexOf('active')) {
                event.target.classList.add('active')
            } else {
                event.target.classList.remove('active')
            }

            this.sortPhotographersProfil(articles);
        });
    }

    // retrieve the filters with the 'active' class and place them in the 'filtersSelected' array    
    getActiveFilters() {
        let currentFilters = document.querySelectorAll('.active');
        let filtersSelected = [];

        currentFilters.forEach(function (currentFilter) {
            filtersSelected.push(currentFilter.getAttribute("data-filter"));
        });

        return filtersSelected;
    }

    // compare/check if 'filters' has the same value as the 'article' class    
    checkFilters(article) {
        let filters = this.getActiveFilters();
        let classValue = article.classList.value;
        let classes = classValue.split(' ');
        let intersection = filters.filter(
            x => classes.includes(x)
        );

        return filters.length == intersection.length;
    }

    // display or not the profils
    sortPhotographersProfil(articles) {
        articles.forEach((article) => {
            if (this.checkFilters(article)) {
                article.style.display = 'block';
            } else {
                article.style.display = 'none';
            }
        });
    }
}