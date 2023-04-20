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
  editDiv.style.marginLeft = "0";
  editDiv.style.marginRight = "0";
  editDiv.style.height = "59px";
  editDiv.style.backgroundColor = "black";

  document.body.prepend(editDiv);
}
