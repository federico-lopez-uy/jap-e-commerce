const completarCampos = (datos) => {
  const datosProducto = datos.producto;
  const comentarios = datos.comentarios;

  document.getElementById(
    "product-category"
  ).innerText = `Categoría: ${datosProducto.category}`;
  document.getElementById("product-name").innerText = datosProducto.name;
  document.getElementById("product-description").innerText =
    datosProducto.description;
  document.getElementById(
    "product-cost"
  ).innerText = `${datosProducto.cost} ${datosProducto.currency}`;
  document.getElementById(
    "product-sold-count"
  ).innerText = `${datosProducto.soldCount} unidades vendidas`;

  const contenedorComentarios = document.querySelector(".comments-container");
    
  comentarios.forEach(comentario=> {
    const elementoComentario = document.createElement("article");
    elementoComentario.classList.add("comentario-wrapper");
    elementoComentario.innerHTML = `
      <section class="user">
        <img src='img/icons/user-solid-full.svg'>
        <h3>${comentario.user}</h3>
      </section>
      <p>${comentario.description}</p>
      <section class="fecha-valoracion">
        <p><span class="titulo">Fecha: </span> ${comentario.dateTime}</p>
        <section class="rating-stars">
          <span class="titulo">Valoración: </span>
          ${"<img src='img/icons/star-solid-full.svg'>".repeat(comentario.score)}
          ${"<img src='img/icons/star-regular-full.svg'>".repeat(5 - comentario.score)}
        </section>
      </section>
    `;
    contenedorComentarios.appendChild(elementoComentario);
  })

  const sideImages = document.getElementById("side-images");
  datosProducto.images.forEach((imgPath) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("click", () => {
      document.getElementById("main-image").src = imgPath;
      [...document.querySelectorAll("#side-images img")].forEach(img => img.classList.remove("active"))
      img.classList.add("active");
    });

    const li = document.createElement("li");
    li.appendChild(img);
    sideImages.appendChild(li);
  });

  const mainImg = document.getElementById("main-image");
  mainImg.src = datosProducto.images[0];
};

const fetchProduct = async () => {
  const productId = localStorage.getItem("product-id");
  const res = await getJSONData(
    `https://japceibal.github.io/emercado-api/products/${productId}.json`
  );
  const resComments = await getJSONData(
    `https://japceibal.github.io/emercado-api/products_comments/${productId}.json`
  );
  
  completarCampos({producto: res.data, comentarios: resComments.data});
};

fetchProduct();
