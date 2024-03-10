<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.filters');
    const gallery = document.querySelector('.gallery');
    let worksData;
    let categoriesData;

    // Function to fetch works data
    function fetchWorksData() {
        const worksUrl = 'http://localhost:5678/api/works';
        return fetch(worksUrl)
            .then(response => response.json())
            .then(data => {
                worksData = data;
                fetchCategoriesData(); // Once works data is fetched, fetch categories data
            })
            .catch(error => {
                console.error('Error fetching works data:', error);
            });
    }

    // Function to fetch categories data
    function fetchCategoriesData() {
        const categoriesUrl = 'http://localhost:5678/api/categories';
        return fetch(categoriesUrl)
            .then(response => response.json())
            .then(data => {
                categoriesData = data;
                createFilterButtons();
                filterFigures('all'); // Initially populate the gallery
            })
            .catch(error => {
                console.error('Error fetching categories data:', error);
            });
    }

    // Function to create filter buttons
    function createFilterButtons() {
        const allButton = document.createElement('button');
        allButton.textContent = 'All';
        allButton.classList.add('filter-button');
        allButton.dataset.categoryId = 'all';
        allButton.addEventListener('click', () => {
            filterFigures('all');
            removeSelectedClass();
            allButton.classList.add('selected');
        });
        filtersContainer.appendChild(allButton);

        categoriesData.forEach(category => {
            const button = document.createElement('button');
            button.textContent = category.name;
            button.classList.add('filter-button');
            button.dataset.categoryId = category.id;
            button.addEventListener('click', () => {
                filterFigures(category.id);
                removeSelectedClass();
                button.classList.add('selected');
            });
            filtersContainer.appendChild(button);
        });
    }

    // Function to filter figures based on category
    function filterFigures(categoryId) {
        gallery.innerHTML = ''; // Clear the current figures
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
                createDeleteButton(figure, work); // Create delete button for each work
            }
        });
        removeSelectedClass();
        addSelectedClass(categoryId);
    }

    // Function to create delete button for each work
    function createDeleteButton(figure, work) {
        const button = document.createElement('button');
        button.textContent = 'Delete';
        button.classList.add('delete-button');
        button.addEventListener('click', () => {
            // Logic to delete the work
        });
        figure.appendChild(button);
    }

    // Function to add the class "selected" to a category element
    function addSelectedClass(categoryId) {
        const selectedButton = document.querySelector(`[data-category-id="${categoryId}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }

    // Function to remove the class "selected" from all category elements
    function removeSelectedClass() {
        const selectedButton = document.querySelector('.selected');
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }
    }

    // Function to manage connection
    function gestion_connexion() {
        if (sessionStorage.getItem("token")) {
            let loginLogoutLink = document.getElementById("login_logout");
            loginLogoutLink.textContent = "Logout";

            let bandeau_edit = document.getElementById("edition");
            bandeau_edit.style.display = "flex";

            let projet_modif = document.getElementById("modif_projet");
            projet_modif.style.display = "inline";

            let button_filter = document.querySelector(".filters");
            button_filter.style.display = "none";

            loginLogoutLink.addEventListener("click", function (event) {
                event.preventDefault();

                sessionStorage.removeItem("token");

                window.location.href = "index.html";
            });
        }
    }

    // Call the function to fetch works data
    fetchWorksData();

    // Call the function to manage connection
    gestion_connexion();
});

=======
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
>>>>>>> ddf3db1af3209db0395977c2a15548ccd4e9aa0a
