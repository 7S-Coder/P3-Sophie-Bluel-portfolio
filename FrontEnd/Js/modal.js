const deleteBtn = document.querySelector("#deleteAll");
const token = localStorage.getItem("token");
const divModal = document.querySelector("#modal div");
const editButton = document.querySelector("#editButton");
const modal = document.getElementById("modal");
const deleteAllButton = document.querySelector("#deleteAll");
let allPosts = [];
let postModal;

editButton.addEventListener("click", function (e) {
  e.preventDefault();
  openModal();
  getAllPostsByCategory("Tous");
  createModalPosts(data);

  editButton.disabled = true;
});

function openModal() {
  document.getElementById("modal-overlay").style.display = "block";
  document.getElementById("modal").style.display = "block";
  document.body.style.overflow = "hidden";
  editButton.style.cursor = "default";
}

function closeModal() {
  document.getElementById("modal-overlay").style.display = "none";
  document.getElementById("modal").style.display = "none";
  document.getElementById("modal2").style.display = "none";
  document.body.style.overflow = "auto";
  editButton.disabled = false;
  editButton.style.cursor = "pointer";
  data = "";
  window.location.reload();
}

function openLastModal() {
  modal.style.display = "none";
  document.getElementById("modal-overlay").style.display = "block";
  document.getElementById("modal2").style.display = "block";
  document.body.style.overflow = "hidden";
  editButton.style.cursor = "default";
}

function createModalPosts(data) {
  for (let i = 0; i < data.length; i++) {
    let posts = data[i];
    // Récupération de l'élément du DOM qui accueillera les figures
    const divModal = document.querySelector("#modal div");

    divModal.style.position = "relative";
    divModal.style.transform = "translate(-50%, -50%)";
    divModal.style.top = "39%";
    divModal.style.left = "52%";
    divModal.style.display = "flex";
    divModal.style.flexWrap = "wrap";
    divModal.style.width = "23vw";
    divModal.style.borderBottom = "1px solid #B3B3B3";
    divModal.style.paddingBottom = "47px";
    divModal.style.height = "61%";
    divModal.style.overflowY = "hidden";
    divModal.style.overflowX = "hidden";

    // Création d’une balise dédiée à un post
    postModal = document.createElement("figure");
    postModal.style.display = "flex";
    postModal.style.flexDirection = "column";
    postModal.style.marginRight = "6px";
    postModal.style.marginBottom = "11px";
    postModal.classList.add(posts.id);

    // Création des balises
    const imageModal = document.createElement("img");
    imageModal.src = posts.imageUrl;
    imageModal.style.width = "78px";
    imageModal.style.height = "105px";
    imageModal.addEventListener("mouseover", function (e) {
      divBtn.style.visibility = "visible";
    });

    imageModal.addEventListener("mouseout", function (e) {
      setTimeout(function () {
        divBtn.style.visibility = "hidden";
      }, 400);
    });

    const EditLinkModal = document.createElement("a");
    EditLinkModal.innerText = "éditer";

    const divBtn = document.createElement("div");
    divBtn.style.position = "relative";
    divBtn.style.bottom = "84%";
    divBtn.style.left = "44%";
    divBtn.style.display = "flex";
    divBtn.style.justifyContent = "space-between";

    divBtn.style.visibility = "hidden";
    divBtn.style.width = "42px";
    divBtn.style.height = "19px";

    const growingImage = document.createElement("button");
    growingImage.title = "Grossir l'image.";
    growingImage.style.display = "flex";
    growingImage.style.justifyContent = "center";
    growingImage.style.alignItems = "center";
    growingImage.style.width = "19px";
    growingImage.style.height = "100%";
    growingImage.style.backgroundColor = "black";
    growingImage.style.color = "white";
    growingImage.style.border = "none";
    growingImage.style.marginRight = "2px";
    growingImage.style.cursor = "pointer";
    growingImage.classList.add("fa-sharp");
    growingImage.classList.add("fa-solid");
    growingImage.classList.add("fa-arrows-up-down-left-right");
    growingImage.classList.add("fa-xs");

    const deleteImg = document.createElement("button");
    deleteImg.title = "Supprimer l'image.";
    deleteImg.style.width = "19px";
    deleteImg.style.height = "100%";
    deleteImg.style.backgroundColor = "black";
    deleteImg.style.color = "white";
    deleteImg.style.border = "none";
    deleteImg.style.cursor = "pointer";

    deleteImg.classList.add("fa-sharp");
    deleteImg.classList.add("fa-solid");
    deleteImg.classList.add("fa-trash");
    deleteImg.classList.add("fa-xs");
    deleteImg.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const postFigure = e.target.closest("figure");

      const postId = postFigure.classList[0];
      if (token) {
        fetch(`${urlPosts}/${postId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
          .then((response) => {
            if (response.ok) {
              console.log(`La photo est supprimée.`);
            } else {
              console.error(
                `Erreur lors de la suppression : ${response.status}`
              );
            }
          })
          .catch((error) => {
            console.error(`Erreur lors de la suppression : ${error}`);
          });
      }
    });

    deleteAllButton.addEventListener("click", () => {
      const postFigures = document.querySelectorAll("figure");

      if (token) {
        postFigures.forEach((postFigure) => {
          const postId = postFigure.classList[0];
          fetch(`${urlPosts}/${postId}`, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          })
            .then((response) => {
              if (response.ok) {
                console.log(`Toutes les photos ont été supprimées.`);
              } else {
                console.error(
                  `Erreur lors de la suppression : ${response.status}`
                );
              }
            })
            .catch((error) => {
              console.error(`Erreur lors de la suppression : ${error}`);
            });
        });
      }
    });

    divModal.appendChild(postModal);
    postModal.appendChild(imageModal);
    postModal.appendChild(EditLinkModal);
    postModal.appendChild(divBtn);
    divBtn.appendChild(growingImage);
    divBtn.appendChild(deleteImg);
  }
}

/////////////////// modal 2 ////////////////////
const modal2 = document.querySelector("#modal2");
const initDivPhoto = document.createElement("div");
initDivPhoto.classList.add("initDivPhoto");
const inputUnderBtn = document.createElement("input");
const inputTitle = document.createElement("input");
const selectCategory = document.createElement("select");
let selectedOption;
// selectedOption.value = 1;
let file;
const addPicturesButton = document.querySelector("#addPicturesBtn");
const addPicturesForm = document.createElement("form");
addPicturesForm.method = "POST";
addPicturesForm.style.display = "flex";
addPicturesForm.style.flexDirection = "column";
addPicturesForm.style.margin = "0 15% 32px 15%";
addPicturesForm.style.paddingBottom = "47px";
addPicturesForm.style.borderBottom = "1px solid rgba(179, 179, 179, 1)";

const h2AddPicturesForm = document.createElement("h2");
h2AddPicturesForm.textContent = "Ajout photo";
h2AddPicturesForm.style.textAlign = "center";
h2AddPicturesForm.style.color = "black";
h2AddPicturesForm.style.marginBottom = "36px";

const backOption = document.createElement("i");
backOption.classList.add("fa-solid");
backOption.classList.add("fa-arrow-left");
backOption.addEventListener("click", function () {
  const modal = document.querySelector("#modal");
  const modal2 = document.querySelector("#modal2");
  modal.style.display = "block";
  modal2.style.display = "none";
  photoDiv.innerHTML = "";
  initDivPhoto.innerHTML = "";
  initDivPhoto.style.display = "block";
  message.textContent = "";
});

const optionDiv = document.createElement("div");
optionDiv.style.display = "flex";
optionDiv.style.justifyContent = "space-between";

const closeOption = document.createElement("i");
closeOption.classList.add("fa-solid");
closeOption.classList.add("fa-xmark");
closeOption.classList.add("fa-lg");
closeOption.style.cursor = "pointer";
closeOption.addEventListener("click", function () {
  closeModal();
});

const photoDiv = document.createElement("div");
photoDiv.style.display = "flex";
photoDiv.style.flexDirection = "column";
photoDiv.style.height = "169px";
photoDiv.style.marginTop = "36px";
photoDiv.style.marginBottom = "30px";
photoDiv.style.backgroundColor = "#E8F1F6";
photoDiv.style.alignItems = "center";
photoDiv.style.fontFamily = "Work Sans";

const labelTitle = document.createElement("label");
labelTitle.innerText = "Titre";
labelTitle.style.marginBottom = "32px";

inputTitle.name = "title";
inputTitle.style.marginTop = "-21px";
inputTitle.style.height = "51px";
inputTitle.style.borderRadius = "10px";
InputCSS(inputTitle);
inputTitle.style.paddingLeft = "16px";

const validBtn = document.createElement("input");
validBtn.innerText = "Valider";
validBtn.setAttribute("disabled", "true");
validBtn.type = "submit";
validBtn.style.position = "relative";
validBtn.style.transform = "translate(-50%, -50%)";
validBtn.style.top = "3%";
validBtn.style.left = "50%";
validBtn.style.color = "rgba(255, 255, 255, 1)";
validBtn.style.backgroundColor = "#A7A7A7";
validBtn.style.height = "36px";
validBtn.style.border = "none";
validBtn.style.marginBottom = "55px";

addPicturesButton.addEventListener("click", () => {
  addPicturesForm.innerHTML = "";
  openModal2();
  addPicturesForm.addEventListener("change", (e) => {
    const inputs = addPicturesForm.querySelectorAll("input");
    let isFormComplete = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        isFormComplete = false;
      }
    });
    if (isFormComplete) {
      e.preventDefault();
      validBtn.classList.add("succes");
      validBtn.removeAttribute("disabled");
      validBtn.style.backgroundColor = "#1d6154";
      validBtn.style.color = "white";
      validBtn.style.cursor = "pointer";
    }
  });

  validBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", inputTitle.value);
    formData.append("image", file);
    formData.append("category", selectedOption.value);

    fetch(urlPosts, {
      method: "POST",
      body: formData,

      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    })
      .then((response) => {
        if (response.ok) {
          console.log("Image ajouté avec succès");
        } else {
          console.error(
            "Une erreur s'est produite lors de l'upload de l'image."
          );
        }
      })
      .catch((error) => {
        console.error(
          "Une erreur s'est produite lors de l'upload de l'image." + error
        );
      });
  });
});

function openModal2() {
  modal2.appendChild(addPicturesForm);
  addPicturesForm.appendChild(h2AddPicturesForm);
  //Insertion de la div option
  modal2.prepend(optionDiv);
  optionDiv.appendChild(backOption);
  optionDiv.appendChild(closeOption);
  //Insertion de la div photo
  addPicturesForm.appendChild(photoDiv);
  displayInitDivPhoto();
  addPicturesForm.appendChild(message);
  // insertion du champs catégorie
  displayCategoriesForSelect();
  //Insertion du champ titre
  addPicturesForm.appendChild(labelTitle);
  addPicturesForm.appendChild(inputTitle);
  //Insertion du boutton validé
  modal2.appendChild(validBtn);
}

function displayInitDivPhoto() {
  initDivPhoto.style.textAlign = "center";

  const imgIcone = document.createElement("i");
  imgIcone.classList.add("fa-sharp");
  imgIcone.classList.add("fa-regular");
  imgIcone.classList.add("fa-image");
  imgIcone.classList.add("fa-2xl");
  imgIcone.style.color = "#b9c5cc";
  imgIcone.style.marginTop = "50px";
  imgIcone.style.marginBottom = "20px";

  const inputUnderBtn = document.createElement("input");
  inputUnderBtn.accept = "image/jpeg, image/png";
  inputUnderBtn.style.display = "none";
  inputUnderBtn.type = "file";
  inputUnderBtn.id = "file";
  inputUnderBtn.name = "imageUrl";
  inputUnderBtn.addEventListener("change", previewFile);

  const addPhotoLabel = document.createElement("label");
  addPhotoLabel.name = "imageUrl";
  addPhotoLabel.setAttribute("for", "file");
  addPhotoLabel.innerText = "+ Ajouter photo";
  addPhotoLabel.style.display = "flex";
  addPhotoLabel.style.alignItems = "center";
  addPhotoLabel.style.justifyContent = "center";
  addPhotoLabel.style.height = "36px";
  addPhotoLabel.style.width = "173px";
  addPhotoLabel.style.marginBottom = "6px";
  addPhotoLabel.style.backgroundColor = "#CBD6DC";
  addPhotoLabel.style.borderRadius = "50px";
  addPhotoLabel.style.border = "none";
  addPhotoLabel.style.color = "#306685";
  addPhotoLabel.style.cursor = "pointer";

  const labelPhoto = document.createElement("label");
  labelPhoto.innerText = "jpg, png. 4mo max";
  labelPhoto.style.fontSize = "10px";
  labelPhoto.style.marginTop = "4px";

  photoDiv.appendChild(initDivPhoto);
  initDivPhoto.appendChild(imgIcone);
  initDivPhoto.appendChild(addPhotoLabel);
  initDivPhoto.appendChild(inputUnderBtn);
  initDivPhoto.appendChild(labelPhoto);

  return initDivPhoto, inputUnderBtn;
}

async function displayCategoriesForSelect() {
  const selectCategory = await fetchCategoriesForSelect();
  selectCategory.name = "categoryId";
  selectCategory.style.width = "100%";
  selectCategory.style.width = "100%";
  selectCategory.style.marginTop = "12px";
  selectCategory.style.height = "51px";
  selectCategory.style.borderRadius = "10px";
  InputCSS(selectCategory);
  selectCategory.style.paddingLeft = "16px";

  const labelCategory = document.createElement("label");
  labelCategory.setAttribute("for", "categoryId");
  labelCategory.innerText = "Catégorie";
  labelCategory.style.marginTop = "10px";
  labelCategory.appendChild(selectCategory);

  addPicturesForm.appendChild(labelCategory);
}

async function fetchCategoriesForSelect() {
  const response = await fetch(urlCategories);
  const apiData = await response.json();

  const selectCategory = document.createElement("select");

  for (let i = 0; i < apiData.length; i++) {
    const categorie = apiData[i];
    const optionSelect = document.createElement("option");
    optionSelect.innerText = categorie.name;
    optionSelect.value = categorie.id;
    selectCategory.appendChild(optionSelect);
  }

  selectedOption = selectCategory.options[0];

  selectCategory.addEventListener("change", function () {
    selectedOption = selectCategory.options[selectCategory.selectedIndex];
    console.log(selectedOption);
    console.log(selectedOption.value);
  });

  return selectCategory;
}

function displayImage(e) {
  const imageModal = document.querySelector("form > div");
  const image = document.createElement("img");

  const deleteButton = document.createElement("button");
  deleteButton.innerHTML = `\u{1F5D1}`;
  deleteButton.title = "Supprimer cette image";
  deleteButton.classList.add("deleteButtonPF");

  image.src = e.target.result;
  image.style.height = "169px";

  initDivPhoto.style.display = "none";
  imageModal.appendChild(image);
  imageModal.appendChild(deleteButton);

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    imageModal.innerHTML = "";
    initDivPhoto.style.display = "block";

    photoDiv.appendChild(initDivPhoto);
  });
}

function previewFile() {
  const fileExtensionRegex = /\.(jp?g|png)$/i;

  message.style.color = "red";

  if (this.files.length === 0 || !fileExtensionRegex.test(this.files[0].name)) {
    console.error("Le fichier doit être une image de type JPG ou PNG.");
    message.textContent = "Le fichier doit être une image de type JPG ou PNG.";

    return;
  }

  file = this.files[0];
  const fileSize = file.size;
  const maxSize = 4 * 1024 * 1024;

  if (fileSize > maxSize) {
    console.error("Le fichier est trop volumineux (maximum 4 Mo)");
    console.log("Taille du fichier : " + fileSize + " octets");
    message.textContent = "Le fichier est trop volumineux (maximum 4 Mo)";

    return;
  }

  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", (e) => {
    displayImage(e, file);
  });
}
