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
  linkSpan.style.justifyContent = "center";
  linkSpan.style.color = "black";
  linkSpan.href = "";
  linkSpan.style.marginTop = "28px";

  const spanLogin = document.createElement("span");
  spanLogin.textContent = "Mot de passe oublié ?";

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

/* buttonLogin.addEventListener("click", function () {
    if (inputLogin1.value === "random" && inputLogin2.value === "random")
}); */
