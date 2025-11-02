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

  const elementoPrecioTotal = document.getElementById("total");
  elementoPrecioTotal.textContent = `Total: $${total}`;
}

function actualizarCantidad(esAgregar, idProducto) {
  const productosCarrito = JSON.parse(localStorage.getItem("carrito"));
  const carritoActualizado = productosCarrito.map((producto) =>
    producto.id == idProducto
      ? {
          ...producto,
          cantidad: esAgregar
            ? producto.cantidad + 1
            : Math.max(producto.cantidad - 1, 0),
        }
      : producto
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

  const badgeCarrito = document.querySelector(".badge-carrito");
  badgeCarrito.textContent = carritoActualizado.length;

}

mostrarProductosCarrito();

document.getElementById("continuar-comprando").addEventListener("click", ()=> window.location.href = "products.html")