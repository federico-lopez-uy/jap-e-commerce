// Rellenamos el email desde localStorage
const campoEmail = document.getElementById("email");
campoEmail.value = localStorage.getItem("email") || "";

// Rellenamos la imágen desde localStorage
const placeholderFoto = document.getElementById("placeholder-foto");
const fotoPerfilSrc = localStorage.getItem("fotoPerfil")
if(fotoPerfilSrc){
    placeholderFoto.innerHTML = `<img src=${fotoPerfilSrc} class="foto-perfil" />`
}



// Rellenamos el resto de datos, en caso de que ya existan dentro de localStorage
const datosPersonales = JSON.parse(localStorage.getItem("datosPersonales"));
if (datosPersonales) {
  ["nombre", "apellido", "telefono"].forEach((dato) => {
    document.getElementById(dato).value = datosPersonales[dato] || "";
  });
}

const botonActualizar = document.querySelector(".actualizar-button");
botonActualizar.addEventListener("click", () => {
  const datosPersonales = {
    nombre: document.getElementById("nombre").value || "",
    apellido: document.getElementById("apellido").value || "",
    telefono: document.getElementById("telefono").value || "",
  };

  localStorage.setItem("datosPersonales", JSON.stringify(datosPersonales));
  window.location.href = "index.html"
});


const inputFoto = document.querySelector("input#foto");
inputFoto.addEventListener('change', (e) => {
                const file = e.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = function(e) {
                        placeholderFoto.innerHTML = `<img src=${e.target.result} class="foto-perfil" />`
                        localStorage.setItem('fotoPerfil', e.target.result);
                    };
                    reader.readAsDataURL(file);
                }
            });
