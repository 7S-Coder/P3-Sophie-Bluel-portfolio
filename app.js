console.log("hello world");
// url pour appeler tout les posts
const urlPosts = "http://localhost:5678/api/works";

const urlCategories = "http://localhost:5678/api/categories";

// création d'une div qui va contenir les bouttons

// GET //
//Fetch les données et les stocker dans une variable

fetch(urlPosts)
  .then((response) => response.json())
  .then((apiData) => {
    data = apiData;
    for (let i = 0; i < data.length; i++) {
      const post = data[i];
      // Récupération de l'élément du DOM qui accueillera les figures
      const gallery = document.querySelector(".gallery");
      // Création d’une balise dédiée à un post
      const postElement = document.createElement("figure");
      // Création des balises
      const imageElement = document.createElement("img");
      imageElement.src = post.imageUrl;
      const descElement = document.createElement("figcaption");
      descElement.innerText = post.title;

      // On rattache la balise figure a la section Fiches
      gallery.appendChild(postElement);
      // On rattache l’image à pieceElement (la balise article)
      postElement.appendChild(imageElement);
      postElement.appendChild(descElement);
    }
  })
  .catch((error) => {
    console.error(error);
  });

//Mise en place des boutons
const portfolio = document.querySelector("#portfolio");

// Définition de la classe "btnDiv"
const btnDiv = document.createElement("div");
btnDiv.classList.add("btnDiv");

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

//Rendre les boutons dynamique :
// le bouton Tous doit afficher TOUT les posts
allButtonElement.addEventListener("click", function () {
  const gallery = document.querySelector(".gallery");
  gallery.innerHTML = "";
  console.log("click");

  fetch(urlPosts)
    .then((response) => response.json())
    .then((apiData) => {
      data = apiData;
      for (let i = 0; i < data.length; i++) {
        const post = data[i];
        // Récupération de l'élément du DOM qui accueillera les figures
        const gallery = document.querySelector(".gallery");
        // Création d’une balise dédiée à un post
        const postElement = document.createElement("figure");
        // Création des balises
        const imageElement = document.createElement("img");
        imageElement.src = post.imageUrl;
        const descElement = document.createElement("figcaption");
        descElement.innerText = post.title;

        // On rattache la balise figure a la section Fiches
        gallery.appendChild(postElement);
        // On rattache l’image à pieceElement (la balise article)
        postElement.appendChild(imageElement);
        postElement.appendChild(descElement);
      }
    })
    .catch((error) => {
      console.error(error);
    });
});
