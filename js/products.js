
const fetchAutos = async()=> {
    try {
        const res = await fetch("https://japceibal.github.io/emercado-api/cats_products/101.json");
        const data = await res.json();
        return data.products;
    } catch(error){
        console.log("Ha habido un error", error)
    } 
}

const rellenarTabla = async()=>{
    const autos = await fetchAutos();    
    const contenedorAutos = document.querySelector("main .container");

    const listaProductos = document.createElement("section");
    listaProductos.classList.add("product-list");
    contenedorAutos.appendChild(listaProductos);


    for(const auto of autos){
        const tarjetaProducto = document.createElement("section");
        tarjetaProducto.classList.add("product-card");
        
        tarjetaProducto.innerHTML = `
            <section class="product-image-container">
                <img src="${auto.image}" alt= "imagen de ${auto.name}">
            </section>
            <section class="product-info-container">
                <p class="product-name">${auto.name}</p>
                <p class="product-description">${auto.description}</p>
            </section>
            <section class="product-price-container">
                <p class="product-price">$${auto.cost}</p>
                <p><span>Ventas: </span>${auto.soldCount}</p>
            </section>
            <div class="add-to-cart">
                <i class="fa-solid fa-cart-shopping"></i>
            </div>
        `
        listaProductos.appendChild(tarjetaProducto)
    }
}

rellenarTabla()


