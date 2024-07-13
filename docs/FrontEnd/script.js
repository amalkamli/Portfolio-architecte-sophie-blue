document.addEventListener('DOMContentLoaded', () => {
    const filtersContainer = document.querySelector('.filters');
    const gallery = document.querySelector('.gallery');
    let worksData;
    let categoriesData;

    //Fonction pour récupérer les données de travaux
     function fetchWorksData()  {
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
    // Function pour récupérer les données des categories 
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
    // Fonction pour créer des boutons de filtre
    function createFilterButtons() {
        const allButton = document.createElement('button');
        allButton.textContent = 'Tous';
        allButton.style.backgroundColor = '#1D6154';
    allButton.style.color = 'white';
   
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
// Fonction pour filtrer les travaux en fonction de la catégorie
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
            }
        });
        removeSelectedClass();
        addSelectedClass(categoryId);
    }

// Fonction pour ajouter la classe "selected" à un élément de catégorie
    function addSelectedClass(categoryId) {
        const selectedButton = document.querySelector(`[data-category-id="${categoryId}"]`);
        if (selectedButton) {
            selectedButton.classList.add('selected');
        }
    }

// Fonction pour supprimer la classe "sélectionnée" de tous les éléments de catégorie
    function removeSelectedClass() {
        const selectedButton = document.querySelector('.selected');
        if (selectedButton) {
            selectedButton.classList.remove('selected');
        }
    }

// Fonction pour gérer la connexion
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

// Appelez la fonction pour récupérer les données de travail
    fetchWorksData();

// Appel de la fonction pour gérer la connexion
    gestion_connexion();
      
});
