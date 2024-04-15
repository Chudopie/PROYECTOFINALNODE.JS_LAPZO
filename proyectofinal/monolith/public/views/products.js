document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "/login";
    return;
  }
  fetch("/api/products", {
    method: "GET",
    headers: {
      Authorization: ` Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      document.querySelector(
        "h1"
      ).innerHTML = `Welcome to my Store ${data.user}!`;
    })
    .catch((err) => console.error("errrrorrrr", err));
});
