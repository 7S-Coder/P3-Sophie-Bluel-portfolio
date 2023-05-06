const deleteBtn = document.querySelector("#deleteAll");
const token = localStorage.getItem("token");
const divModal = document.querySelector("#modal div");
const editButton = document.querySelector("#editButton");
const modal = document.getElementById("modal");
let allPosts = [];

editButton.addEventListener("click", function (e) {
  e.preventDefault();
  openModal();
  getAllPostsByCategory("Tous");
  createModalPosts(data);

  editButton.disabled = true;
});

function deletePost(token, divModal, allPosts) {
  const postId = postToDelete.id;

  if (token) {
    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer ce post ?"
    );

    if (confirmation) {
      fetch(`https://example.com/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              "Une erreur s'est produite lors de la suppression du post."
            );
          }

          return response.json();
        })
        .then(() => {
          divModal.innerHTML = "";
          divModal.getAllPostsByCategory("Tous");
        })
        .catch((error) => console.error(error));
    }
  } else {
    console.log("Vous n'êtes pas autorisé à effectuer cette action.");
  }
}

function deleteAllPosts(token, divModal) {
  console.log(allPosts);
  if (token) {
    const confirmation = confirm(
      "Êtes-vous sûr de vouloir supprimer tous les posts ?"
    );

    if (confirmation) {
      fetch("https://example.com/posts", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((posts) => {
          for (let i = 0; i < posts.length; i++) {
            fetch(`https://example.com/posts/${posts[i].id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
          }

          divModal.innerHTML = "";
          createModalPosts(data);
        })
        .catch((error) => console.error(error));
    }
  } else {
    const error = document.createElement("p");
    error.textContent = "Vous n'avez pas les droits pour supprimer les posts.";
    divModal.appendChild(error);
  }
}

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
      growingImage.style.visibility = "visible";
      deleteImg.style.visibility = "visible";
    });
    imageModal.addEventListener("mouseleave", function (e) {
      growingImage.style.visibility = "hidden";
      deleteImg.style.visibility = "hidden";
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
    deleteImg.addEventListener("click", () => {
      deletePost(token, divModal, allPosts);
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
const inputUnderBtn = document.createElement("input");
const inputTitle = document.createElement("input");
const selectCategory = document.createElement("select");
let selectedOption = 1;
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

const backOption = document.createElement("i");
backOption.classList.add("fa-solid");
backOption.classList.add("fa-arrow-left");
backOption.addEventListener("click", function () {
  const modal = document.querySelector("#modal");
  const modal2 = document.querySelector("#modal2");
  modal.style.display = "block";
  modal2.style.display = "none";
  photoDiv.innerHTML = "";
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
validBtn.style.left = "39%";
validBtn.style.color = "rgba(255, 255, 255, 1)";
validBtn.style.backgroundColor = "#A7A7A7";
validBtn.style.height = "36px";
validBtn.style.border = "none";
validBtn.style.marginBottom = "55px";

// addPicturesForm.appendChild(h2AddPicturesForm);
// //Insertion de la div option
// modal2.prepend(optionDiv);
// optionDiv.appendChild(backOption);
// optionDiv.appendChild(closeOption);
// //Insertion de la div photo
// addPicturesForm.appendChild(photoDiv);
// photoDiv.appendChild(imgIcone);
// photoDiv.appendChild(addPhotoLabel);
// photoDiv.appendChild(inputUnderBtn);
// photoDiv.appendChild(labelPhoto);
// //insertion du champs catégorie

// //Insertion du champ titre
// addPicturesForm.appendChild(labelTitle);
// addPicturesForm.appendChild(inputTitle);
// //Insertion du boutton validé
// modal2.appendChild(validBtn);

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
      // const formData = new FormData(addPicturesForm);
      validBtn.classList.add("succes");
      validBtn.removeAttribute("disabled");
      validBtn.style.backgroundColor = "#1d6154";
      validBtn.style.color = "white";
      validBtn.style.cursor = "pointer";

      // formData.append("image", `${inputUnderBtn.value}`);
      // formData.append("category", `${selectedOption.value}`);
      // formData.append("title", `${inputTitle.value}`);
    }
  });

  validBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("id", 0);
    formData.append("title", inputTitle.value);
    formData.append("image", inputUnderBtn.value);
    formData.append("category", selectedOption.toString());
    // formData.append("userId", 0);

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
          console.log("Image uploaded successfully!");
        } else {
          console.log("An error occurred while uploading the image.");
        }
      })
      .catch((error) => {
        console.error("An error occurred while uploading the image:", error);
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
  // insertion du champs catégorie
  displayCategoriesForSelect();
  //Insertion du champ titre
  addPicturesForm.appendChild(labelTitle);
  addPicturesForm.appendChild(inputTitle);
  //Insertion du boutton validé
  modal2.appendChild(validBtn);
}

async function displayInitDivPhoto() {
  const initDivPhoto = document.createElement("div");
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
  labelCategory.setAttribute("for", "category");
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

  selectCategory.addEventListener("change", function () {
    selectedOption = selectCategory.options[selectCategory.selectedIndex];
    console.log("Je sélectionne " + selectedOption.text);
    console.log("La valeur sélectionnée est " + selectedOption);
    console.log("la valeur de selectCategory est " + selectCategory.value);
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

  imageModal.innerHTML = "";
  imageModal.appendChild(image);
  imageModal.appendChild(deleteButton);

  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();
    photoDiv.innerHTML = "";
    displayInitDivPhoto();
  });
}

function previewFile() {
  const fileExtensionRegex = /\.(jp?g|png)$/i;

  if (this.files.length === 0 || !fileExtensionRegex.test(this.files[0].name)) {
    return;
  }

  const file = this.files[0];

  inputUnderBtn.value = file.value;

  const fileReader = new FileReader();

  fileReader.readAsDataURL(file);

  fileReader.addEventListener("load", (e) => {
    displayImage(e, file);
  });
  return inputUnderBtn;
}
