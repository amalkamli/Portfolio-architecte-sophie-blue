const BASE_URL = "http://localhost:5678/api/";
const login_button = document.getElementById('se_connecter');
const USERS_API = BASE_URL + "users/login";

login_button.addEventListener("click", loginUser);

async function loginUser() {
    // RÉCUPÉRATION DE L'ADRESSE E-MAIL ET DU MOT DE PASSE
    let user = {
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
    };

    try {
        const response = await fetch(USERS_API, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(user)
        });
        if (response.status === 200) {
            // SI LA CONNEXION EST RÉUSSIE, ON CONVERTIT LA RÉPONSE EN JSON
            const data = await response.json();
            // STOCKAGE DU JETON DANS LE STOCKAGE DE SESSION
            sessionStorage.setItem("token", data.token);
            // REDIRECTION VERS LA PAGE D'ACCUEIL
            window.location.href = "index.html";
        } else {
            // SI L'ADRESSE E-MAIL OU LE MOT DE PASSE SONT INCORRECTS, AFFICHAGE D'UN MESSAGE D'ERREUR
            const loginError = document.getElementById("login_error");
            loginError.innerHTML = "E-mail ou mot de passe incorrect";
            loginError.style.display = "flex";
        }
    } catch (error) {
        // GESTION DES ERREURS DE REQUÊTE
        console.error('Une erreur s\'est produite lors de la requête :', error);
        const loginError = document.getElementById("login_error");
        loginError.innerHTML = "Une erreur s'est produite lors de la connexion";
        loginError.style.display = "flex";
    }
}
