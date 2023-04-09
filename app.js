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
firebase.initializeApp(firebaseConfig);
firebase.analytics();

document.addEventListener("DOMContentLoaded", function () {
  toggleDarkMode();
  handleAuthentication();
});

// Toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark-mode");
}

// Handle user authentication
function handleAuthentication() {
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      // User is signed in, show the logout button
      document.getElementById("logout-btn").hidden = false;
      document.getElementById("login-btn").hidden = true;
      document.getElementById("register-btn").hidden = true;
    } else {
      // User is signed out, show the login and register buttons
      document.getElementById("logout-btn").hidden = true;
      document.getElementById("login-btn").hidden = false;
      document.getElementById("register-btn").hidden = false;
    }
  });

  document.getElementById("login-btn").addEventListener("click", loginUser);
  document.getElementById("register-btn").addEventListener("click", registerUser);
  document.getElementById("logout-btn").addEventListener("click", logoutUser);
}

async function loginUser() {
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;
  try {
    const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
    console.log("User logged in:", userCredential.user);
  } catch (error) {
    console.error("Error during login:", error);
  }
}

async function registerUser() {
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;
try {
const userCredential = await firebase.auth().createUserWithEmailAndPassword(email, password);
console.log("User registered:", userCredential.user);
} catch (error) {
console.error("Error during registration:", error);
}
}

async function logoutUser() {
await firebase.auth().signOut();
alert("Successfully logged out!");
}
