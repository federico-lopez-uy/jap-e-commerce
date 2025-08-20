
    if (localStorage.getItem("isLoggedIn") === "true") {
      window.location.href = "index.html";
    }

    const form = document.querySelector("form");

    form.addEventListener('submit', function (e) {
      e.preventDefault();

        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "index.html";
      
    });