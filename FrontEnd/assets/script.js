document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.filters');
    const gallery = document.querySelector('.gallery');
    let worksData;
    let categoriesData;

    // Fonction pour récupérer les données des œuvres depuis une API
    function fetchWorksData() {
        const worksUrl = 'http://localhost:5678/api/works';
        return fetch(worksUrl)
            .then(response => response.json())
            .then(data => {
                worksData = data;
                fetchCategoriesData(); // Une fois les données des œuvres récupérées, récupérer les catégories
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données des œuvres:', error);
            });
    }

    // Fonction pour récupérer les données des catégories depuis une API
    function fetchCategoriesData() {
        const categoriesUrl = 'http://localhost:5678/api/categories';
        return fetch(categoriesUrl)
            .then(response => response.json())
            .then(data => {
                categoriesData = data;
                createFilterButtons();
            })
            .catch(error => {
                console.error('Erreur lors de la récupération des données des catégories:', error);
            });
    }

    // Fonction pour créer les boutons de filtrage en fonction des catégories récupérées
    function createFilterButtons() {
        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.classList.add('filter-button');
        allButton.dataset.categoryId = 'all';
        allButton.addEventListener('click', () => {
            filterFigures('all');
        });
        filtersContainer.appendChild(allButton);

        categoriesData.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('filter-button');
            button.dataset.categoryId = category.id;
            button.addEventListener('click', () => {
                filterFigures(category.id);
            });
            filtersContainer.appendChild(button);
        });
    }

    // Fonction pour afficher les figures en fonction de la catégorie sélectionnée
    function filterFigures(categoryId) {
        gallery.innerHTML = ''; // Effacer les figures actuelles
        worksData.forEach(work => {
            if (categoryId === 'all' || work.categoryId === categoryId) {
                const figure = document.createElement('figure');
                const img = document.createElement('img');
                img.src = work.imageUrl;
                img.alt = work.title;
                const figcaption = document.createElement('figcaption');
                figcaption.textContent = work.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                gallery.appendChild(figure);
            }
        });
    }
    // Appel de la fonction pour récupérer les données des œuvres dès que la page est chargée
    fetchWorksData();
});
