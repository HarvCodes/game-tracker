const {
  initializeApp,
  getAnalytics,
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  getFirestore,
} = firebase.default;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAWjpIJ5EBOpHNykAc-7YZXEJA_55ipw0Q",
  authDomain: "harvs-game-tracker.firebaseapp.com",
  projectId: "harvs-game-tracker",
  storageBucket: "harvs-game-tracker.appspot.com",
  messagingSenderId: "118470639156",
  appId: "1:118470639156:web:2351a582685022ce769461",
  measurementId: "G-NWF5PMQ7XH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Firebase Authentication and Firestore references
const auth = getAuth();
const firestore = getFirestore();

// IGDB API key and endpoint
const clientId = "b1lmi22qucsow3y9xlnp88kt9naa8o";
const clientSecret = "hyeb6cm8gpzul17jv11gqe7ir1p2wk";
const apiEndpoint = "https://api.igdb.com/v4/games";

// Fetch game data from IGDB API
async function fetchGameData(searchQuery, filters) {
  // Get the access token
  const tokenResponse = await fetch('https://id.twitch.tv/oauth2/token?client_id=' + clientId + '&client_secret=' + clientSecret + '&grant_type=client_credentials', {
    method: 'POST',
  });

  const tokenData = await tokenResponse.json();
  const accessToken = tokenData.access_token;

  // Call the IGDB API with the access token
  const response = await fetch(apiEndpoint, {
    method: 'POST',
    headers: {
      'Client-ID': clientId,
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      search: searchQuery,
      filters: filters,
    }),
  });

  const data = await response.json();
  return data;
}

// Create search form
function createSearchForm() {
  const searchForm = document.getElementById("search-form");
  searchForm.addEventListener("submit", performSearch);
}

async function performSearch(event) {
  event.preventDefault();

  const searchInput = document.getElementById("search-input");
  const searchQuery = searchInput.value;

  // ...
}


  const filters = {
    timeToComplete: document.getElementById("time-to-complete").value,
    genre: document.getElementById("genre").value,
    platform: document.getElementById("platform").value,
    gameMode: document.getElementById("game-mode").value,
  };

  const gameResults = await fetchGameData(searchQuery, filters);
  displayGameResults(gameResults);
}

function displayGameResults(gameResults) {
  const resultsDiv = document.getElementById("game-results");
  resultsDiv.innerHTML = "";

  gameResults.forEach((game) => {
    const gameCard = document.createElement("div");
    gameCard.classList.add("game-card");

    const gameTitle = document.createElement("h3");
    gameTitle.textContent = game.name;
    gameCard.appendChild(gameTitle);

    const gameCover = document.createElement("img");
    gameCover.src = game.cover.url;
    gameCard.appendChild(gameCover);

    resultsDiv.appendChild(gameCard);
  });
}

// Suggest games
function suggestGames() {
  // Suggest games based on user preferences or popular games
}

// Handle user authentication
function handleAuthentication() {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, show the logout button
      document.getElementById("logout-btn").style.display = "block";
    } else {
      // User is signed out, show the login and register buttons
      document.getElementById("login-btn").style.display = "block";
      document.getElementById("register-btn").style.display = "block";
    }
  });

  document.getElementById("login-btn").addEventListener("click", loginUser);
  document.getElementById("register-btn").addEventListener("click", registerUser);
  document.getElementById("logout-btn").addEventListener("click", logoutUser);
}

async function loginUser() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error logging in:", error.message);
    alert("Failed to log in. Please check your credentials and try again.");
  }
}

async function registerUser() {
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  try {
    await createUserWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.error("Error registering user:", error.message);
    alert("Failed to register. Please check your details and try again.");
  }
}

async function logoutUser() {
  await signOut(auth);
}

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

// Initialize the app
function init() {
  createSearchForm();
  handleAuthentication();
  suggestGames();
  document.getElementById("toggle-dark-mode").addEventListener("click", toggleDarkMode);
}

init();
