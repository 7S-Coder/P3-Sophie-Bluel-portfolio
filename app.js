console.log("hello world");
// url pour appeler tout les posts
const urlPosts = "http://localhost:5678/api/works";
console.log(urlPosts);

const portfolio = document.querySelector("#portfolio");

const figure = document.querySelector("figure");

//Fetch les données et les stocker dans une variable
let data;

fetch(urlPosts)
  .then((response) => response.json())
  .then((apiData) => {
    data = apiData;
  })
  .catch((error) => {
    console.error(error);
  });

console.log(data);
