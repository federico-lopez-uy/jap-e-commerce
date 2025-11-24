const CATEGORIES_URL = "http://localhost:3000/categorias";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/productos";
const PRODUCT_INFO_URL = "http://localhost:3000/producto";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/producto/comentarios";
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

const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
let cantidadCarrito = 0;
productosCarrito.forEach(p => {
  cantidadCarrito += p.cantidad;
})


const elementoNavCart = document.createElement("button");
elementoNavCart.className = "btn btn-primary position-relative"
elementoNavCart.type = "button"
elementoNavCart.innerHTML = `
<i class="fa-solid fa-cart-shopping"></i>
  <span class="badge-carrito position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
    ${cantidadCarrito}
    <span class="visually-hidden">items in cart</span>
  </span>
`
elementoNavCart.addEventListener("click", ()=> window.location.href = "cart.html")
elementoNavEmail.parentElement.appendChild(elementoNavCart);


// === Toggle modo claro / oscuro ===

// Crear el contenedor principal
const toggleContainer = document.createElement("div");
toggleContainer.classList.add("theme-toggle");
toggleContainer.innerHTML = `<div class="circle"></div>`;

// Insertar el toggle justo al lado del email
elementoNavEmail.parentElement.appendChild(toggleContainer);

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