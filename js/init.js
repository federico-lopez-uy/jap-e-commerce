const CATEGORIES_URL = "http://localhost:3000/categorias";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "http://localhost:3000/productos";
const PRODUCT_INFO_URL = "http://localhost:3000/producto";
const PRODUCT_INFO_COMMENTS_URL = "http://localhost:3000/producto/comentarios";
const EXT_TYPE = ".json";

// Protección de rutas
const token = localStorage.getItem("token");
const isLoginPage = window.location.pathname.includes("login.html") ||
                    window.location.pathname.includes("register.html");

if (!token && !isLoginPage) {
  window.location.href = "login.html";
}

// Fetch con JWT
async function getJSONData(url) {
  const token = localStorage.getItem("token");

  let result = {};
  showSpinner();

  try {
    const response = await fetch(url, {
      headers: token ? { "Authorization": "Bearer " + token } : {}
    });

    // Si el token expiró o es inválido
    if (response.status === 403) {
      alert("Tu sesión expiró, iniciá sesión nuevamente.");
      cerrarSesion();
      return;
    }

    if (!response.ok) throw Error(response.statusText);

    const data = await response.json();
    result.status = 'ok';
    result.data = data;

  } catch (error) {
    result.status = 'error';
    result.data = error;
  }

  hideSpinner();
  return result;
}

const cerrarSesion = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("email");
  window.location.href = "login.html";
};

// Login info en nav
if (!isLoginPage) {
  const elementoNavEmail = document.querySelector("nav .nav-item:last-child");

  const dropdownUser = document.createElement("section");
  dropdownUser.classList.add("dropdown-user", "btn-group");
  dropdownUser.innerHTML = `
    <button type="button" class="btn btn-secondary">${localStorage.getItem("email")}</button>
    <button type="button" class="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown">
      <span class="visually-hidden">Toggle Dropdown</span>
    </button>
    <ul class="dropdown-menu">
      <li><a class="dropdown-item" href="my-profile.html">Editar perfil</a></li>
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" onClick="cerrarSesion()">Cerrar sesión</button></li>
    </ul>
  `;

  elementoNavEmail.appendChild(dropdownUser);

  // Carrito
  const productosCarrito = JSON.parse(localStorage.getItem("carrito")) || [];
  let cantidad = productosCarrito.reduce((acc, p) => acc + p.cantidad, 0);

  const elementoNavCart = document.createElement("button");
  elementoNavCart.className = "btn btn-primary position-relative";
  elementoNavCart.type = "button";
  elementoNavCart.innerHTML = `
    <i class="fa-solid fa-cart-shopping"></i>
    <span class="badge-carrito position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
      ${cantidad}
    </span>
  `;
  elementoNavCart.addEventListener("click", () => window.location.href = "cart.html");

  elementoNavEmail.parentElement.appendChild(elementoNavCart);

  // Tema oscuro
  const toggleContainer = document.createElement("div");
  toggleContainer.classList.add("theme-toggle");
  toggleContainer.innerHTML = `<div class="circle"></div>`;
  elementoNavEmail.parentElement.appendChild(toggleContainer);

  const body = document.body;
  if (localStorage.getItem("theme") === "dark") {
    body.classList.add("dark-theme");
  }

  toggleContainer.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-theme");
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
}


function showSpinner() {
  document.getElementById("spinner-wrapper").style.display = "block";
}

function hideSpinner() {
  document.getElementById("spinner-wrapper").style.display = "none";
}
