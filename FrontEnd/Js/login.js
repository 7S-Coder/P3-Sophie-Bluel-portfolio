const urlLogin = "http://localhost:5678/api/users/login";
const main = document.querySelector("main");
const titlePortfolio = document.querySelector("#portfolio h2");
const ulNav = document.querySelector("header nav ul");
const loginDiv = document.createElement("div");
const editDiv = document.querySelector("#editDiv");
const introFigure = document.querySelector("#introduction > figure");
const articleFigure = document.querySelector("#introduction article");
let categoryNames = [];

let message = document.createElement("span");
message.style.fontSize = "24px";
message.style.paddingBottom = "1px";
message.style.marginTop = "2px";

const login = ulNav.children[2];
login.style.cursor = "pointer";
login.innerText = localStorage.getItem("token") ? "Logout" : "Login";
if (localStorage.getItem("token")) {
  editDiv.style.visibility = "visible";
  const iconEditLink0 = document.createElement("i");
  editIcon(iconEditLink0);
  editButton.prepend(iconEditLink0);

  const iconEditLink = document.createElement("i");
  editIcon(iconEditLink);

  const iconEditLink2 = document.createElement("i");
  editIcon(iconEditLink2);

  const editLink = document.createElement("a");
  editLink.innerText = "Modifier";
  editLink.style.marginLeft = "56px";

  const editLink2 = document.createElement("a");
  editLink2.innerText = "Modifier";
  editLink2.style.position = "relative";
  editLink2.style.top = "-20px";

  const editLink3 = document.createElement("a");
  editLink3.innerText = "Modifier";
  editLink3.classList.add("editLink3");
  editLink3.style.fontSize = "14px";
  editLink3.style.fontFamily = "Work Sans";
  editLink3.style.fontWeight = "normal";
  editLink3.style.position = "relative";
  editLink3.style.bottom = "4px";

  editLink3.addEventListener("click", function (e) {
    e.preventDefault();
    openModal();
    getAllPostsByCategory("Tous");
    createModalPosts(data);

    editLink3.disabled = true;
  });

  const iconEditLink3 = document.createElement("i");
  editIcon(iconEditLink3);
  iconEditLink3.style.marginLeft = "31px";

  introFigure.append(editLink);
  editLink.prepend(iconEditLink);
  articleFigure.prepend(editLink2);
  editLink2.prepend(iconEditLink2);
  titlePortfolio.append(editLink3);
  editLink3.prepend(iconEditLink3);
}

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
formLogin.id = "login";
formLogin.name = "login";
formLogin.method = "POST";

const labelEmail = document.createElement("label");
labelEmail.innerText = "Email";
labelEmail.style.display = "block";
labelEmail.style.fontFamily = "Work Sans";
labelEmail.style.marginBottom = "7px";

const inputEmail = document.createElement("input");
inputEmail.style.width = "379px";
inputEmail.style.height = "51px";
inputEmail.style.marginBottom = "30px";
inputEmail.type = "email";
InputCSS(inputEmail);

const labelPassword = document.createElement("label");
labelPassword.innerText = "Mot de passe";
labelPassword.style.display = "block";
labelPassword.style.marginBottom = "7px";

const inputPassword = document.createElement("input");
inputPassword.style.width = "379px";
inputPassword.style.height = "51px";
inputPassword.type = "password";
InputCSS(inputPassword);

const buttonBox = document.createElement("div");
buttonBox.style.display = "flex";
buttonBox.style.justifyContent = "center";

const buttonLogin = document.createElement("button");
buttonLogin.innerText = "Se connecter";
buttonLogin.type = "submit";
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
linkSpan.style.justifyContent = "center";
linkSpan.style.color = "black";
linkSpan.href = "";
linkSpan.style.marginTop = "28px";

const spanLogin = document.createElement("span");
spanLogin.textContent = "Mot de passe oublié ?";

function isLogging() {
  // Je vérifie si le token est dans le localstorage avec un booléan en réponse
  return localStorage.getItem("token") ? true : false;
}

function logout() {
  // Supprime le local storage et recharge la page pour afficher le bouton de connexion
  localStorage.clear();
  window.location.reload();
  editDiv.style.visibility = "hidden";
}

function InputCSS(constElement) {
  constElement.style.boxShadow = "0px 4px 14px rgba(0, 0, 0, 0.09)";
  constElement.style.border = "1px solid rgba(255, 255, 255, 1)";
}

function editIcon(constElement) {
  constElement.classList.add("fa-solid");
  constElement.classList.add("fa-pen-to-square");
  constElement.classList.add("fa-lg");
}

function createEditDiv() {
  document.body.style.paddingTop = "21px";
  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");
  editDiv.style.position = "absolute";
  editDiv.style.top = "0";
  editDiv.style.left = "0";
  editDiv.style.display = "flex";
  editDiv.style.justifyContent = "center";
  editDiv.style.alignItems = "center";
  editDiv.style.width = "100%";
  editDiv.style.height = "59px";
  editDiv.style.backgroundColor = "black";

  const editButton = document.createElement("button");
  editButton.innerText = "Mode édition";
  editButton.style.backgroundColor = "black";
  editButton.style.color = "white";
  editButton.style.border = "none";
  editButton.style.marginRight = "21px";
  editButton.style.fontFamily = "Work Sans";

  const publishButton = document.createElement("button");
  publishButton.innerText = "Publier les changements";
  publishButton.style.height = "38px";
  publishButton.style.width = "216px";
  publishButton.style.borderRadius = "60px";
  publishButton.style.backgroundColor = "white";
  publishButton.style.color = "black";
  publishButton.style.fontFamily = "Work Sans";

  const iconEditLink0 = document.createElement("i");
  editIcon(iconEditLink0);

  document.body.prepend(editDiv);
  editDiv.append(editButton);
  editButton.prepend(iconEditLink0);
  editDiv.append(publishButton);

  const introFigure = document.querySelector("#introduction > figure");
  const articleFigure = document.querySelector("#introduction article");

  const iconEditLink = document.createElement("i");
  editIcon(iconEditLink);

  const iconEditLink2 = document.createElement("i");
  editIcon(iconEditLink2);

  const editLink = document.createElement("a");
  editLink.innerText = "Modifier";
  editLink.style.marginLeft = "56px";

  const editLink2 = document.createElement("a");
  editLink2.innerText = "Modifier";
  editLink2.style.position = "relative";
  editLink2.style.top = "-20px";

  introFigure.append(editLink);
  editLink.prepend(iconEditLink);
  articleFigure.prepend(editLink2);
  editLink2.prepend(iconEditLink2);
}

function createModalPosts(data) {
  for (let i = 0; i < data.length; i++) {
    const posts = data[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    const divModal = document.querySelector("#modal div");
    divModal.style.display = "flex";
    divModal.style.flexWrap = "wrap";
    divModal.style.width = "80%";
    divModal.style.marginLeft = "12%";
    divModal.style.borderBottom = "1px solid #B3B3B3";
    divModal.style.paddingBottom = "47px";

    // Création d’une balise dédiée à un post
    const postModal = document.createElement("figure");
    postModal.style.display = "flex";
    postModal.style.flexDirection = "column";
    postModal.style.marginRight = "6px";
    postModal.style.marginBottom = "11px";

    // Création des balises
    const imageModal = document.createElement("img");
    imageModal.src = posts.imageUrl;
    imageModal.style.width = "6vw";
    imageModal.addEventListener("mouseover", function (e) {
      divBtn.style.visibility = "visible";
    });
    imageModal.addEventListener("mouseleave", function (e) {
      divBtn.style.visibility = "hidden";
    });

    const EditLinkModal = document.createElement("a");
    EditLinkModal.innerText = "éditer";

    const divBtn = document.createElement("div");
    divBtn.style.position = "relative";
    divBtn.style.bottom = "165px";
    divBtn.style.left = "71px";
    divBtn.style.visibility = "hidden";

    const growingImage = document.createElement("button");
    growingImage.title = "Grossir l'image.";
    growingImage.style.width = "20px";
    growingImage.style.height = "20px";
    growingImage.style.backgroundColor = "black";
    growingImage.style.color = "white";
    growingImage.style.border = "none";
    growingImage.style.marginRight = "2px";
    growingImage.classList.add("fa-sharp");
    growingImage.classList.add("fa-solid");
    growingImage.classList.add("fa-arrows-up-down-left-right");
    growingImage.classList.add("fa-xs");

    const deleteImg = document.createElement("button");
    deleteImg.title = "Supprimer l'image.";
    deleteImg.style.width = "20px";
    deleteImg.style.height = "20px";
    deleteImg.style.backgroundColor = "black";
    deleteImg.style.color = "white";
    deleteImg.style.border = "none";
    deleteImg.classList.add("fa-sharp");
    deleteImg.classList.add("fa-solid");
    deleteImg.classList.add("fa-trash");
    deleteImg.classList.add("fa-xs");

    divModal.appendChild(postModal);
    postModal.appendChild(imageModal);
    // imageModal.appendChild(growingImage);
    postModal.appendChild(EditLinkModal);
    postModal.appendChild(divBtn);
    divBtn.appendChild(growingImage);
    divBtn.appendChild(deleteImg);
  }
}

login.addEventListener("click", () => {
  main.innerHTML = "";

  main.append(loginDiv);
  loginDiv.append(loginTitle);
  loginDiv.append(formLogin);
  formLogin.append(labelEmail);
  formLogin.append(inputEmail);
  formLogin.append(labelPassword);
  formLogin.append(inputPassword);
  formLogin.append(buttonBox);
  buttonBox.append(buttonLogin);
  loginDiv.append(linkSpan);
  linkSpan.append(spanLogin);
  formLogin.prepend(message);

  buttonLogin.addEventListener("click", (e) => {
    e.preventDefault();

    fetch(urlLogin, {
      method: "POST",
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((apiData) => {
        message.style.color = "#1d6154";
        message.textContent = `Bonjour ${inputEmail.value}`;
        localStorage.setItem("userId", apiData.userId);
        localStorage.setItem("token", apiData.token);
        document.location.href = "index.html";
        login.innerText = "Logout";
      })
      .catch((error) => {
        console.error("Error:", error);
        message.style.color = "red";
        message.textContent = "L'identifiant ou le mot de passe est incorrect";
      });
  });
  if (login.innerText === "Logout") {
    logout();
  }
});
