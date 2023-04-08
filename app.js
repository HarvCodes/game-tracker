// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

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
const auth = getAuth();
const db = getFirestore();

document.addEventListener("DOMContentLoaded", function () {
  toggleDarkMode();
  handleAuthentication();
});

// Toggle dark mode
function toggleDarkMode() {
  const toggleButton = document.getElementById("dark-mode-toggle");
  const body = document.querySelector("body");

  toggleButton.addEventListener("click", () => {
    body.classList.toggle("dark-mode");
  });
}

// Handle user authentication
function handleAuthentication() {
  onAuthStateChanged(auth, (user) => {
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
  const email = prompt("Enter your email:");
  const password = prompt("Enter your password:");
  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Successfully logged in!");
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
    alert("Successfully registered!");
  } catch (error) {
    console.error("Error registering user:", error.message);
    alert("Failed to register. Please check your details and try again.");
  }
}

async function logoutUser() {
  await signOut(auth);
  alert("Successfully logged out!");
}
