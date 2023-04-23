const urlLogin = "http://localhost:5678/api/users/login";

const main = document.querySelector("main");

const ulNav = document.querySelector("header nav ul");

const loginDiv = document.createElement("div");

let message = document.createElement("span");
message.style.fontSize = "24px";
message.style.paddingBottom = "5px";

const login = ulNav.children[2];
login.innerText = localStorage.getItem("token") ? "Logout" : "Login";

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

const labelPassword = document.createElement("label");
labelPassword.innerText = "Mot de passe";
labelPassword.style.display = "block";
labelPassword.style.marginBottom = "7px";

const inputPassword = document.createElement("input");
inputPassword.style.width = "379px";
inputPassword.style.height = "51px";
inputPassword.type = "password";

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

if (localStorage.getItem("token")) {
  const editDiv = document.createElement("div");
  editDiv.classList.add("editDiv");
  editDiv.style.display = "flex";
  editDiv.style.justifyContent = "center";
  editDiv.style.alignItems = "center";
  editDiv.style.width = "100%";
  editDiv.style.height = "59px";
  editDiv.style.backgroundColor = "black";

  const editButton = document.createElement("a");
  editButton.innerText = "Mode édition";
  editButton.style.color = "white";
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
  iconEditLink0.classList.add("fa-sharp");
  iconEditLink0.classList.add("fa-light");
  iconEditLink0.classList.add("fa-pen-to-square");

  document.body.prepend(editDiv);
  editDiv.append(editButton);
  editButton.prepend(iconEditLink0);
  editDiv.append(publishButton);

  const introFigure = document.querySelector("#introduction > figure");
  const articleFigure = document.querySelector("#introduction article");

  const iconEditLink = document.createElement("i");
  iconEditLink.classList.add("fa-sharp");
  iconEditLink.classList.add("fa-light");
  iconEditLink.classList.add("fa-pen-to-square");

  const iconEditLink2 = document.createElement("i");
  iconEditLink2.classList.add("fa-sharp");
  iconEditLink2.classList.add("fa-light");
  iconEditLink2.classList.add("fa-pen-to-square");

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

  const buttonCloseModal = document.querySelector("#modal button");
  buttonCloseModal.style.backgroundColor = "white";
  buttonCloseModal.style.border = "0px";

  const h2Modal = document.querySelector("#modal h2");
  h2Modal.style.color = "black";
  h2Modal.style.marginTop = "60px";
  h2Modal.style.marginBottom = "41px";
  h2Modal.style.textAlign = "center";
  h2Modal.style.fontFamily = "Work Sans";
  h2Modal.style.fontSize = "26px";

  function openModal() {
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    document.getElementById("modal-overlay").style.display = "none";
    document.getElementById("modal").style.display = "none";
    document.body.style.overflow = "auto";
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
      const EditLinkModal = document.createElement("a");
      EditLinkModal.innerText = "éditer";

      // const growingImage = document.createElement("div");
      // growingImage.style.width = "17px";
      // growingImage.style.height = "17px";
      // growingImage.style.backgroundColor = "black";

      divModal.appendChild(postModal);
      postModal.appendChild(imageModal);
      // imageModal.appendChild(growingImage);
      postModal.appendChild(EditLinkModal);
    }
  }

  editButton.onclick = function (e) {
    e.preventDefault();
    openModal();
    getAllPostsByCategory("Tous");
    createModalPosts(data);

    editButton.onclick = function (e) {
      e.preventDefault();
    };
  };

  const addPicturesButton = document.querySelector("#addPicturesBtn");
  addPicturesButton.addEventListener("click", () => {
    const modal = document.querySelector("#modal");
    modal.innerHTML = "";

    const addPicturesForm = document.createElement("form");
    addPicturesForm.style.display = "flex";
    addPicturesForm.style.flexDirection = "column";
    addPicturesForm.style.margin = "0 15% 0 15%";

    const h2AddPicturesForm = document.createElement("h2");
    h2AddPicturesForm.textContent = "Ajout photo";
    h2AddPicturesForm.style.textAlign = "center";
    h2AddPicturesForm.style.color = "black";

    const divPhoto = document.createElement("div");
    divPhoto.style.display = "flex";
    divPhoto.style.flexDirection = "column";
    divPhoto.style.height = "169px";
    divPhoto.style.backgroundColor = "#E8F1F6";
    divPhoto.style.alignItems = "center";
    divPhoto.style.fontFamily = "Work Sans";

    const addPhotoBtn = document.createElement("button");
    addPhotoBtn.innerText = "Ajouter photo";
    addPhotoBtn.style.height = "36px";
    addPhotoBtn.style.width = "173px";
    addPhotoBtn.style.backgroundColor = "#CBD6DC";
    addPhotoBtn.style.borderRadius = "50px";
    addPhotoBtn.style.border = "none";

    const labelPhoto = document.createElement("label");
    labelPhoto.innerText = "jpg, png. 4mo max";
    labelPhoto.style.fontSize = "10px";

    addPicturesForm.appendChild(h2AddPicturesForm);
    addPicturesForm.appendChild(divPhoto);
    divPhoto.appendChild(addPhotoBtn);
    divPhoto.appendChild(labelPhoto);
    modal.appendChild(addPicturesForm);
  });
}
