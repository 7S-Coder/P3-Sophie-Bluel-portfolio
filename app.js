console.log("hello world");
// url pour appeler tout les posts
const urlPosts = "http://localhost:5678/api/works";
console.log(urlPosts);

//création de l'architecture d'un post

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
      imageElement.src = data[i].imageUrl;
      const descElement = document.createElement("figcaption");
      descElement.innerText = data[i].title;

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

console.log(data);

// const postArchitecture = `<figure> <img src="${data[0].imageUrl} ">   </img> </figure>`;
//Créer un post (figure) avec les données

// post.innerHTML = postArchitecture;
//Incorporer des posts dans le html

console.log("hello");
