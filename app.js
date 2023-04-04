document.addEventListener("DOMContentLoaded", function () {
  const toggleDarkModeBtn = document.getElementById("toggle-dark-mode");
  toggleDarkModeBtn.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
  });

  const searchBtn = document.getElementById("search-btn");
  searchBtn.addEventListener("click", function () {
    const searchInput = document.getElementById("search-input");
    const searchQuery = searchInput.value;
    console.log("Searching for games:", searchQuery);
  });

  const loginBtn = document.getElementById("login-btn");
  loginBtn.addEventListener("click", function () {
    console.log("Login button clicked");
  });

  const registerBtn = document.getElementById("register-btn");
  registerBtn.addEventListener("click", function () {
    console.log("Register button clicked");
  });
});
