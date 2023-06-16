// sélectionner la div pour les différents <figure>"

const gallery = document.querySelector(".gallery");

// créer une fonction pour récupérer les projets

fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    for (let i in data) {
      let figure = document.createElement("figure");
      figure.setAttribute("data-catId", data[i].category.id);
      gallery.append(figure);

      let image = document.createElement("img");
      image.src = data[i].imageUrl;
      figure.append(image);

      let title = document.createElement("figcaption");
      title.textContent = data[i].title;
      figure.append(title);
    }
  })
  .catch((error) => console.error(error));

// créer une fonction pour récupérer les catégories et rajouter la catégorie "tous"

fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    data.unshift({
      id: 0,
      name: "tous",
    });
  })
  .catch((error) => console.error(error));

let figure = document.querySelector("figure");
let image = document.querySelector("img");
let figcaption = document.querySelector("figcaption");

// créer le filtre des projets

const filtres = document.querySelector(".filtres");
filtres.classList.add("filtres");

const tous = document.createElement("div");
tous.textContent = "Tous";
tous.classList.add("filtre");
filtres.append(tous);

const objets = document.createElement("div");
objets.textContent = "Objets";
objets.classList.add("filtre");
filtres.append(objets);

const appartements = document.createElement("div");
appartements.textContent = "Appartements";
appartements.classList.add("filtre");
filtres.append(appartements);

const hotels = document.createElement("div");
hotels.textContent = "Hôtels & Restaurants";
hotels.classList.add("filtre");
filtres.append(hotels);

// faire fonctionner le filtre

objets.addEventListener("click", () => {
  let figure = document.querySelectorAll('[data-catid="2"], [data-catid="3"]');
  figure.forEach((element) => element.remove());
});

appartements.addEventListener("click", () => {
  let figure = document.querySelectorAll('[data-catid="1"], [data-catid="3"]');
  figure.forEach((element) => element.remove());
});

hotels.addEventListener("click", () => {
  let figure = document.querySelectorAll('[data-catid="1"], [data-catid="2"]');
  figure.forEach((element) => element.remove());
});

tous.addEventListener("click", () => {
  let figure = document.querySelectorAll('[data-catid="0"]');
});

// authentification de l'utilisateur
//créer une fonction pour envoyer les paramètres de connexion

function sendLoginData(email, password) {
  const data = { email, password };
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Un problème est survenu");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Login successful:", data);
    })
    .catch((error) => {
      console.error(`Il y a eu un problème avec l'envoi des données:`, error);
    });
}
// arrivé ici //

// Récupération du formulaire
const form = document.querySelector("#formLogin");

// Event Listener pour la soumission du formulaire
form.addEventListener("submit", function (event) {
  // Empêcher la soumission du formulaire
  event.preventDefault();

  // Récupération des données du formulaire
  const formData = new FormData(form);

  // Envoi de la requête avec fetch()

  fetch("login.php", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.text())
    .then((result) => {
      // Traitement de la réponse du serveur
      console.log(result);
    })
    .catch((error) => {
      // Gestion des erreurs
      console.error(error);
    });
});
