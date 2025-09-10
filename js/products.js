const rellenarTabla = async()=>{
    const catID = localStorage.getItem("catID")
    const res = await getJSONData(`https://japceibal.github.io/emercado-api/cats_products/${catID}.json`);
    const productos = res.data.products;
    const contenedorProductos = document.querySelector("main .container");

    const listaProductos = document.createElement("section");
    listaProductos.classList.add("product-list");
    contenedorProductos.appendChild(listaProductos);


    for(const producto of productos){
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
        `
        listaProductos.appendChild(tarjetaProducto)
    }
}

rellenarTabla()


