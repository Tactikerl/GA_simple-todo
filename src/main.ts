import { login } from "./api";

const loginSection = document.getElementById("login-section") as HTMLElement;
const todoSection = document.getElementById("todo-section") as HTMLElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const loginError = document.getElementById(
  "login-error",
) as HTMLParagraphElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement

function showSection(section: "login" | "todos"): void {
  if (section === "login") {
    loginSection.classList.remove("hidden");
    todoSection.classList.add("hidden");
  } else {
    loginSection.classList.add("hidden");
    todoSection.classList.remove("hidden");
  }
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = (document.getElementById("email") as HTMLInputElement).value;
  const password = (document.getElementById("password") as HTMLInputElement)
    .value;

  try {
    loginError.classList.add("hidden");
    const data = await login(email, password);
    localStorage.setItem("api_key", data.API_KEY);
    showSection("todos");
  } catch (error) {
    loginError.textContent = (error as Error).message;
    loginError.classList.remove("hidden");
  }
});

logoutBtn.addEventListener('click', () => {
    localStorage.removeItem('api_key')
    showSection('login')
})

/* INIT */

const savedKey = localStorage.getItem("api_key");
if (savedKey) {
  showSection("todos");
} else {
  showSection("login");
}
