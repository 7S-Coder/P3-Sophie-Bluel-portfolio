// Url pour appeler tout les posts
const urlPosts = "http://localhost:5678/api/works";
// Url pour appeler les catégories
const urlCategories = "http://localhost:5678/api/categories";

const portfolio = document.querySelector("#portfolio");

// Définition de la classe "btnDiv"
const btnDiv = document.createElement("div");
btnDiv.classList.add("btnDiv");

btnDiv.addEventListener("click", function () {
  console.log(this.button);
});

// Afficher les posts avec la catégorie tous par défault
getAllPostsByCategory();

// LES FONCTIONS
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

function createPosts(data) {
  for (let i = 0; i < data.length; i++) {
    const posts = data[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    const gallery = document.querySelector(".gallery");
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

//FILTRER les posts par leur catégories
async function getAllPostsByCategory(category) {
  gallery.innerHTML = "";
  if (category === "") {
    category = "Tous";
  }

  try {
    const response = await fetch(urlPosts);
    const apiData = await response.json();
    const filteredPosts = apiData.filter((post) => post.category === category);
    console.log(filteredPosts);
    return filteredPosts;
  } catch (error) {
    console.error(error);
  }

  return (data = apiData);
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

      // Ajout du bouton dans la div "btnDiv"
      btnDiv.appendChild(buttonElement);
    }

    // Ajout de la div "btnDiv" dans le DOM, dans la section #portfolio
    portfolio.prepend(btnDiv);
  });

const allButtonElement = document.createElement("button");
allButtonElement.innerText = "Tous";
btnDiv.appendChild(allButtonElement);

// getAllPostsByCategory().then((data) => createPosts(data));

init();
