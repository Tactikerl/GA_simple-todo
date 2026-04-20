import type { LoginResponse, Todo } from "./types";

const BASE_URL = "http://localhost:3000/api";

function getApiKey(): string {
  return localStorage.getItem("api_key") ?? "";
}

export async function login(
  email: string,
  password: string,
): Promise<LoginResponse> {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Innlogging feilet");
  }

  return response.json();
}

/* TODOS */

export async function getTodos(): Promise<Todo[]> {
  const response = await fetch(`${BASE_URL}/todos`);

  if (!response.ok) {
    throw new Error("Kan ikke hente todos");
  }

  return response.json();
}

export async function createTodo(
  title: string,
  priority: Todo["priority"],
): Promise<Todo> {
  const response = await fetch(`${BASE_URL}/todos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${getApiKey()}`,
    },
    body: JSON.stringify({
      title,
      priority,
      description: null,
      completed: false,
      userID: 1,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Kunne ikke opprette oppgaven");
  }

  return response.json();
}

export async function deleteTodo(id: number): Promise<void> {
  const response = await fetch(`${BASE_URL}/todos/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message ?? "Kunne ikke slette oppgave");
  }
}
