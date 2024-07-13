let worksData;
document.addEventListener("DOMContentLoaded", function() {
    const modal = document.getElementById("modal1");
    const modalCloseBtn = document.querySelector(".js-modal-close-1");
    const MODALE_WRAPPER = document.querySelector(".modal-wrapper1");
    // Définir la fonction fetchWorksData en dehors de openModal
    function fetchWorksData() {
        const worksUrl = 'http://localhost:5678/api/works';
        return fetch(worksUrl)
            .then(response => response.json())
            .then(data => {
                const modalGallery = document.querySelector('.modal-gallery');
                modalGallery.innerHTML = '';

                data.forEach(work => {
                    const imageContainer = document.createElement('div'); // Container pour chaque image et icône
                    const imageElement = document.createElement('img');
                    const deleteIcon = document.createElement('i');

                    imageElement.src = work.imageUrl;
                    imageElement.alt = work.title;

                    deleteIcon.classList.add('fa', 'fa-trash'); // Font Awesome class for trash icon
                    deleteIcon.addEventListener('click', () => deleteImage(work.id));

                    imageContainer.appendChild(imageElement);
                    imageContainer.appendChild(deleteIcon);
                    modalGallery.appendChild(imageContainer);
                });
            })
            .catch(error => {
                console.error('Une erreur s\'est produite lors de la récupération des données des travaux :', error);
            });
    }
    // Ouvrir la modale
    function openModal() {
        MODALE_WRAPPER.style.display="flex"
        modal.style.display= "block";
        fetchWorksData(); // Appeler fetchWorksData() après l'ouverture de la modale
    }
    // Supprimer un travail
    function deleteImage(imageId) {
        const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce projet ?");

        if (confirmation) {
            try {
                deleteWorkFetch(imageId); // Supprimer le travail via l'API
            } catch (error) {
                console.error("Erreur lors de la suppression du projet:", error);
            }
        }
    }
    // Fermer la modale
    function closeModal() {
        modal.style.display = "none";
    }
    // Événement pour ouvrir la modale
    document.getElementById("modif_projet").addEventListener("click", openModal);
    // Événement pour fermer la modale en cliquant sur le bouton de fermeture
    modalCloseBtn.addEventListener("click", closeModal);
    // Supprimer un travail via une requête DELETE à l'API
    function deleteWorkFetch(idWork) {
    let token = sessionStorage.getItem("token");

    fetch(WORKS_API + '/' + idWork, {
            method: "DELETE",
            headers: {
                'Accept': '*/*',
                'Authorization': `Bearer ${token}`,
            }
        })
        .then(response => {
            if (response.status === 200 || response.status === 201 || response.status === 204) {
                // Attendre un court laps de temps avant de rafraîchir la galerie
                setTimeout(refreshGallery, 500); // Attendre 500 millisecondes
            } else {
                alert("Erreur lors de la suppression du projet.")
            }
        })
    }
    // Rafraîchir la galerie
    function refreshGallery() {
        fetchWorksData(); // Rechargez les données de la galerie à partir de l'API
    }
    // Appeler fetchWorksData() pour afficher la galerie initiale
    fetchWorksData();
});



