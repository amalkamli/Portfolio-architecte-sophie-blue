import config from './config.js';

document.addEventListener('DOMContentLoaded', async () => {
    const filtersContainer = document.querySelector('.filters');
    const gallery = document.querySelector('.gallery');
    
    const fetchData = async (url) => {
        const response = await fetch(url);
        return response.json();
    };

    const createButton = (category) => {
        const button = document.createElement('button');
        button.textContent = category.name;
        button.classList.add('filter-button');
        button.dataset.categoryId = category.id;
        button.addEventListener('click', () => {
            filterFigures(category.id);
        });
        return button;
    };

    const filterFigures = (categoryId) => {
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
    };

    let worksData = await fetchData(config.worksUrl);
    const categoriesData = await fetchData(config.categoriesUrl);

    // Créer le bouton "Tous" en dehors de la logique de tri
    const allButton = createButton({ id: 'all', name: 'Tous' });
    filtersContainer.appendChild(allButton);

    // Trier les catégories en fonction de l'ordre désiré
    const order = ['Tous', 'Objets', 'Appartements', 'Hotels & restaurants'];
    const sortedCategories = categoriesData.sort((a, b) => {
        return order.indexOf(a.name) - order.indexOf(b.name);
    });

    sortedCategories.forEach(category => {
        const button = createButton(category);
        filtersContainer.appendChild(button);
    });

    filterFigures('all');
});
