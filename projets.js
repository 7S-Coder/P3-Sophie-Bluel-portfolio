/* const myInit = {
  method: "GET",
  email: "sophie.bluel@test.tld",
  password: "S0phie ",
}; */

fetch("http://localhost:5678/api-docs/")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// fetch("http://localhost:5678/api-docs/");

const portfolio = document.querySelector("#portfolio");
