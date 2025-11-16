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
  return steps.find((step) => step.classList.contains("step-active"));
}

// Muestra el contenido correspondiente y oculta los demás
function showStepContent(stepName) {
  stepContents.forEach((content) => {
    content.style.display =
      content.dataset.step === stepName ? "block" : "none";
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

btnSiguiente.addEventListener("click", (e) => {
  e.preventDefault();
  const currentStep = getCurrentStep();
  const currentIndex = steps.indexOf(currentStep);

  // Validar formulario en el paso "direccion"
  if (currentStep.dataset.step === "direccion") {
    const form = document.getElementById("shipping-form");

    if (!form.checkValidity()) {
      form.reportValidity();
      return; // NO avanzar
    } else {
      localStorage.setItem(
        "direccion",
        JSON.stringify({
          departamento: document.querySelector(
            ".shipping-form input#departamento"
          ).value,
          localidad: document.querySelector(".shipping-form input#localidad")
            .value,
          calle: document.querySelector(".shipping-form input#calle").value,
          numero: document.querySelector(".shipping-form input#numero").value,
          esquina: document.querySelector(".shipping-form input#esquina").value,
        })
      );
    }
  }

  const nextStep = steps[currentIndex + 1];

  if (nextStep && nextStep.dataset.step === "resumen") {
    const productosCarrito = JSON.parse(localStorage.getItem("carrito"));
    let totalProductos = 0;
    for (producto of productosCarrito) {
      totalProductos += producto.cost * producto.cantidad;
    }

    document.getElementById(
      "total-productos"
    ).textContent = `$${totalProductos.toLocaleString("es-UY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;

    const tipoEnvio = localStorage.getItem("envio");
    document.getElementById("tipo-envio").textContent = tipoEnvio;

    const costoEnvio =
      totalProductos *
      (tipoEnvio === "standard" ? 0.05 : tipoEnvio === "express" ? 0.07 : 0.15);
    document.getElementById(
      "costo-envio"
    ).textContent = `$${costoEnvio.toLocaleString("es-UY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })} - ${
      tipoEnvio === "standard"
        ? "(5%)"
        : tipoEnvio === "express"
        ? "(7%)"
        : "(15%)"
    }`;

    const ENVIO_DIAS = {
      standard: { min: 12, max: 15 },
      express: { min: 5, max: 8 },
      premium: { min: 2, max: 5 },
    };

    const sumarDias = (dias) => {
      const fecha = new Date();
      fecha.setDate(fecha.getDate() + dias);
      return fecha.toLocaleDateString("es-UY");
    };

    const { min, max } = ENVIO_DIAS[tipoEnvio];
    document.getElementById(
      "fecha-estimada"
    ).textContent = `Entre el ${sumarDias(min)} y el ${sumarDias(max)}`;

    const direccion = JSON.parse(localStorage.getItem("direccion"));
    const direccionTexto = `${direccion.departamento}, ${direccion.localidad} - 
    calle ${direccion.calle} Nº ${direccion.numero}, esquina ${direccion.esquina}`;
    document.getElementById("direccion-envio").textContent = direccionTexto;

    const FORMAS_PAGO = {
      credito: "Crédito",
      debito: "Débito",
      efectivo: "Efectivo",
      transferencia: "Transferencia Bancaria",
    };
    document.getElementById("forma-pago").textContent =
      FORMAS_PAGO[localStorage.getItem("formaPago")];

    document.getElementById("total").textContent = `$${(
      totalProductos + costoEnvio
    ).toLocaleString("es-UY", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    })}`;
  }

  if (currentIndex === steps.length - 1) {
    finalizarCompra();
    return;
  }

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
  alert("Compra finalizada!");
}

function mostrarProductosCarrito() {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  const contenedorItems = document.querySelector(".cart-items");
  contenedorItems.innerHTML = "";

  if (!productosCarrito.length) {
    contenedorItems.innerHTML = `<p class="carrito-vacio">El carrito está vacío</p>`;
  }

  let totalProductos = 0;

  for (producto of productosCarrito) {
    totalProductos += producto.cost * producto.cantidad;

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
            <button class="qty-btn minus" onclick="actualizarCantidad(false, ${
              producto.id
            })">
                <i class="fa-solid fa-minus"></i>
            </button>
            <input type="number" value=${producto.cantidad} min="1" disabled/>
            <button class="qty-btn plus" onclick="actualizarCantidad(true, ${
              producto.id
            })">
                <i class="fa-solid fa-plus"></i>
            </button>
            </div>
        </div>
        <div class="col-subtotal">${producto.cost * producto.cantidad} ${
      producto.currency
    }</div>
        <div class="col-accion">
            <button class="delete-btn" title="Eliminar" onclick="eliminarProducto(${
              producto.id
            })">
            <i class="fa-solid fa-trash"></i>
            </button>
        </div>    
    `;
    contenedorItems.appendChild(item);
  }
}

function actualizarCantidad(esAgregar, idProducto) {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));

  const carritoActualizado = productosCarrito.map((producto) => {
    if (producto.id != idProducto) return producto;
    return {
      ...producto,
      cantidad: esAgregar
        ? producto.cantidad + 1
        : Math.max(producto.cantidad - 1, 0),
    };
  });

  badgeCarrito.textContent = carritoActualizado.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );

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

  badgeCarrito.textContent = carritoActualizado.reduce(
    (acc, producto) => acc + producto.cantidad,
    0
  );
}

function manejarLogicaEnvio() {
  if (!localStorage.getItem("envio")) localStorage.setItem("envio", "standard");

  const botonStandard = document.querySelector(".shipping-card#standard");
  const botonExpress = document.querySelector(".shipping-card#express");
  const botonPremium = document.querySelector(".shipping-card#premium");

  [
    { tipoEnvio: "standard", elemento: botonStandard },
    { tipoEnvio: "express", elemento: botonExpress },
    { tipoEnvio: "premium", elemento: botonPremium },
  ].forEach((envio) => {
    envio.elemento.addEventListener("click", () => {
      localStorage.setItem("envio", envio.tipoEnvio);
      [botonStandard, botonExpress, botonPremium].forEach((ele) =>
        ele.classList.remove("activo")
      );
      envio.elemento.classList.add("activo");
    });
  });
}

function manejarLogicaFormaDePago() {
  if (!localStorage.getItem("formaPago"))
    localStorage.setItem("formaPago", "efectivo");

  const botonCredito = document.querySelector("button#credito");
  const botonDebito = document.querySelector("button#debito");
  const botonEfectivo = document.querySelector("button#efectivo");
  const botonTransferencia = document.querySelector("button#transferencia");

  [
    { formaPago: "credito", elemento: botonCredito },
    { formaPago: "debito", elemento: botonDebito },
    { formaPago: "efectivo", elemento: botonEfectivo },
    { formaPago: "transferencia", elemento: botonTransferencia },
  ].forEach((forma) => {
    forma.elemento.addEventListener("click", () => {
      localStorage.setItem("formaPago", forma.formaPago);
      [botonCredito, botonDebito, botonEfectivo, botonTransferencia].forEach(
        (ele) => ele.classList.remove("activo")
      );
      forma.elemento.classList.add("activo");
    });
  });
}

manejarLogicaEnvio();
manejarLogicaFormaDePago();

mostrarProductosCarrito();
