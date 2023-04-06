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

let data = [];
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

init();

allButtonElement.addEventListener("click", function () {
  //supprimer les posts de la gallery
  gallery.innerHTML = "";
  // fetch les données
  getPosts();
  // affiche les dans la page
  createPosts(data);
  console.log("Je fonctionne");
});

//selection du deuxième boutton dans les filtres, Objet

//page login
const main = document.querySelector("main");

const ulNav = document.querySelector("header nav ul");
const login = ulNav.children[2];

login.addEventListener("click", function () {
  main.innerHTML = "";

  const loginDiv = document.createElement("div");

  loginDiv.style.width = "379px";
  loginDiv.style.height = "78vh";
  loginDiv.style.marginLeft = "auto";
  loginDiv.style.marginRight = "auto";
  loginDiv.style.textAlign = "left";

  const loginTitle = document.createElement("h2");
  loginTitle.innerText = "Log In";
  loginTitle.style.textAlign = "center";
  loginTitle.style.marginBottom = "37px";

  const formLogin = document.createElement("form");

  const labelLogin1 = document.createElement("label");
  labelLogin1.innerText = "Email";
  labelLogin1.style.display = "block";
  labelLogin1.style.fontFamily = "Work Sans";
  labelLogin1.style.marginBottom = "7px";

  const inputLogin1 = document.createElement("input");
  inputLogin1.style.width = "379px";
  inputLogin1.style.height = "51px";
  inputLogin1.style.marginBottom = "30px";

  const labelLogin2 = document.createElement("label");
  labelLogin2.innerText = "Mot de passe";
  labelLogin2.style.display = "block";
  labelLogin2.style.marginBottom = "7px";

  const inputLogin2 = document.createElement("input");
  inputLogin2.style.width = "379px";
  inputLogin2.style.height = "51px";

  const buttonBox = document.createElement("div");
  buttonBox.style.display = "flex";
  buttonBox.style.justifyContent = "center";

  const buttonLogin = document.createElement("button");
  buttonLogin.innerText = "Se connecter";
  buttonLogin.style.marginTop = "37px";
  buttonLogin.style.backgroundColor = "#1d6154";
  buttonLogin.style.width = "179px";
  buttonLogin.style.height = "36px";
  buttonLogin.style.borderRadius = "60px";
  buttonLogin.style.color = "white";
  buttonLogin.style.fontFamily = "Syne";
  buttonLogin.style.border = "0px";

  const linkSpan = document.createElement("a");
  linkSpan.style.display = "flex";
  linkSpan.style.width = "379px";
  linkSpan.style.justifyContent = "center";
  linkSpan.style.color = "black";
  linkSpan.href = "";

  const spanLogin = document.createElement("span");
  spanLogin.textContent = "Mot de passe oublié ?";
  spanLogin.style.marginTop = "28px";

  main.append(loginDiv);
  loginDiv.append(loginTitle);
  loginDiv.append(formLogin);
  formLogin.append(labelLogin1);
  formLogin.append(inputLogin1);
  formLogin.append(labelLogin2);
  formLogin.append(inputLogin2);
  formLogin.append(buttonBox);
  buttonBox.append(buttonLogin);
  loginDiv.append(linkSpan);
  linkSpan.append(spanLogin);
});
