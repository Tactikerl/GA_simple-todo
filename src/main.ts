import { getTodos, login } from "./api";
import type { Todo } from "./types";

/* VARIABLER */
const loginSection = document.getElementById("login-section") as HTMLElement;
const todoSection = document.getElementById("todo-section") as HTMLElement;
const loginForm = document.getElementById("login-form") as HTMLFormElement;
const loginError = document.getElementById(
  "login-error",
) as HTMLParagraphElement;
const logoutBtn = document.getElementById("logout-btn") as HTMLButtonElement;
const todoList = document.getElementById("todo-list") as HTMLUListElement;

/* HJELPEFUNKSJONER */

function showSection(section: "login" | "todos"): void {
  if (section === "login") {
    loginSection.classList.remove("hidden");
    todoSection.classList.add("hidden");
  } else {
    loginSection.classList.add("hidden");
    todoSection.classList.remove("hidden");
  }
}

function showLoading(): void {
  todoList.innerHTML = '<li class="loading">Laster oppgaver...</li>';
}

/* RENDER */

function renderTodos(todos: Todo[]): void {
  todoList.innerHTML = todos
    .map(
      (
        todo,
      ) => `  <li class="todo-item ${todo.completed ? "completed" : ""}" data-id="${todo.id}">
        <div class="todo-info">
          <span class="priority priority--${todo.priority}">${todo.priority}</span>
          <span class="todo-title">${todo.title}</span>
        </div>
        <div class="todo-actions">
          <button class="btn-toggle" data-id="${todo.id}">
            ${todo.completed ? "Angre" : "Fullført"}
          </button>
          <button class="btn-delete" data-id="${todo.id}">Slett</button>
        </div>
      </li>`,
    )
    .join("");
}

/* EVENTLISTENER */

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

logoutBtn.addEventListener("click", () => {
  localStorage.removeItem("api_key");
  showSection("login");
});

/* DATA */

async function loadTodos(): Promise<void> {
  showLoading();

  try {
    const todos = await getTodos();
    console.log(todos);
    renderTodos(todos);
  } catch (error) {
    todoList.innerHTML = '<li class="error">Noe gikk galt. Prøv igjen.</li>';
  }
}

/* INIT */

const savedKey = localStorage.getItem("api_key");
if (savedKey) {
  showSection("todos");
  loadTodos();
} else {
  showSection("login");
}
