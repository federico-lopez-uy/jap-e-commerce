const badgeCarrito = document.querySelector(".badge-carrito");

// ----------------------------
// SISTEMA DE CAMBIO DE PASOS
// ----------------------------

const steps = Array.from(document.querySelectorAll(".step-item"));
const stepContents = Array.from(document.querySelectorAll(".step-content"));
const btnSiguiente = document.querySelector(".btn-pagar");
const btnAnterior = document.querySelector(".btn-continue");

// Devuelve el paso activo actual
function getCurrentStep() {
  return steps.find(step => step.classList.contains("step-active"));
}

// Muestra el contenido correspondiente y oculta los demás
function showStepContent(stepName) {
  stepContents.forEach(content => {
    content.style.display = content.dataset.step === stepName ? "block" : "none";
  });
}

// Inicializar contenido al cargar
showStepContent("carrito");
btnAnterior.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Continuar comprando`;

// Función para actualizar botones y bloquear pasos posteriores
function updateSteps() {
  const currentStep = getCurrentStep();
  const currentIndex = steps.indexOf(currentStep);

  // Bloquear todos los pasos posteriores al actual
  steps.forEach((step, i) => {
    if (i > currentIndex) step.classList.add("step-locked");
  });

  // Actualizar contenido
  showStepContent(currentStep.dataset.step);

  // Actualizar botón siguiente
  if (currentIndex === steps.length - 1) {
    btnSiguiente.innerHTML = `Finalizar compra <i class="fa-solid fa-check"></i>`;
  } else {
    btnSiguiente.innerHTML = `Siguiente <i class="fa-solid fa-arrow-right"></i>`;
  }

  // Actualizar botón anterior
  if (currentStep.dataset.step === "carrito") {
    btnAnterior.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Continuar comprando`;
  } else {
    btnAnterior.innerHTML = `<i class="fa-solid fa-arrow-left"></i> Anterior`;
  }
}

// Avanzar al siguiente paso
btnSiguiente.addEventListener("click", () => {
  const currentStep = getCurrentStep();
  const currentIndex = steps.indexOf(currentStep);

  if (currentIndex === steps.length - 1) {
    finalizarCompra();
    return;
  }

  // Activar siguiente paso
  const nextStep = steps[currentIndex + 1];
  currentStep.classList.remove("step-active");
  nextStep.classList.remove("step-locked");
  nextStep.classList.add("step-active");

  updateSteps();
});

// Retroceder al paso anterior o volver a categorías
btnAnterior.addEventListener("click", () => {
  const currentStep = getCurrentStep();
  const currentIndex = steps.indexOf(currentStep);

  if (currentStep.dataset.step === "carrito") {
    window.location.href = "categories.html";
    return;
  }

  const prevStep = steps[currentIndex - 1];
  currentStep.classList.remove("step-active");
  prevStep.classList.add("step-active");

  updateSteps();
});

// Función placeholder para finalizar compra
function finalizarCompra() {
  alert("Compra finalizada! Aquí pondrías tu lógica de validación y pago.");
}


function mostrarProductosCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  const contenedorItems = document.querySelector(".cart-items");
  contenedorItems.innerHTML = "";

  if (!productosCarrito.length) {
    contenedorItems.innerHTML = `<p class="carrito-vacio">El carrito está vacío</p>`;
  }

  let total = 0;

  for (producto of productosCarrito) {
    total += producto.cost * producto.cantidad;

    const item = document.createElement("div");
    item.classList.add("cart-item");
    item.innerHTML = `
        <div class="col-producto">
            <img class="img-cart" src=${producto.images[0]} />
            <div class="item-nombre">${producto.name}</div>
        </div>
        <div class="col-precio">${producto.cost} ${producto.currency}</div>
        <div class="col-cantidad">
            <div class="quantity-control">
            <button class="qty-btn minus" onclick="actualizarCantidad(false, ${producto.id
      })">
                <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" value=${producto.cantidad} min="1" disabled/>
            <button class="qty-btn plus" onclick="actualizarCantidad(true, ${producto.id
      })">
                <i class="fa-solid fa-plus"></i>
            </button>
            </div>
        </div>
        <div class="col-subtotal">${producto.cost * producto.cantidad} ${producto.currency
      }</div>
        <div class="col-accion">
            <button class="delete-btn" title="Eliminar" onclick="eliminarProducto(${producto.id
      })">
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>    
    `;
    contenedorItems.appendChild(item);
  }

  const elementoPrecioTotal = document.getElementById("total");
  elementoPrecioTotal.textContent = `Total: $${total}`;
}

function actualizarCantidad(esAgregar, idProducto) {

  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));

  const carritoActualizado = productosCarrito.map((producto) => {
    if (producto.id != idProducto) return producto;
    return (
      {
        ...producto,
        cantidad: esAgregar
          ? producto.cantidad + 1
          : Math.max(producto.cantidad - 1, 0),
      }
    )


  });

  badgeCarrito.textContent = carritoActualizado.reduce((acc, producto) => acc + producto.cantidad, 0);

  localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  mostrarProductosCarrito();
}

function eliminarProducto(idProducto) {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  const carritoActualizado = productosCarrito.filter(
    (producto) => producto.id != idProducto
  );
  localStorage.setItem("carrito", JSON.stringify(carritoActualizado));
  mostrarProductosCarrito();


  badgeCarrito.textContent = carritoActualizado.reduce((acc, producto) => acc + producto.cantidad, 0);

}

mostrarProductosCarrito();
