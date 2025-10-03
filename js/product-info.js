const agregarComentario = ({ user, description, dateTime, score }) => {
  const contenedorComentarios = document.querySelector(".comments-container");

  const elementoComentario = document.createElement("article");
  elementoComentario.classList.add("comentario-wrapper");
  elementoComentario.innerHTML = `
      <section class="user">
        <img src='img/icons/user-solid-full.svg'>
        <h3>${user}</h3>
      </section>
      <p>${description}</p>
      <section class="fecha-valoracion">
        <p><span class="titulo">Fecha: </span> ${dateTime}</p>
        <section class="rating-stars">
          <span class="titulo">Valoración: </span>
          ${"<img src='img/icons/star-solid-full.svg'>".repeat(score)}
          ${"<img src='img/icons/star-regular-full.svg'>".repeat(5 - score)}
        </section>
      </section>
    `;
  contenedorComentarios.appendChild(elementoComentario);
};

const mostrarProductoRelacionado = (producto)=>{
  const productContainer = document.querySelector(".grid-productos");

  const productCard = document.createElement("section");
  productCard.classList.add("producto-card");

  productCard.innerHTML = `
    <img src='${producto.image}' alt='${producto.name}'/>
    <p>${producto.name}</p>
  `
  productCard.addEventListener("click", ()=> {
      localStorage.setItem("product-id", producto.id);
      window.location.href = "product-info.html"
    })

  productContainer.appendChild(productCard);
  
}

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

  comentarios.forEach(agregarComentario);

  datosProducto.relatedProducts.forEach(mostrarProductoRelacionado);

  const sideImages = document.getElementById("side-images");
  datosProducto.images.forEach((imgPath) => {
    const img = document.createElement("img");
    img.src = imgPath;

    img.addEventListener("click", () => {
      document.getElementById("main-image").src = imgPath;
      [...document.querySelectorAll("#side-images img")].forEach((img) =>
        img.classList.remove("active")
      );
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

  completarCampos({ producto: res.data, comentarios: resComments.data });
};

fetchProduct();

const starLabels = document.querySelectorAll(".star-rating label");
starLabels.forEach((label) => {
  const score = Number(label.getAttribute("data-stars"));
  label.innerHTML = `${"<i class='fas fa-star'></i>".repeat(
    score
  )}${"<i class='far fa-star'></i>".repeat(5 - score)}`;
});

const form = document.getElementById("form-calificacion");
const comentariosUL = document.getElementById("comentarios-ul");

form.addEventListener("submit", function (event) {
  event.preventDefault(); // evita recargar la página

  const comentario = document.getElementById("comentario").value;
  const calificacion = document.querySelector(
    "input[name='calificacion']:checked"
  );

  const user = localStorage.getItem("email").split("@")[0];
  agregarComentario({
    user,
    description: comentario,
    dateTime: Date.now(),
    score: calificacion.value,
  });

  form.reset();
});
