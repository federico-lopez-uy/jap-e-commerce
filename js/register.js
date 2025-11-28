document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const password2 = document.getElementById("password2").value.trim();

  if (password !== password2) {
    alert("Las contraseñas no coinciden");
    return;
  }

  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });

  const data = await res.json();

  if (data.ok) {
    alert("Usuario registrado. Ahora puedes iniciar sesión.");
    window.location.href = "login.html";
  } else {
    alert(data.error || "Error al registrarte.");
  }
});
