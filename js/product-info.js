const completarCampos = (datosProducto) => {
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
  completarCampos(res.data);
};

fetchProduct();
