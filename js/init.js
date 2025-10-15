const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";

if (!localStorage.getItem("isLoggedIn")) {
      window.location.href = "login.html";
}


let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

const cerrarSesion = ()=>{
  localStorage.removeItem("isLoggedIn");
  localStorage.removeItem("email");
  window.location.href = "login.html";
}

// Mostrar el email del usuario logueado
const elementoNavEmail = document.querySelector("nav .nav-item:last-child");

const dropdownUser = document.createElement("section");
dropdownUser.classList.add("dropdown-user", "btn-group");
dropdownUser.innerHTML = `
  <button type="button" class="btn btn-secondary">${localStorage.getItem("email")}</button>
  <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown" aria-expanded="false">
    <span class="visually-hidden">Toggle Dropdown</span>
  </button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="my-profile.html">Editar perfil</a></li>
    <li><hr class="dropdown-divider"></li>
    <li><button class="dropdown-item" onClick="cerrarSesion()">Cerrar sesión</button></li>
  </ul>
`

elementoNavEmail.appendChild(dropdownUser);

// === Toggle modo claro / oscuro ===

// Crear el contenedor principal
const toggleContainer = document.createElement("div");
toggleContainer.classList.add("theme-toggle");
toggleContainer.innerHTML = `<div class="circle"></div>`;

// Insertar el toggle justo al lado del email
elementoNavEmail.parentElement.appendChild(toggleContainer);

// === Estilos dinámicos del toggle ===
const estiloToggle = document.createElement("style");
estiloToggle.textContent = `
  .theme-toggle {
    width: 50px;
    height: 26px;
    background-color: black;
    border-radius: 50px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    display: flex;
    align-items: center;
    padding: 3px;
    margin-left: 1rem;
  }

  .theme-toggle .circle {
    width: 20px;
    height: 20px;
    background-color: white;
    border-radius: 50%;
    transition: transform 0.3s ease;
  }

  body.dark-theme .theme-toggle {
    background-color: white;
  }

  body.dark-theme .theme-toggle .circle {
    transform: translateX(24px);
    background-color: black;
  }


`;
document.head.appendChild(estiloToggle);

// === Lógica del toggle ===
const body = document.body;
const toggle = toggleContainer;

// Cargar preferencia guardada
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  body.classList.add("dark-theme");
} else if (!savedTheme && window.matchMedia("(prefers-color-scheme: dark)").matches) {
  body.classList.add("dark-theme");
}

// Alternar tema al hacer clic
toggle.addEventListener("click", () => {
  const isDark = body.classList.toggle("dark-theme");
  localStorage.setItem("theme", isDark ? "dark" : "light");
});