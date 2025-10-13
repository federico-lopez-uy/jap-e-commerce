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
