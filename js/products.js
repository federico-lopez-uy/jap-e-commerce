let productos;

const inicializarTabla = async () => {
  const catID = localStorage.getItem("catID");
  const res = await getJSONData(
    `https://japceibal.github.io/emercado-api/cats_products/${catID}.json`
  );
  productos = res.data.products;

  rellenarTabla(productos);
};

const rellenarTabla = async (productos) => {
  const contenedorProductos = document.querySelector("div.contenedor");
  contenedorProductos.innerHTML = "";

  const listaProductos = document.createElement("section");
  listaProductos.classList.add("product-list");
  contenedorProductos.appendChild(listaProductos);

  for (const producto of productos) {
    const tarjetaProducto = document.createElement("section");
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

inicializarTabla();

const botonFiltro = document.getElementById("rangeFilterCount");
botonFiltro.addEventListener("click", async()=>{
    const minimo = Number (document.getElementById("rangeFilterCountMin").value) || -Infinity;
    const maximo = Number (document.getElementById("rangeFilterCountMax").value) || Infinity;

    const productosFiltrados = productos.filter(p => p.cost >= minimo && p.cost <= maximo);
    rellenarTabla(productosFiltrados)
})


const botonLimpiar = document.getElementById("clearRangeFilter");
botonLimpiar.addEventListener("click", ()=> {
    rellenarTabla(productos);
    document.getElementById("rangeFilterCountMin").value = ""
    document.getElementById("rangeFilterCountMax").value = ""
})

const botonesFiltro = document.getElementsByName("sortOptions");
botonesFiltro.forEach(boton => boton.addEventListener("change", (e)=> {
  const optionSelected = e.target.value;

  let productosOrdenados;

  if(optionSelected == "price-asc") {
    productosOrdenados = productos.slice().sort((A, B) => A.cost - B.cost);
  } else if (optionSelected == "price-des") {
    productosOrdenados = productos.slice().sort((A, B) => B.cost - A.cost);
  } else {
    productosOrdenados = productos.slice().sort((A, B) => B.soldCount - A.soldCount);
  }

  rellenarTabla(productosOrdenados);

}))
