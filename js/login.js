if (localStorage.getItem("isLoggedIn") === "true") {
  window.location.href = "index.html";
}

const form = document.querySelector("form");

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  localStorage.setItem("email", email);

  localStorage.setItem("isLoggedIn", "true");
  window.location.href = "index.html";
});
