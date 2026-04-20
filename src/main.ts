import { createTodo, deleteTodo, getTodos, login } from "./api";
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
const addForm = document.getElementById("add-form") as HTMLFormElement;
const newTitleInput = document.getElementById("new-title") as HTMLInputElement;
const newPrioritySelect = document.getElementById(
  "new-priority",
) as HTMLSelectElement;
const statusMessage = document.getElementById(
  "status-message",
) as HTMLParagraphElement;

/* HJELPEFUNKSJONER */

function showStatus(message: string, isError = false): void {
  statusMessage.textContent = message;
  statusMessage.className = isError ? "error" : "success";
  statusMessage.classList.remove("hidden");

  setTimeout(() => {
    statusMessage.classList.add("hidden");
  }, 3000);
}

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
if (todos.length === 0) {
  todoList.innerHTML = '<li class="empty"> Ingen oppgaver enda, legg til en...</li>'
  return
}

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

  document.querySelectorAll(".btn-delete").forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      const id = Number((e.target as HTMLButtonElement).dataset.id);

      try {
        await deleteTodo(id);
        showStatus("Oppgave slettet!");
        await loadTodos();
      } catch (error) {
        showStatus((error as Error).message, true);
      }
    });
  });
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

addForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = newTitleInput.value.trim();
  const priority = newPrioritySelect.value as Todo["priority"];

  try {
    await createTodo(title, priority);
    newTitleInput.value = "";
    showStatus("Todo lagt til!");
    await loadTodos();
  } catch (error) {
    console.error(title, priority);
  }
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
