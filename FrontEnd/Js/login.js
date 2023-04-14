const urlLogin = "http://localhost:5678/api/users/login";

const main = document.querySelector("main");

const ulNav = document.querySelector("header nav ul");
const login = ulNav.children[2];

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

const error = document.createElement("span");
error.style.color = "red";

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
  formLogin.append(error);

  //initialisation des variables du compte

  buttonLogin.addEventListener("click", () => {
    fetch(urlLogin, {
      method: "POST",
      body: JSON.stringify({
        email: inputEmail.value,
        password: inputPassword.value,
      }),
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      mode: "cors",
    })
      .then((response) => response.json())
      .then((apiData) => {
        localStorage.setItem("userId", `${apiData.userId}`);
        localStorage.setItem("token", `${apiData.token}`);
      });
  });
});
