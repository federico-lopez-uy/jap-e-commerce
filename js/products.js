let productos;
let busqueda, sortOption;
let precioMinimo = -Infinity;
let precioMaximo = Infinity;

const inicializarProductos = async () => {
  const catID = localStorage.getItem("catID");
  const res = await getJSONData(
    `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
  );
  productos = res.data.products;

  actualizarTabla();
};

const actualizarTabla = async () => {
  const contenedorProductos = document.querySelector("div.contenedor");
  contenedorProductos.innerHTML = "";

  const listaProductos = document.createElement("section");
  listaProductos.classList.add("product-list");
  contenedorProductos.appendChild(listaProductos);

  let productosFiltradosOrdenados = productos.filter(
    (p) => p.cost >= precioMinimo && p.cost <= precioMaximo
  );

  if (sortOption) {
    productosFiltradosOrdenados.sort((A, B) =>
      sortOption == "price-asc"
        ? A.cost - B.cost
        : sortOption == "price-des"
        ? B.cost - A.cost
        : B.soldCount - A.soldCount
    );
  }

  if(busqueda){
    productosFiltradosOrdenados = productosFiltradosOrdenados.filter((prod) => {
    return (
      prod.description.toUpperCase().includes(busqueda) ||
      prod.name.toUpperCase().includes(busqueda)
    );
  });
  }

  for (const producto of productosFiltradosOrdenados) {
    const tarjetaProducto = document.createElement("section");
    tarjetaProducto.addEventListener("click", ()=> {
      localStorage.setItem("product-id", producto.id);
      window.location.href = "/product-info.html"
    })
    tarjetaProducto.classList.add("product-card");

    tarjetaProducto.innerHTML = `
            <section class="product-image-container">
                <img src="${producto.image}" alt= "imagen de ${producto.name}">
            </section>
            <section class="product-info-container">
                <p class="product-name">${producto.name}</p>
                <p class="product-description">${producto.description}</p>
            </section>
            <section class="product-price-container">
                <p class="product-price">$${producto.cost}</p>
                <p><span>Ventas: </span>${producto.soldCount}</p>
            </section>
            <div class="add-to-cart">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        `;
    listaProductos.appendChild(tarjetaProducto);
  }
};

inicializarProductos();

const botonFiltro = document.getElementById("rangeFilterCount");
botonFiltro.addEventListener("click", () => {
  precioMinimo =
    Number(document.getElementById("rangeFilterCountMin").value) || -Infinity;
  precioMaximo =
    Number(document.getElementById("rangeFilterCountMax").value) || Infinity;
  actualizarTabla();
});

const botonLimpiar = document.getElementById("clearRangeFilter");
botonLimpiar.addEventListener("click", () => {
  [...document.getElementsByClassName("range-filter")].forEach(ele => ele.value = "")
  precioMinimo = -Infinity;
  precioMaximo = Infinity;
  actualizarTabla();
});

const botonesFiltro = document.getElementsByName("sortOptions");
botonesFiltro.forEach((boton) =>
  boton.addEventListener("change", (e) => {
    sortOption = e.target.value;
    actualizarTabla();
  })
);

const barraBusqueda = document.getElementById("searchInput");
let timeoutBusqueda;
barraBusqueda.addEventListener("input", () => {
  busqueda = barraBusqueda.value.toUpperCase().trim();
  if (timeoutBusqueda) clearTimeout(timeoutBusqueda);
  timeoutBusqueda = setTimeout(actualizarTabla, 250);
});
