// Url pour appeler tout les posts
const urlPosts = "http://localhost:5678/api/works";
// Url pour appeler les catégories
const urlCategories = "http://localhost:5678/api/categories";

const portfolio = document.querySelector("#portfolio");

let data = [];
// Définition de la classe "btnDiv"
const btnDiv = document.createElement("div");
btnDiv.classList.add("btnDiv");

const gallery = document.querySelector(".gallery");

// LES FONCTIONS

//fonction qui initialise le site
function init() {
  fetch(urlPosts)
    .then((response) => response.json())
    .then((apiData) => {
      data = apiData;
      createPosts(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

//Une fonction qui crée les posts.

function createPosts(data) {
  for (let i = 0; i < data.length; i++) {
    const posts = data[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    document.querySelector(".gallery");
    // Création d’une balise dédiée à un post
    const postElement = document.createElement("figure");
    // Création des balises
    const imageElement = document.createElement("img");
    imageElement.src = posts.imageUrl;
    const descElement = document.createElement("figcaption");
    descElement.innerText = posts.title;

    // On rattache la balise figure a la section Fiches
    gallery.appendChild(postElement);
    // On rattache l’image à pieceElement (la balise article)
    postElement.appendChild(imageElement);
    postElement.appendChild(descElement);
  }
}

//une fonction qui fetch tout les posts
function getPosts() {
  fetch(urlPosts)
    .then((response) => response.json())
    .then((apiData) => {
      data = apiData;
    });
}

//FILTRER les posts par leur catégories
async function getAllPostsByCategory(category = "") {
  const response = await fetch(urlPosts);
  const apiData = await response.json();
  const data = apiData;

  if (category) {
    return data.filter((post) => post.category.name === category);
  } else {
    return data;
  }
}

//Fetch uniquement les catégories

fetch(urlCategories)
  .then((response) => response.json())
  .then((apiData) => {
    data = apiData;
    for (let i = 0; i < data.length; i++) {
      const categorie = data[i];

      //création d'une balise dédiée à un bouton
      const buttonElement = document.createElement("button");
      buttonElement.innerText = categorie.name;
      buttonElement.classList = categorie.name;

      // Ajout du bouton dans la div "btnDiv"
      btnDiv.appendChild(buttonElement);
    }

    // Ajout de la div "btnDiv" dans le DOM, dans la section #portfolio
    portfolio.prepend(btnDiv);

    const objectButton = btnDiv.querySelector(".Objets");

    const appartButton = btnDiv.querySelector(".Appartements");

    const hiltonButton = btnDiv.querySelector(".Hotels");

    objectButton.addEventListener("click", async function () {
      gallery.innerHTML = "";
      const filteredData = await getAllPostsByCategory("Objets");
      createPosts(filteredData);
    });

    appartButton.addEventListener("click", async function () {
      gallery.innerHTML = "";
      const filteredData = await getAllPostsByCategory("Appartements");
      createPosts(filteredData);
    });

    hiltonButton.addEventListener("click", async function () {
      gallery.innerHTML = "";
      const filteredData = await getAllPostsByCategory("Hotels & restaurants");
      createPosts(filteredData);
    });
  });

const allButtonElement = document.createElement("button");
allButtonElement.innerText = "Tous";
btnDiv.appendChild(allButtonElement);

init();

allButtonElement.addEventListener("click", () => {
  //supprimer les posts de la gallery
  gallery.innerHTML = "";
  // fetch les données
  getAllPostsByCategory("Tous");
  // affiche les dans la page
  createPosts(data);
});
