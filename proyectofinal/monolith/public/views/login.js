document.getElementById("LoginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch("/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
    headers: { "Content-Type": "application/json" },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        localStorage.setItem("token", data.token);
        window.location.href = "/products";
      } else {
        alert("Tu usuario y/o contrasenia es incorrecta!");
      }
    })
    .catch((err) => console.error("Error: ", err));
});
